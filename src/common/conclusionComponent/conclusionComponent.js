import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import ArenaDropdown from "../arenaDropdown/arenaDropdown"
import {CustomOption, IMAGE_DROPDOWN} from "../../containers/Subjects/components/subjectBase"
import ArenaUploader from "../arenaUploader/arenaUploader"

export default class ConclusionComponent extends React.Component{

    renderDescription=()=>{
        return(
            <TextField
                id={`Conclusion ${this.props.index}`}
                label="Description"
                className="textTransform"
                style={{ margin: 8 }}
                placeholder="Description"
                value={this.props.conclusionData.text1}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => this.props.onChangeConclusionTextfields(e, this.props.index, "text1")}
            />
        )
    }

    renderTitle=()=>{
        return(
            <TextField
                id={`ConclusionTitle${this.props.index}`}
                label="Title"
                className="textTransform"
                style={{ margin: 8 }}
                placeholder="Title"
                value={this.props.conclusionData.title}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => this.props.onChangeConclusionTextfields(e, this.props.index, "title")}
            />
        )
    }

    renderContent=()=>{
        return(
            <TextField
                id={`ConclusionContent${this.props.index}`}
                label="Content"
                className="textTransform"
                style={{ margin: 8 }}
                placeholder="Content"
                value={this.props.conclusionData.text2}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => this.props.onChangeConclusionTextfields(e, this.props.index, "text2")}
            />
        )
    }

    renderIconDropdown =() =>{
        return (<div id="dropDown" className="dropdownContainer">
        <ArenaDropdown
          components={{ Option: CustomOption }}
          options={IMAGE_DROPDOWN}
          selectedOption={this.props.getDropdownValue(
            this.props.conclusionData.icon
          )}
          onChange={(selectedOption) => {
            this.props.onChangeConclusionDropdown(
              selectedOption,
              this.props.index,
              "icon"
            );
          }}
          placeholder={"Select"}
        />
      </div>)
    }

    renderUploader =() =>{
        return(
            <ArenaUploader
            isMultiple={true}
            docUploader={true}
            extensions={["pdf", "jpeg", "jpg", "png"]}
            onUploadComplete={(response) => {
              this.props.onUploadComplete(response, "conclusionFiles");
            }}
          />
        )
    }

    render(){
        return(
            <React.Fragment>
                {this.renderDescription()}
                {this.renderIconDropdown()}
                {this.renderTitle()}
                {this.renderContent()}
                {this.renderUploader()}
            </React.Fragment>
        )
    }
}