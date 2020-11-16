import React, { Component } from "react";
import BackupIcon from "@material-ui/icons/Backup";
import Spinner from "@material-ui/core/CircularProgress";
import Dropzone from "react-dropzone";
import { uploadImage, uploadDocument } from '../../core/services/miscServices';
import { ToastContainer, toast } from 'react-toastify';

export default class ArenaUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFileForUpload: null,
      loading: false,
      uploadedFileURL: null,
    };
  }

  onFileChange = (file) => {
    let files = Array.from(file);
  
    this.setState(
      {
        selectedFileForUpload: files,
        loading: true,
      },
      this.uploadFile
    );
  };

  uploadFile = () => {
    if(this.props.onFileUpload){
      this.props.onFileUpload(this.state.selectedFileForUpload)
    }
    if (this.props.docUploader) {
      this.uploadDoc();
    } else {
      this.uploadImage();
    }
  };

  renderSuccessNotification =() =>{
    toast.success('Success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
  }

  renderFailureNotification =() =>{
    toast.error('Error', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
  }

  uploadDoc = async () => {
    this.setState({
      loading: true,
    });
    try {
      let fileData =
        this.state.selectedFileForUpload && this.state.selectedFileForUpload;
        
      for (let file of fileData) {
        let formData = new FormData();

        formData.append("file", file);
        let response = await uploadDocument(formData);
        if (!response.data) {
          this.renderFailureNotification()
          return;
        }
        this.renderSuccessNotification()

        this.setState({
          uploadedFileURL: response && response.data && response.data.original,
        });
        this.props.onUploadComplete && this.props.onUploadComplete(response);
      }
      this.setState({
        loading: false,
      });
    } catch (e) {
      console.error(e);
      this.renderFailureNotification()
      this.setState({
        loading: false,
        selectedFileForUpload: null,
      });
    }
  };
  uploadImage = async () => {
    this.setState({
      loading: true,
    });
      let fileData =
        this.state.selectedFileForUpload && this.state.selectedFileForUpload;
      for (let file of fileData) {
        let formData = new FormData();
        let cropData = [200, 200, 0, 400, 400, 400];
        formData.append("file", fileData);
        formData.append("crop[]", cropData);
        formData.append("file", file);
        uploadImage(formData).then(resp=>{
          this.renderSuccessNotification()
        this.setState({
          uploadedFileURL: resp && resp.data && resp.data.original,
        });
        this.props.onUploadComplete && this.props.onUploadComplete(resp);

        }).catch(err =>{
          
          this.renderFailureNotification()
        })



      this.setState({
        loading: false,
      });
  };
}

  getImageSrc = () => {
    if (this.props.fileURL) {
      return this.props.fileURL;
    } else {
      let imageData = this.state.uploadedFileURL && this.state.uploadedFileURL;
      return imageData;
    }
  };

  renderLoader() {
    return (
      <div style={{ position: "absolute" }}>
        <Spinner size="24px" style={{ color: "#65D2FC" }} />
      </div>
    );
  }

  renderUploaderBackground = () => {
    if (
      this.state.uploadedFileURL ||
      this.props.fileURL ||
      this.state.loading
    ) {
      return (
        <React.Fragment>
          {(this.state.uploadedFileURL || this.props.fileURL) && (
            <img
              src={this.getImageSrc()}
              alt="imgPreview"
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
              className={`${this.props.roundUploader && "roundUploaderImg"}`}
            />
          )}
          {this.state.loading && this.renderLoader()}
        </React.Fragment>
      );
    } else {
      return (
        <BackupIcon
          style={{
            color: "white",
          }}
        />
      );
    }
  };

  renderDocUploader = () => {
    if (this.state.loading) {
      return this.renderLoader();
    } else {
      return (
        <BackupIcon
          style={{
            color: "white",
          }}
        />
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Dropzone onDrop={this.onFileChange}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div
                className={"uploaderMainContainer"}
              >
                {this.props.docUploader
                  ? this.renderDocUploader()
                  : this.renderUploaderBackground()}
              </div>
            </div>
          )}
        </Dropzone>
      </React.Fragment>
    );
  }
}
