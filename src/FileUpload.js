import React, { Component } from "react";
import * as d3 from "d3";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      jsonData: null, // State to store the parsed JSON data
    };
  }

  handleFileSubmit = (event) => {
    event.preventDefault();
    const { file } = this.state;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;

        // Use d3.csvParse to parse the CSV into JSON
        const json = d3.csvParse(text);
        this.setState({ jsonData: json }); // Update state with parsed JSON
        this.props.set_data(json); // Pass parsed data to parent
      };

      reader.readAsText(file);
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
        <h2>Upload a CSV File</h2>
        <form onSubmit={this.handleFileSubmit}>
          <input
            type="file"
            accept=".csv"
            onChange={(event) => this.setState({ file: event.target.files[0] })}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default FileUpload;
