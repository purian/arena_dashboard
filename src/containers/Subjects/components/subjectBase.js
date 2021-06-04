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
import {
  getAccounts,
  getUsersByAccountId,
} from "../../../core/services/accountsServices";
import { fetchCategoryByAccountId } from "../../../core/services/categoriesServices";
import { getUsers } from "../../../core/services/usersServices";
import Icon from "@material-ui/core/Icon";
import ArenaDropdown from "../../../common/arenaDropdown/arenaDropdown";
import ConclusionComponent from "../../../common/conclusionComponent/conclusionComponent";
import CommentsModal from "./commentsModal";
import Dialog from "@material-ui/core/Dialog";
import {
  renderSuccessNotification,
  renderFailureNotification,
} from "../../../common/Notifications/showNotifications";
import { searchGroupByAccountId } from "../../../core/services/groupsServices";
import ChipInput from "material-ui-chip-input";
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

export const CustomOption = ({ data }) => {
  //TODO: bring label from translation for aria label
  return (
    <div className={`dropDownIconsContainer`}>
      <Icon className={`${data.value} dropDownIcon`} />
      <span>{data.label}</span>{" "}
    </div>
  );
};

export default class SubjectBase extends Component {
  handleOptionChange = (e, newValue, type) => {
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
      let response = await getUsersByAccountId(
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage,
        value
      );
      this.setState({
        adminsData: response.data.items,
      });
    } catch (e) {
      renderFailureNotification("Data not fetched");
      console.error(e);
    }
  };

  handleGroups = async (value) => {
    try {
      let response = await searchGroupByAccountId(
        "",
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage
      );

      this.setState({
        groupsData: response.data.items,
      });
    } catch (e) {
      renderFailureNotification("Groups not fetched");
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
    return data[0];
  };

  getStatusType = (status) => {
    let data = STATUS_DATA.filter((singleElement) => {
      return singleElement.value === status;
    });
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
    return iconOption;
  };

  onChangeIconDropdown = (selectedOption, index, type) => {
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

  onClickDeleteOptions = (index, type) => {
    if (index > 0) {
      let dataCopy = Object.assign({}, this.state[type]);
      dataCopy.options.splice(index, 1);
      this.setState({
        [type]: dataCopy,
      });
    }
  };
  handleAddChip = (chip) => {
    var labels = Object.assign([], this.state.tags);
    for (var label in labels) {
      if (label === chip) {
        window.NotificationUtils.showError("Name already exists!");
        return;
      }
    }
    labels.push(chip);
    this.setState({
      tags: labels,
    });
  };

  handleDeleteChip = (chip, i) => {
    var labels = Object.assign([], this.state.tags);
    var filtered = labels.filter(function (value, index) {
      return index !== i;
    });
    this.setState({
      tags: filtered,
    });
  };

  renderMultiChoiceFields = () => {
    return (
      <React.Fragment>
        {this.state.choice.options.map((item, index) => {
          return (
            <div className='displayFlex'>
              <TextField
                id={`Title ${index}`}
                label={`Title`}
                className='textTransform flex1'
                style={{ margin: 8 }}
                placeholder={`Title`}
                value={item.name}
                fullWidth
                variant='outlined'
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  this.onChangeOptionsTextField(e, index, FORM_TYPE.CHOICE)
                }
              />

              <ArenaDropdown
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

              {index > 1 && (
                <Button
                  color='primary'
                  className='mgLeft8'
                  onClick={() =>
                    this.onClickDeleteOptions(index, FORM_TYPE.CHOICE)
                  }>
                  Delete
                </Button>
              )}
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
          id='addChoiceOption'
          fullWidth={true}
          className='margin8'
          color='primary'
          variant='contained'>
          Add Option
        </Button>
        <div className='displayFlex mgTop8'>
          <TextField
            id='minimum'
            label='Minimum'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Minimum'
            value={this.state.choice.min}
            fullWidth
            variant='outlined'
            margin='normal'
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
            error={this.state.checkErrors && this.errorInMultiChoiceMin()}
          />
          <TextField
            id='maximum'
            label='Maximum'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Maximum'
            value={this.state.choice.max}
            fullWidth
            variant='outlined'
            margin='normal'
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
            error={this.state.checkErrors && this.errorInMultiChoiceMax()}
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
            <div className='displayFlex margin8 fullWidth'>
              <TextField
                id={`Title ${index}`}
                label={`Title`}
                className='textTransform flex1 fullWidth noMargin'
                placeholder={`Title`}
                value={item.name}
                fullWidth
                variant='outlined'
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  this.onChangeOptionsTextField(e, index, FORM_TYPE.ALLOCATION)
                }
              />
              {index > 1 && (
                <Button
                  color='primary'
                  className='mgLeft8'
                  onClick={() =>
                    this.onClickDeleteOptions(index, FORM_TYPE.ALLOCATION)
                  }>
                  Delete
                </Button>
              )}
            </div>
          );
        })}
        <Button
          onClick={() => this.addOption(FORM_TYPE.ALLOCATION)}
          id='addChoiceOption'
          fullWidth={true}
          className='margin8'
          color='primary'
          variant='contained'>
          Add Option
        </Button>

        <div className='displayFlex mgTop8'>
          <TextField
            id='step'
            label='Step'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Step'
            value={this.state.allocation.step}
            fullWidth
            variant='outlined'
            margin='normal'
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
            error={this.state.checkErrors && this.errorInAllocationStep()}
          />

          <TextField
            id='total'
            label='Total'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Total'
            value={this.state.allocation.total}
            fullWidth
            variant='outlined'
            margin='normal'
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
            error={this.state.checkErrors && this.errorInAllocationTotal()}
          />

          <TextField
            id='min'
            label='Min'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Min'
            value={this.state.allocation.min}
            fullWidth
            variant='outlined'
            margin='normal'
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
            error={this.state.checkErrors && this.errorInAllocationMin()}
          />

          <TextField
            id='max'
            label='Max'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Max'
            value={this.state.allocation.max}
            fullWidth
            variant='outlined'
            margin='normal'
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
            error={this.state.checkErrors && this.errorInAllocationMax()}
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
        id='account'
        options={this.state.accountsData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "account")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Accounts'
            onChange={(e) => this.handleAccounts(e.target.value)}
            variant='outlined'
            error={this.state.checkErrors && this.errorInAccounts()}
          />
        )}
        value={this.state.account}
        disabled={this.state.editSubject}
      />
    );
  };

  renderCategoryDropdown = () => {
    return (
      <Autocomplete
        id='category'
        options={this.state.categoryData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "category")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Categories'
            onChange={(e) => this.handleCategories(e.target.value)}
            variant='outlined'
            error={this.state.checkErrors && this.errorInCategory()}
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
        id='type'
        options={FORM_TYPE_DATA}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          this.handleOptionChange(event, newValue, "type");
          this.changeFields(newValue?.value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Type'
            //   onChange={(e) => this.handleAccounts(e.target.value)}
            variant='outlined'
            error={this.state.checkErrors && this.errorInType()}
          />
        )}
        value={this.state.type}
        disabled={this.state.editSubject}
      />
    );
  };

  renderStatusDropdown = () => {
    return (
      <Autocomplete
        id='status'
        options={STATUS_DATA}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "status")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Status'
            //   onChange={(e) => this.handleAccounts(e.target.value)}
            variant='outlined'
            error={this.state.checkErrors && this.errorInStatus()}
          />
        )}
        value={this.state.status}
      />
    );
  };

  renderDatePicker = () => {
    return (
      <>
        <div className='margin8 fullWidth'>
          <Typography variant='body2' className='mgTop12'>
            Start Date
          </Typography>
          <ArenaDatePicker
            id='startDropDownContainer'
            value={this.state.startDate}
            onChange={(date) => {
              this.onChangeDate(date, "startDate");
            }}
          />
        </div>
        <div className='margin8 fullWidth'>
          <Typography variant='body2' className='mgTop12'>
            End Date
          </Typography>
          <ArenaDatePicker
            id='startDropDownContainer'
            value={this.state.endDate}
            onChange={(date) => {
              this.onChangeDate(date, "endDate");
            }}
            minDate={this.state.startDate}
          />
        </div>
      </>
    );
  };

  renderUploadedImages = (files, key) => {
    if (!files || files.length < 1) {
      return;
    }
    return files.map((item) => {
      return this.renderImage(item, files, key);
    });
  };

  onClickDeleteAttachments = (file, files, key) => {
    let index = files.indexOf(file);
    if (index === -1) {
      return;
    }
    files.splice(index, 1);
    if (key === "conclusionFiles") {
      this.setState({
        conclusionFiles: files,
      });
    } else {
      this.setState({
        files,
      });
    }
  };

  renderImage = (file, files, key) => {
    return (
      <div id='imageUploaderContainer' className='uploadedImageContainer'>
        <div id='imageContainer'>
          <ArenaUploader fileURL={file.url} />
        </div>
        <Typography
          variant='body2'
          id='imageUploaderName'
          className='marginLeft8 dullWhite bold textAlignEnd'>
          {file.name}
        </Typography>
        <Button
          color='primary'
          variant='contained'
          onClick={() => this.onClickDeleteAttachments(file, files, key)}>
          Delete
        </Button>
      </div>
    );
  };

  renderBasicSubjectInfo = () => {
    return (
      <>
        <TextField
          id='name'
          label='Name'
          className='textTransform'
          style={{ margin: 8 }}
          placeholder='Name'
          value={this.state.name}
          fullWidth
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => this.handleChange("name", e.target.value)}
          error={this.state.checkErrors && this.errorInName()}
        />

        <TextField
          id='question'
          label='Question'
          className='textTransform'
          style={{ margin: 8 }}
          placeholder='Question'
          value={this.state.question}
          fullWidth
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => this.handleChange("question", e.target.value)}
          error={this.state.checkErrors && this.errorInQuestion()}
        />

        <TextField
          id='description'
          label='Description'
          className='textTransform'
          style={{ margin: 8 }}
          placeholder='Description'
          value={this.state.description}
          fullWidth
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => this.handleChange("description", e.target.value)}
          multiline
          rows={4}
          error={this.state.checkErrors && this.errorInDescription()}
        />
        <div className='margin8 fullWidth'>
          <Typography variant='body2' className='mgTop12'>
            Attachments
          </Typography>

          <ArenaUploader
            isMultiple={true}
            docUploader={true}
            fileURL={this.state.iconURL && this.state.iconURL}
            extensions={["jpg", "jpeg", "png"]}
            onUploadComplete={(response) => {
              this.onUploadComplete(response, "files");
            }}
          />
        </div>
        {this.state.files?.length > 0 &&
          this.renderUploadedImages(this.state.files)}

        <div className='margin8 fullWidth'>
          <Typography variant='body2' className='mgTop12'>
            Background Image
          </Typography>

          <ArenaUploader
            isMultiple={true}
            fileURL={this.state.cover && this.state.cover.original}
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
        multiple
        id='groups'
        options={this.state.groupsData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "groups")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Groups'
            onChange={(e) => this.handleGroups(e.target.value)}
            variant='outlined'
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
        id='experts'
        options={this.state.adminsData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "experts")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Experts'
            onChange={(e) => this.handleUsers(e.target.value)}
            variant='outlined'
          />
        )}
        value={this.state.experts}
        disabled={!this.state.account}
      />
    );
  };

  renderAdminsDropdown = () => {
    return (
      <Autocomplete
        multiple
        id='admins'
        options={this.state.adminsData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "subjectAdmins")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Admins'
            onChange={(e) => this.handleUsers(e.target.value)}
            variant='outlined'
          />
        )}
        value={this.state.subjectAdmins}
        disabled={!this.state.account}
      />
    );
  };
  renderChipInput = () => {
    return (
      <div className='chipInputContainer'>
        <ChipInput
          variant='outlined'
          className='chipInput'
          disableUnderline={true}
          id='addLabels'
          placeholder='Press `Enter` to add labels'
          value={this.state.tags}
          onAdd={(chip) => this.handleAddChip(chip)}
          onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
        />
      </div>
    );
  };

  renderCheckboxes = () => {
    return (
      <>
        <div className='checkBoxContainer margin8 fullWidth'>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.private}
                onChange={(e) =>
                  this.handleCheckboxChange("private", e.target.checked)
                }
                name='checkedB'
                color='primary'
              />
            }
            label={"Private"}
          />
        </div>

        <div className='checkBoxContainer margin8 fullWidth'>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.showReport}
                onChange={(e) =>
                  this.handleCheckboxChange("showReport", e.target.checked)
                }
                name='checkedB'
                color='primary'
              />
            }
            label={"Show Immediate Report"}
          />
        </div>
      </>
    );
  };

  addConclusion = () => {
    let conclusionData = Object.assign([], this.state.conclusion);
    let data = {
      title: "",
      icon: null,
      text1: "",
      text2: "",
    };
    conclusionData.push(data);

    this.setState({
      conclusion: conclusionData,
    });
  };

  addConclusionButton = () => {
    return (
      <Button
        onClick={() => this.addConclusion()}
        id='addConclusion'
        fullWidth={true}
        className='mgTop8'
        color='primary'
        variant='contained'>
        Add Conclusion
      </Button>
    );
  };

  renderConclusionFields = () => {
    return (
      <>
        <div className='checkBoxContainer margin8 fullWidth'>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.showConclusion}
                onChange={(e) =>
                  this.handleCheckboxChange("showConclusion", e.target.checked)
                }
                name='checkedB'
                color='primary'
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

  onClickDeleteConclusion = (index) => {
    let conclusionCopy = Object.assign([], this.state.conclusion);
    conclusionCopy.splice(index, 1);

    this.setState({
      conclusion: conclusionCopy,
    });
  };

  renderConclusion = () => {
    return this.state.conclusion.map((singleConclusion, index) => {
      return (
        <>
          <ConclusionComponent
            conclusionData={singleConclusion}
            index={index}
            onChangeConclusionTextfields={this.onChangeConclusionTextfields}
            getDropdownValue={this.getDropdownValue}
            onChangeConclusionDropdown={this.onChangeConclusionDropdown}
            onUploadComplete={this.onUploadComplete}
            length={this.state.conclusion?.length}
            onClickDeleteConclusion={this.onClickDeleteConclusion}
            renderUploadedImages={this.renderUploadedImages}
            conclusionFiles={this.state.conclusionFiles}
          />
        </>
      );
    });
  };

  closeCommentModal = () => {
    this.setState({
      openCommentModal: false,
    });
  };
  renderCommentModal = () => {
    return (
      <CommentsModal
        subjectId={this.state.subjectId}
        closeCommentModal={this.closeCommentModal}
        openCommentModal={this.state.openCommentModal}
      />
    );
  };

  onClickViewComments = () => {
    this.setState({
      openCommentModal: true,
    });
  };

  renderViewCommentButton = () => {
    return (
      <Button
        color='primary'
        variant='contained'
        className='margin8'
        onClick={this.onClickViewComments}>
        View Comments
      </Button>
    );
  };

  renderMainContent() {
    return (
      <div>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper style={{ padding: "20px" }}>
              <form autoComplete='off'>
                {this.renderAccountDropdown()}

                {this.renderCategoryDropdown()}

                {this.renderTypeDropdown()}

                {this.state.type?.value === FORM_TYPE_MAP.discussion &&
                  this.state.subjectId &&
                  this.renderViewCommentButton()}

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
                {this.renderAdminsDropdown()}
                {this.renderChipInput()}

                {this.state.openCommentModal && this.renderCommentModal()}

                <Button
                  variant='contained'
                  style={{ margin: 8 }}
                  color='primary'
                  onClick={() => this.handleSave()}>
                  Save
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  errorInAccounts = () => {
    return !this.state.account;
  };

  errorInCategory = () => {
    return !this.state.category;
  };

  errorInType = () => {
    return !this.state.type;
  };

  errorInStatus = () => {
    return !this.state.status;
  };

  errorInName = () => {
    return !this.state.name;
  };

  errorInDescription = () => {
    return !this.state.description;
  };

  errorInQuestion = () => {
    return !this.state.question;
  };

  errorInAllocationTotal = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.allocation &&
      !this.state.allocation.total
    );
  };

  errorInAllocationMin = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.allocation &&
      !this.state.allocation.min
    );
  };

  errorInAllocationMax = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.allocation &&
      !this.state.allocation.max
    );
  };

  errorInAllocationStep = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.allocation &&
      !this.state.allocation.step
    );
  };

  errorInMultiChoiceMin = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.choice && !this.state.choice.min
    );
  };

  errorInMultiChoiceMax = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.choice && !this.state.choice.max
    );
  };

  checkErrors() {
    if (!this.state.account) {
      renderFailureNotification("Account not selected");
      return true;
    }
    if (!this.state.category) {
      renderFailureNotification("Category not selected");
      return true;
    }
    if (!this.state.type) {
      renderFailureNotification("Type not selected");
      return true;
    }
    if (!this.state.status) {
      renderFailureNotification("Status not selected");
      return true;
    }
    if (!this.state.name) {
      renderFailureNotification("Name not present");
      return true;
    }
    if (!this.state.description) {
      renderFailureNotification("Description not present");
      return true;
    }
    if (!this.state.question) {
      renderFailureNotification("Question not present");
      return true;
    }
    if (this.state.type?.value === FORM_TYPE_MAP.allocation) {
      let allocation = this.state.allocation;

      for (let item of this.state.allocation.options) {
        if (!item.name || !item.icon) {
          renderFailureNotification("Enter Allocation Fields");
          return true;
        }
      }
      if (!allocation.total) {
        renderFailureNotification("Enter Allocation Total");
        return true;
      }
      if (!allocation.min) {
        renderFailureNotification("Enter Allocation minimum value");
        return true;
      }
      if (!allocation.max) {
        renderFailureNotification("Enter Allocation maximum value");
        return true;
      }
      if (!allocation.step) {
        renderFailureNotification("Enter Allocation step value");
        return true;
      }
    }

    if (this.state.type?.value === FORM_TYPE_MAP.choice) {
      let choice = this.state.choice;

      for (let item of this.state.choice.options) {
        if (!item.name || !item.icon) {
          renderFailureNotification("Enter Multi-choice Fields");
          return true;
        }
      }
      if (!choice.min) {
        renderFailureNotification("Enter Multi-choice Minimum value");
        return true;
      }
      if (!choice.max) {
        renderFailureNotification("Enter Multi-choice Maximum value");
        return true;
      }
    }

    if (this.state.startDate > this.state.endDate) {
      renderFailureNotification("Start date cannot be greater than end date");
      return true;
    }

    return false;
  }
}
