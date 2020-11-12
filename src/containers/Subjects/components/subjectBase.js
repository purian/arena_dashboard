import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArenaDatePicker from "../../../common/arenaDatePicker/arenaDatePicker";
import ArenaUploader from "../../../common/arenaUploader/arenaUploader";
import {
  FORM_TYPE_MAP,
  SUBJECT_STATUS,
} from "../../../core/constants/constant";
import { getAccounts } from "../../../core/services/accountsServices";
import { fetchCategoryByAccountId } from "../../../core/services/categoriesServices";
import { getUsers } from "../../../core/services/usersServices";
import Icon from "@material-ui/core/Icon";
import ArenaDropdown from "../../../common/arenaDropdown/arenaDropdown";
import ConclusionComponent from "../../../common/conclusionComponent/conclusionComponent";
const PAGE_LIMIT = 20;

const STATUS_DATA = [
  { name: SUBJECT_STATUS.DRAFT, value: SUBJECT_STATUS.DRAFT },
  { name: SUBJECT_STATUS.PUBLISHED, value: SUBJECT_STATUS.PUBLISHED },
  { name: SUBJECT_STATUS.FINISHED, value: SUBJECT_STATUS.FINISHED },
];

const FORM_TYPE_DATA = [
  { name: FORM_TYPE_MAP.discussion, value: FORM_TYPE_MAP.discussion },
  { name: FORM_TYPE_MAP.allocation, value: FORM_TYPE_MAP.allocation },
  { name: FORM_TYPE_MAP.choice, value: FORM_TYPE_MAP.choice },
];

export const IMAGE_DROPDOWN = [
  {
    value: "fa fa-graduation-cap",
    label: "fa fa-graduation-cap",
  },
  {
    value: "fas fa-address-book",
    label: "fas fa-address-book",
  },
  {
    value: "fas fa-archive",
    label: "fas fa-archive",
  },
  {
    value: "fas fa-archway",
    label: "fas fa-archway",
  },
  {
    value: "fas fa-users",
    label: "fas fa-users",
  },
  {
    value: "fas fa-user",
    label: "fas fa-user",
  },
  {
    value: "fas fa-smile",
    label: "fas fa-smile",
  },
];

const CHOICE = {
  options: [
    {
      name: "",
    },
    {
      name: "",
    },
  ],
  min: 0,
  max: 0,
};

const ALLOCATION = {
  options: [
    {
      name: "",
    },
    {
      name: "",
    },
  ],
  total: "",
  min: "",
  max: "",
  step: "",
};

export const CONCLUSION_DATA = {
  title: "",
  icon: null,
  text1: "",
  text2: "",
};

const FORM_TYPE = {
  CHOICE: "choice",
  ALLOCATION: "allocation",
};

export const CustomOption = ({ innerProps, data, isFocused }) => {
  //TODO: bring label from translation for aria label
  return (
    <div
      className={`dropDownIconsContainer reverse ${isFocused && "border"}`}
      {...innerProps}
      aria-label={data.label}
    >
      <Icon className={`${data.value} dropDownIcon`}></Icon>
      <span className="dullWhite">{data.label}</span>{" "}
    </div>
  );
};

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

  handleCategories = async (value) => {
    try {
      let response = await fetchCategoryByAccountId(
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage,
        value
      );
      this.setState({
        categoryData: response.data.items,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleUsers = async (value) => {
    try {
      let response = await getUsers(PAGE_LIMIT, this.state.currentPage, value);
      debugger;
      this.setState({
        adminsData: response.data.items,
      });
    } catch (e) {
      alert("Experts not fetched");
      console.error(e);
    }
  };

  handleGroups = async (value) => {
    try {
    } catch (e) {
      alert("Groups not fetched");
      console.error(e);
    }
  };

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
    debugger;
    this.setState({
      [type]: newValue,
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

  getFormType = (type) => {
    let data = FORM_TYPE_DATA.filter((singleElement) => {
      return singleElement.value === type;
    });
    debugger;
    return data[0];
  };

  getStatusType = (status) => {
    let data = STATUS_DATA.filter((singleElement) => {
      return singleElement.value === status;
    });
    debugger;
    return data[0];
  };

  onChangeOptionsTextField = (e, index, type) => {
    let dataCopy = Object.assign({}, this.state[type]);
    dataCopy.options[index].name = e.target.value;
    this.setState({
      [type]: dataCopy,
    });
  };

  getDropdownValue = (icon) => {
    let iconOption = {
      value: icon,
      label: (
        <div>
          <Icon className={`${icon} dropDownIcon`}></Icon>
          <span>{icon}</span>{" "}
        </div>
      ),
    };
    debugger;
    return iconOption;
  };

  onChangeIconDropdown = (selectedOption, index, type) => {
    debugger;
    let dataCopy = Object.assign({}, this.state[type]);
    dataCopy.options[index].icon = selectedOption.value;
    this.setState({
      [type]: dataCopy,
    });
  };

  onChangeChoiceAndAllocationTextfields = (e, field, type) => {
    let dataCopy = Object.assign({}, this.state[type]);
    dataCopy[field] = +e.target.value;
    this.setState({
      [type]: dataCopy,
    });
  };

  addOption = (type) => {
    let dataCopy = Object.assign({}, this.state[type]);
    let newData = {
      name: "",
    };
    dataCopy.options.push(newData);
    this.setState({
      [type]: dataCopy,
    });
  };

  renderMultiChoiceFields = () => {
    return (
      <React.Fragment>
        {this.state.choice.options.map((item, index) => {
          return (
            <div className="displayFlex">
              <TextField
                id={`Title ${index}`}
                label={`Title`}
                className="textTransform flex1"
                style={{ margin: 8 }}
                placeholder={`Title`}
                value={item.name}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  this.onChangeOptionsTextField(e, index, FORM_TYPE.CHOICE)
                }
              />

              <ArenaDropdown
                components={{ Option: CustomOption }}
                options={IMAGE_DROPDOWN}
                selectedOption={this.getDropdownValue(
                  this.state.choice.options[index].icon
                )}
                onChange={(selectedOption) => {
                  this.onChangeIconDropdown(
                    selectedOption,
                    index,
                    FORM_TYPE.CHOICE
                  );
                }}
                placeholder={"Icon"}
              />
            </div>
          );
        })}

        {this.renderMultiChoiceConstantFields()}
      </React.Fragment>
    );
  };

  renderMultiChoiceConstantFields = () => {
    return (
      <>
        <Button
          onClick={() => this.addOption(FORM_TYPE.CHOICE)}
          id="addChoiceOption"
          fullWidth={true}
          className="mgTop8"
        >
          Add Option
        </Button>
        <div className="displayFlex mgTop8">
          <TextField
            id="minimum"
            label="Minimum"
            className="textTransform"
            style={{ margin: 8 }}
            placeholder="Minimum"
            value={this.state.choice.min}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "min",
                FORM_TYPE.CHOICE
              )
            }
          />
          <TextField
            id="maximum"
            label="Maximum"
            className="textTransform"
            style={{ margin: 8 }}
            placeholder="Maximum"
            value={this.state.choice.max}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "max",
                FORM_TYPE.CHOICE
              )
            }
          />
        </div>
      </>
    );
  };

  renderAllocationFields = () => {
    return (
      <React.Fragment>
        {this.state.allocation.options.map((item, index) => {
          return (
            <div className="displayFlex">
              <TextField
                id={`Title ${index}`}
                label={`Title`}
                className="textTransform flex1"
                style={{ margin: 8 }}
                placeholder={`Title`}
                value={item.name}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  this.onChangeOptionsTextField(e, index, FORM_TYPE.ALLOCATION)
                }
              />
            </div>
          );
        })}
        <Button
          onClick={() => this.addOption(FORM_TYPE.ALLOCATION)}
          id="addChoiceOption"
          fullWidth={true}
          className="mgTop8"
        >
          Add Option
        </Button>

        <div className="displayFlex mgTop8">
          <TextField
            id="step"
            label="Step"
            className="textTransform"
            style={{ margin: 8 }}
            placeholder="Step"
            value={this.state.allocation.step}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "step",
                FORM_TYPE.ALLOCATION
              )
            }
          />

          <TextField
            id="total"
            label="Total"
            className="textTransform"
            style={{ margin: 8 }}
            placeholder="Total"
            value={this.state.allocation.total}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "total",
                FORM_TYPE.ALLOCATION
              )
            }
          />

          <TextField
            id="min"
            label="Min"
            className="textTransform"
            style={{ margin: 8 }}
            placeholder="Min"
            value={this.state.allocation.min}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "min",
                FORM_TYPE.ALLOCATION
              )
            }
          />

          <TextField
            id="max"
            label="Max"
            className="textTransform"
            style={{ margin: 8 }}
            placeholder="Max"
            value={this.state.allocation.max}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "max",
                FORM_TYPE.ALLOCATION
              )
            }
          />
        </div>
      </React.Fragment>
    );
  };

  changeFields = (value) => {
    if (value === FORM_TYPE_MAP.choice) {
      this.setState({
        choice: CHOICE,
      });
    } else if (value === FORM_TYPE_MAP.allocation) {
      this.setState({
        allocation: ALLOCATION,
      });
    }
  };

  renderAccountDropdown = () => {
    return (
      <Autocomplete
        id="account"
        options={this.state.accountsData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "account")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label="Accounts"
            onChange={(e) => this.handleAbc(e.target.value)}
            variant="outlined"
          />
        )}
        value={this.state.account}
      />
    );
  };

  renderCategoryDropdown = () => {
    return (
      <Autocomplete
        id="category"
        options={this.state.categoryData}
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
    );
  };

  renderTypeDropdown = () => {
    return (
      <Autocomplete
        id="type"
        options={FORM_TYPE_DATA}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          this.handleOptionChange(event, newValue, "type");
          this.changeFields(newValue.value);
        }}
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
    );
  };

  renderStatusDropdown = () => {
    return (
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
    );
  };

  renderDatePicker = () => {
    return (
      <>
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
      </>
    );
  };

  renderBasicSubjectInfo = () => {
    return (
      <>
        <TextField
          id="name"
          label="Name"
          className="textTransform"
          style={{ margin: 8 }}
          placeholder="Name"
          value={this.state.name}
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
          value={this.state.question}
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
          value={this.state.description}
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
      </>
    );
  };

  renderGroupsDropdown = () => {
    return (
      <Autocomplete
        id="groups"
        options={this.state.adminsData}
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
    );
  };

  renderExpertsDropdown = () => {
    return (
      <Autocomplete
        multiple
        id="experts"
        options={this.state.adminsData}
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
    );
  };

  renderCheckboxes = () => {
    return (
      <>
        <div className="checkBoxContainer margin8 fullWidth">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.private}
                onChange={(e) =>
                  this.handleCheckboxChange("private", e.target.checked)
                }
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
                onChange={(e) =>
                  this.handleCheckboxChange("showReport", e.target.checked)
                }
                name="checkedB"
                color="primary"
              />
            }
            label={"Show Immediate Report"}
          />
        </div>
      </>
    );
  };

  addConclusion =() =>{
    let conclusionData = Object.assign([], this.state.conclusion)
    let data ={
        title: "",
        icon: null,
        text1: "",
        text2: "",
      }
    conclusionData.push(data)
    debugger
    this.setState({
      conclusion: conclusionData
    })
  }

  addConclusionButton =() =>{
    return(
      <Button
      onClick={() => this.addConclusion()}
      id="addConclusion"
      fullWidth={true}
      className="mgTop8"
    >
      Add Conclusion
    </Button>
    )
  }

  renderConclusionFields = () => {
    return (
      <>
        <div className="checkBoxContainer margin8 fullWidth">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.showConclusion}
                onChange={(e) =>
                  this.handleCheckboxChange("showConclusion", e.target.checked)
                }
                name="checkedB"
                color="primary"
              />
            }
            label={"Conclusion"}
          />
        </div>
        {this.state.showConclusion && this.renderConclusion()}
        {this.state.showConclusion && this.addConclusionButton()}

      </>
    );
  };

  onChangeConclusionTextfields = (e, index, type) => {
    let conclusionCopy = Object.assign([], this.state.conclusion);
    conclusionCopy[index][type] = e.target.value;
    debugger
    this.setState({
      conclusion: conclusionCopy,
    });
  };

  onChangeConclusionDropdown = (selectedOption, index, type) => {
    let conclusioCopy = Object.assign([], this.state.conclusion);
    conclusioCopy[index].icon = selectedOption.value;

    this.setState({
      conclusion: conclusioCopy,
    });
  };

  onClickDeleteConclusion =(index) =>{
    let conclusionCopy = Object.assign([], this.state.conclusion);
    conclusionCopy.splice(index, 1);

    this.setState({
      conclusion: conclusionCopy,
    });
  }


  renderConclusion = () => {
    return this.state.conclusion.map((singleConclusion, index) => {
      debugger;
      return (
        <>
          <ConclusionComponent
            conclusionData={singleConclusion}
            index={index}
            onChangeConclusionTextfields={this.onChangeConclusionTextfields}
            getDropdownValue={this.getDropdownValue}
            onChangeConclusionDropdown={this.onChangeConclusionDropdown}
            onUploadComplete={this.onUploadComplete}
            length = {this.state.conclusion?.length}
            onClickDeleteConclusion={this.onClickDeleteConclusion}
          />
        </>
      );
    });
  };
  renderMainContent() {
    return (
      <div>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper style={{ padding: "20px" }}>
              <form autoComplete="off">
                {this.renderAccountDropdown()}

                {this.renderCategoryDropdown()}

                {this.renderTypeDropdown()}

                {this.state.type?.value === FORM_TYPE_MAP.choice &&
                  this.renderMultiChoiceFields()}
                {this.state.type?.value === FORM_TYPE_MAP.allocation &&
                  this.renderAllocationFields()}

                {this.renderStatusDropdown()}
                {this.renderDatePicker()}

                {this.renderBasicSubjectInfo()}

                {this.renderConclusionFields()}

                {this.renderCheckboxes()}
                {this.renderGroupsDropdown()}

                {this.renderExpertsDropdown()}

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
