import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccounts, getUsersByAccountId } from "../../../core/services/accountsServices";
import { getUsers } from "../../../core/services/usersServices";
import ArenaUploader from "../../../common/arenaUploader/arenaUploader"
import Typography from '@material-ui/core/Typography';
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"

const PAGE_LIMIT = 20;

export default class CategoryBase extends Component {

  
  handleOptionChange = (e, newValue, type) => {
    ;
    this.setState({
      [type]: newValue,
    });
  };

  handleAccounts = async (value) => {
    try {
      let response = await getAccounts(
        PAGE_LIMIT,
        this.state.currentPage,
        value
      );
      ;
      this.setState({
        accountsData: response.data.items,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleUsers = async (value) => {
    
    try {
      let response = await getUsersByAccountId(this.state.account.id, PAGE_LIMIT, this.state.currentPage, value);
      ;
      this.setState({
        adminsData: response.data.items,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  errorInAccounts=()=>{
    return !this.state.account;
  }

  errorInName=()=>{
    return !this.state.name;
  }

  errorInDescription=()=>{
    return !this.state.description;
  }


  checkErrors =()=>{
    if (!this.state.account) {
      renderFailureNotification("Account not selected");
      return true;
    }
    if (!this.state.name) {
      renderFailureNotification("Name not selected");
      return true;
    }
    if (!this.state.description) {
      renderFailureNotification("Description not selected");
      return true;
    }
    if (!this.state.iconURL) {
      renderFailureNotification("Icon not uploaded");
      return true;
    }
    if (!this.state.coverURL) {
      renderFailureNotification("Cover not uploaded");
      return true;
    }
    return false;
  }

  onUploadComplete = (response, type) => {
    this.setState({
      [type]: response.data.original,
    });
  };



  renderMainContent() {
    const { adminsData, accountsData, name, description } = this.state;
    return (
      <div>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper style={{ padding: "20px" }}>
              <form autoComplete="off">
                <Autocomplete
                  id="account"
                  options={accountsData}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "account")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="Accounts"
                      onChange={(e) => this.handleAccounts(e.target.value)}
                      variant="outlined"
                      error={this.state.checkErrors && this.errorInAccounts()}

                    />
                  )}
                  value={this.state.account}
                  disabled={this.state.editCategory}
                />
                <TextField
                  id="name"
                  label="Name"
                  className="textTransform"
                  style={{ margin: 8 }}
                  placeholder="Name"
                  value={name}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.handleChange("name", e.target.value)}
                  error={this.state.checkErrors && this.errorInName()}
                />

                <TextField
                  id="description"
                  label="Description"
                  className="textTransform"
                  style={{ margin: 8 }}
                  placeholder="Description"
                  value={description}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.handleChange("description", e.target.value)}
                  error={this.state.checkErrors && this.errorInDescription()}
                />
                <div className="margin8 fullWidth">
                    <Typography variant="body2" className="mgTop12">
                        Icon
                    </Typography>

                    <ArenaUploader
                        isMultiple={false}
                        fileURL={this.state.iconURL && this.state.iconURL}
                        extensions={["jpg", "jpeg", "png"]}
                        onUploadComplete={(response) => {
                            this.onUploadComplete(response, "iconURL");
                        }}
                    />

                </div>
                <div className="margin8 fullWidth">
                    <Typography variant="body2" className="mgTop12">
                        Cover
                    </Typography>

                    <ArenaUploader
                        isMultiple={false}
                        fileURL={this.state.coverURL && this.state.coverURL}
                        extensions={["jpg", "jpeg", "png"]}
                        onUploadComplete={(response) => {
                            this.onUploadComplete(response, "coverURL");
                        }}
                    />

                </div>




                <Autocomplete
                  multiple
                  id="admins"
                  options={adminsData}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "admins")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="Admins"
                      onChange={(e) => this.handleUsers(e.target.value)}
                      variant="outlined"
                    />
                  )}
                  value={this.state.admins}
                />
                <Button
                  variant="contained"
                  style={{ margin: 8 }}
                  color="primary"
                  onClick={() => this.handleSave()}
                >
                  Save
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
