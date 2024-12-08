import React, { Component } from "react";
import "./App.css"
import Child1 from "./Child1";
import FileUpload from "./FileUpload";
import * as d3 from 'd3'
import processed_csv from './processed_csv.csv'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {csv_data:[],data:[]};
  }
  componentDidMount() {
    var self=this
    d3.csv(processed_csv,function(d){
      return {
        lx: parseFloat(d.lx),
        ly: parseFloat(d.ly),
        kx: parseFloat(d.kx),
        ky: parseFloat(d.ky),
        sx: parseFloat(d.sx),
        sy: parseFloat(d.sy),
        imageid: parseInt(d.imageid),
        text: d.text      
      }
    }).then(function(csv_data){
      self.setState({data:csv_data})
    })
    .catch(function(err){
      console.log(err)
    })
  }
  set_data = (csv_data) => {
    var parsed_data = csv_data.map(d=>{
      return {
        lx: parseFloat(d.lx),
        ly: parseFloat(d.ly),
        kx: parseFloat(d.kx),
        ky: parseFloat(d.ky),
        sx: parseFloat(d.sx),
        sy: parseFloat(d.sy),
        imageid: parseInt(d.imageid),
        text: d.text      
      }
    })
    console.log(parsed_data,csv_data)
    this.setState({ data: parsed_data });
  }
  render() {
    return <div> 
      <FileUpload set_data={this.set_data}></FileUpload>
      <Child1 csv_data={this.state.data}></Child1>
      </div>;
  }
}

export default App;