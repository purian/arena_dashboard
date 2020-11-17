import React, { Component } from 'react'
 
import { CSVReader } from 'react-papaparse'
import {renderSuccessNotification, renderFailureNotification} from "../Notifications/showNotifications"
import BackupIcon from "@material-ui/icons/Backup";
import Spinner from "@material-ui/core/CircularProgress";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";

const buttonRef = React.createRef()
 
export default class CSVUploader extends Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }
 
  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
    this.props.onFileUpload(data)
    renderSuccessNotification("Csv Uploaded")
  }
 
  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
    renderFailureNotification("Unable to upload")
  }
 
  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    this.props.onFileRemove()
    console.log('---------------------------')
  }
 
  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  renderUploadedFile =(file)=>{
      return(
          <div className="displayFlex justifyContentSpaceBetween mgTop12">
          <Typography>
              {file && file.name}
          </Typography>
        <DeleteIcon onClick={this.handleRemoveFile} />
          </div>
      )
  }
 
  render() {
    return (
      <CSVReader
        ref={buttonRef}
        // onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        onRemoveFile={this.handleOnRemoveFile}
        onDrop={this.handleOnFileLoad}
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 10
            }}
          >
              <div
                className={"uploaderMainContainer"}
                onClick={this.handleOpenDialog}
              >
                <BackupIcon
                style={{
                    color: "white",
                }}
                />

              </div>
              {file && this.renderUploadedFile(file)}
          </aside>
        )}
      </CSVReader>
    )
  }
}