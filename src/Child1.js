import React, { Component } from "react";
import * as d3 from "d3";

class StackComp extends Component {
    constructor(props) {
      super(props);
      this.state = {temp:[],selected_data:[]};
    }
    componentDidMount(){
    this.setState({temp:0})      
    }
    componentDidUpdate(prevProps, prevState) {
      var ids = this.state.selected_data.map(item=>item.imageid)
      
      d3.selectAll('.mycircle').attr('fill',d=>ids.includes(d.imageid)?'#d95f02':'gray')
      
      if (prevState.selected_data == this.state.selected_data) {
          this.renderChart('.child11', '#l1l4', 'lx', 'ly');
          this.renderChart('.child12', '#kw', 'kx', 'ky');
          this.renderChart('.child13', '#sent', 'sx', 'sy');
      }
  }
    renderChart(div_container, svg_container, x, y) {
      const data = this.props.csv_data;
      const child11 = document.querySelector(div_container);
      const { width, height } = child11.getBoundingClientRect();
      const svg = d3.select(svg_container).attr('width', width).attr('height', height).selectAll('g').data([0]).join('g');
    
      const xScale = d3.scaleLinear().domain(d3.extent(data, d => d[x])).range([20, width - 30]);
      const yScale = d3.scaleLinear().domain(d3.extent(data, d => d[y])).range([height - 100, 20]);
    
      // Create and bind tooltip using join (initially invisible)
      const tooltip = d3.select('body').selectAll('.tooltip').data([null]).join('div').attr('class', 'tooltip').style('position', 'absolute').style('visibility', 'hidden').style('background', 'rgba(0, 0, 0, 0.7)').style('color', 'white').style('padding', '5px').style('border-radius', '4px').style('font-size', '12px').style('width', '500px').style('pointer-events', 'none');

      svg.selectAll('circle').data(data).join('circle').attr('class','mycircle').attr('cx', d => xScale(d[x])).attr('cy', d => yScale(d[y])).attr('fill', 'gray').attr('opacity', 1).attr('r', 5).attr('id',d=>d.imageid)
        .on('mouseover', (event, d) => {
          tooltip.style('visibility', 'visible')
            .html(d['text']) // Add HTML content to the tooltip
            .style('left', `${event.pageX + 15}px`)  // Position the tooltip based on mouse coordinates
            .style('top', `${event.pageY - 28}px`);
        })
        .on('mouseout', () => {
          tooltip.style('visibility', 'hidden');  // Hide tooltip on mouse out
        });

        // Initialize the Brush
        var brush = d3.brush().on("start brush", (e) => {
          var selected_data = data.filter(d => e.selection &&
            xScale(d[x]) >= e.selection[0][0] &&
            xScale(d[x]) <= e.selection[1][0] &&
            yScale(d[y]) >= e.selection[0][1] &&
            yScale(d[y]) <= e.selection[1][1]
          );
          //console.log(selected_data)
          this.setState({selected_data:selected_data})
        })
          svg.call(brush)
    }
    
    
  render() {
    return (
      <div>
      <div className="child1">
        <div className="child11">
          <p>L1-L4 Embedding</p>
          <svg id='l1l4'></svg>
        </div>
        <div className="child12">
          <p>Keyword Embedding</p>
          <svg id='kw'></svg>
        </div>
        <div className="child13">
          <p>Sentence Embedding</p>
          <svg id='sent'></svg>
        </div>      
      </div>
      <div style={{padding:"5px 15px"}}>{this.state.selected_data.map(item=><p>{item.text}</p>)}</div>
      </div>
      
    );
  }
}

export default StackComp;
