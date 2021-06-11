import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import ArenaDropdown from "../arenaDropdown/arenaDropdown";
import {
  IMAGE_DROPDOWN,
} from "../../containers/Subjects/components/subjectBase";
import ArenaUploader from "../arenaUploader/arenaUploader";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class ConclusionComponent extends React.Component {
  renderDescription = () => {
    return (
      <TextField
        id={`Conclusion ${this.props.index}`}
        label='Description'
        className='textTransform'
        style={{ margin: 8 }}
        placeholder='Description'
        value={this.props.conclusionData.text1}
        fullWidth
        variant='outlined'
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>
          this.props.onChangeConclusionTextfields(e, this.props.index, "text1")
        }
      />
    );
  };

  renderTitle = () => {
    return (
      <TextField
        id={`ConclusionTitle${this.props.index}`}
        label='Title'
        className='textTransform'
        style={{ margin: 8 }}
        placeholder='Title'
        value={this.props.conclusionData.title}
        fullWidth
        variant='outlined'
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>
          this.props.onChangeConclusionTextfields(e, this.props.index, "title")
        }
      />
    );
  };

  renderContent = () => {
    return (
      <TextField
        id={`ConclusionContent${this.props.index}`}
        label='Content'
        className='textTransform'
        style={{ margin: 8 }}
        placeholder='Content'
        value={this.props.conclusionData.text2}
        fullWidth
        variant='outlined'
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>
          this.props.onChangeConclusionTextfields(e, this.props.index, "text2")
        }
      />
    );
  };

  renderIconDropdown = () => {
    return (
      <div id='dropDown' className='dropdownContainer conclusionDropdown'>
        <ArenaDropdown
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
            <div className="margin8 fullWidth">
                <ArenaUploader
                isMultiple={true}
                docUploader={true}
                extensions={["pdf", "jpeg", "jpg", "png"]}
                onUploadComplete={(response) => {
                  this.props.onUploadComplete(response, "conclusionFiles");
                }}
              />

            </div>
        )
    }

    renderHeader =() =>{
        return(
            <div id="conclusionHeader" className="margin8" >
                <Typography variant="h6">
                    Conclusion {this.props.index + 1}
                </Typography>
                {this.props.length > 1 &&  <Button onClick={() =>this.props.onClickDeleteConclusion(this.props.index)}>
                    Delete
                </Button>}
            </div>
        )
    }

    render(){
        return(
            <React.Fragment>
                {this.renderHeader()}
                {this.renderDescription()}
                {this.renderIconDropdown()}
                {this.renderTitle()}
                {this.renderContent()}
                {this.renderUploader()}
                {this.props.conclusionFiles?.length > 0&& this.props.renderUploadedImages(
                  this.props.conclusionFiles,
                  "conclusionFiles"
                )}
            </React.Fragment>
        )
    }
}