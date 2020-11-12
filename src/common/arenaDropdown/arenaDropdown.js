import React, { Component } from "react";
import Select from "react-select";

export default class ArenaDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null, //TODO I
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onChange(selectedOption);
  };

  render() {
    return (
      <React.Fragment>
        <Select
          {...this.props}
          value={this.props.selectedOption}
          onChange={this.handleChange}
          // menuIsOpen={true}
          options={this.props.options}
          className="arena-dropdown-container flexDirectionRow margin8 flex1"
          classNamePrefix="arena-dropdown"
          error={true}
          aria-describedby="dropDown"
          aria-label="Arena Dropdown"
        />
      </React.Fragment>
    );
  }
}
