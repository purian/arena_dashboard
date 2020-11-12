import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccounts } from "../../../core/services/accountsServices";
import { getUsers } from "../../../core/services/usersServices";
import ArenaUploader from "../../../common/arenaUploader/arenaUploader"
import Typography from '@material-ui/core/Typography';
import ArenaDatePicker from "../../../common/arenaDatePicker/arenaDatePicker"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {fetchCategoryByAccountId} from "../../../core/services/categoriesServices"
import {SUBJECT_STATUS, FORM_TYPE_MAP} from "../../../core/constants/constant"

const PAGE_LIMIT = 20;

const STATUS_DATA=[
  {"name":SUBJECT_STATUS.DRAFT, "value":SUBJECT_STATUS.DRAFT },
  {"name":SUBJECT_STATUS.PUBLISHED, "value":SUBJECT_STATUS.PUBLISHED },
  {"name":SUBJECT_STATUS.FINISHED, "value":SUBJECT_STATUS.FINISHED },
]

const FORM_TYPE_DATA=[
  {"name":FORM_TYPE_MAP.discussion, "value":FORM_TYPE_MAP.discussion },
  {"name":FORM_TYPE_MAP.allocation, "value":FORM_TYPE_MAP.allocation },
  {"name":FORM_TYPE_MAP.choice, "value":FORM_TYPE_MAP.choice },
]

export default class SubjectBase extends Component {


  handleOptionChange = (e, newValue, type) => {
    debugger;
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
      debugger;
      this.setState({
        accountsData: response.data.items,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleCategories = async(value) =>{
      try{
        let response = await fetchCategoryByAccountId(
            this.state.account.id,
            PAGE_LIMIT,
            this.state.currentPage,
            value
          );
        this.setState({
            categoryData: response.data.items,
          });
      }catch(e){
      console.error(e);
      }
  }

  handleUsers = async (value) => {
    try {
      let response = await getUsers(PAGE_LIMIT, this.state.currentPage, value);
      debugger;
      this.setState({
        adminsData: response.data.items,
      });
    } catch (e) {
        alert("Experts not fetched")
      console.error(e);
    }
  };

  handleGroups = async(value) =>{
      try{

      }catch(e){
          alert("Groups not fetched")
          console.error(e)
      }
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  onChangeDate = (date, type) => {
    this.setState({
      [type]: date,
    });
  };

  handleCheckboxChange = (type, newValue) => {
      debugger
    this.setState({
      [type]: newValue
    });
  };

  onUploadComplete = (response, type) => {
    if (!this.state[type]) {
      let files = [];
      files.push(response.data);
      this.setState({
        [type]: files,
      });
    } else {
      let fileCopy = Object.assign([], this.state[type]);
      fileCopy.push(response.data);
      this.setState({
        [type]: fileCopy,
      });
    }
  };

  onUploadBackgroundComplete = (response) => {
    let uploadedURL = response.data && response.data.original;
    let cover = {
      original: uploadedURL && uploadedURL,
      sizes: {
        "720x1080": uploadedURL && uploadedURL,
      },
    };
    this.setState({
      cover: cover,
    });
  };

  getFormType =(type) =>{
    let data =  FORM_TYPE_DATA.filter((singleElement) =>{
      return singleElement.value === type
    })
    debugger
    return data[0]
  }

  getStatusType =(status) =>{
    let data =  STATUS_DATA.filter((singleElement) =>{
      return singleElement.value === status
    })
    debugger
    return data[0]
  }


  renderMainContent() {
    const { adminsData, accountsData, name, description, categoryData, conclusion, question } = this.state;
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
                    />
                  )}
                  value={this.state.account}
                />

                <Autocomplete
                  id="category"
                  options={categoryData}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "category")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="Categories"
                      onChange={(e) => this.handleCategories(e.target.value)}
                      variant="outlined"
                    />
                  )}
                  value={this.state.category}
                  disabled={!this.state.account}
                />

                <Autocomplete
                  id="type"
                  options={FORM_TYPE_DATA}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "type")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="Type"
                    //   onChange={(e) => this.handleAccounts(e.target.value)}
                      variant="outlined"
                    />
                  )}
                  value={this.state.type}
                />

                <Autocomplete
                  id="status"
                  options={STATUS_DATA}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "status")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="Status"
                    //   onChange={(e) => this.handleAccounts(e.target.value)}
                      variant="outlined"
                    />
                  )}
                  value={this.state.status}
                />
                <div className="margin8 fullWidth">
                    <Typography variant="body2" className="mgTop12">
                        Start Date
                    </Typography>
                    <ArenaDatePicker
                    id="startDropDownContainer"
                    value={this.state.startDate}
                    onChange={(date) => {
                        this.onChangeDate(date, "startDate");
                    }}
                    />
                </div>
                <div className="margin8 fullWidth">
                    <Typography variant="body2" className="mgTop12">
                        End Date
                    </Typography>
                    <ArenaDatePicker
                    id="startDropDownContainer"
                    value={this.state.endDate}
                    onChange={(date) => {
                        this.onChangeDate(date, "endDate");
                    }}
                    />
                </div>


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
                />

                <TextField
                  id="question"
                  label="Question"
                  className="textTransform"
                  style={{ margin: 8 }}
                  placeholder="Question"
                  value={question}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.handleChange("question", e.target.value)}
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
                  multiline
                  rows={4}
                />
                <div className="margin8 fullWidth">
                    <Typography variant="body2" className="mgTop12">
                        Attachments
                    </Typography>

                    <ArenaUploader
                        isMultiple={true}
                        fileURL={this.state.iconURL && this.state.iconURL}
                        extensions={["jpg", "jpeg", "png"]}
                        onUploadComplete={(response) => {
                          this.onUploadComplete(response, "files");
                        }}
                    />
                </div>

                <div className="margin8 fullWidth">
                    <Typography variant="body2" className="mgTop12">
                        Background Image
                    </Typography>

                    <ArenaUploader
                        isMultiple={true}
                        fileURL={this.state.iconURL && this.state.iconURL}
                        extensions={["jpg", "jpeg", "png"]}
                        onUploadComplete={(response) => {
                          this.onUploadBackgroundComplete(response, "backgroundCover");
                        }}
                    />
                </div>


                
                <TextField
                  id="conclusion"
                  label="Conclusion"
                  className="textTransform"
                  style={{ margin: 8 }}
                  placeholder="Conclusion"
                  value={conclusion}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.handleChange("conclusion", e.target.value)}
                />

            <div className="checkBoxContainer margin8 fullWidth">
                <FormControlLabel
                control={
                    <Checkbox
                    checked={this.state.private}
                    onChange={(e) => this.handleCheckboxChange("private", e.target.checked)}
                    name="checkedB"
                    color="primary"
                    />
                }
                label={"Private"}
                />
            </div>

            <div className="checkBoxContainer margin8 fullWidth">
                <FormControlLabel
                control={
                    <Checkbox
                    checked={this.state.showReport}
                    onChange={(e) => this.handleCheckboxChange("showReport", e.target.checked)}
                    name="checkedB"
                    color="primary"
                    />
                }
                label={"Show Immediate Report"}
                />
            </div>

                <Autocomplete
                  id="groups"
                  options={adminsData}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "groups")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="Groups"
                      onChange={(e) => this.handleGroups(e.target.value)}
                      variant="outlined"
                    />
                  )}
                  value={this.state.groups}
                  disabled={!this.state.account}
                />


                <Autocomplete
                  multiple
                  id="experts"
                  options={adminsData}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "admins")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="Experts"
                      onChange={(e) => this.handleUsers(e.target.value)}
                      variant="outlined"
                    />
                  )}
                  value={this.state.users}
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
