import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccounts } from "../../../core/services/accountsServices";
import { getSubjectsByAccountId } from "../../../core/services/subjectsServices";
import { fetchCategoryByAccountId} from "../../../core/services/categoriesServices"
import { renderFailureNotification } from "../../../common/Notifications/showNotifications";
import Divider from '@material-ui/core/Divider';
import {FORM_TYPE_MAP} from "../../../core/constants/constant"
import CommentsModal from "./commentsModal"

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
});
const PAGE_LIMIT = 20;

class SubjectsTable extends Component {
  state = {
    data: [],
    totalItems: null,
    currentPage: 0,
    searchValue: "",
    accountsData: [],
    account: null,
    accountId: null
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

  handleOptionChange = async(e, newValue, type) => {
    ;
    this.setState({
      [type]: newValue,
    });
    
    if(type === "account"){
        try{
            let response = await getSubjectsByAccountId(newValue.id, PAGE_LIMIT, this.state.currentPage, "")
            
            this.setState({
                data: response.data.items,
                accountId: newValue.id
            })

        }catch(e){
            renderFailureNotification("Subject fetch error")
        }
    }
  };

  handleSearch = async (value) => {
      
    if (!this.state.account) {
      return;
    }
    try {
    let response = await getSubjectsByAccountId(this.state.account.id,PAGE_LIMIT, this.state.currentPage, value);
    
    this.setState({
        data: response.data.items,
    })
    } catch (e) {
      console.error(e);
    }
  };

  closeCommentModal=()=>{
    this.setState({
      openCommentModal: false
    })
  }
  renderCommentModal=()=>{
    return(

        <CommentsModal
        subjectId={this.state.subjectId}
        closeCommentModal={this.closeCommentModal}
        openCommentModal={this.state.openCommentModal}
        />
    )
  }

  onClickViewComments=(item)=>{
    this.setState({
      openCommentModal: true,
      subjectId : item.id
    })
  }


  render() {
    const { classes } = this.props;
    const { data, totalItems, selectedPage, accountsData } = this.state;
    return (
      <Fragment>
        <Autocomplete
          id="account"
          options={accountsData}
          style={{ width: "20%", float: "left", margin: "0 16px" }}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) =>
            this.handleOptionChange(event, newValue, "account")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              className="selectAccount customHeight"
              label="Select Account"
              onChange={(e) => this.handleAccounts(e.target.value)}
              variant="outlined"
            />
          )}
        />
        <Paper
          component="form"
          className="searchInput displayFlex"
          style={{
            marginBottom: "20px",
            width: "22%",
            padding: "2px 18px",
            float: "right",
          }}
        >
          <InputBase
            className={classes.input}
            placeholder="Search Subjects"
            onChange={(e) => {
              this.handleSearch(e.target.value);
            }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell >Name</TableCell>
                <TableCell >Category</TableCell>
                <TableCell >Actions</TableCell>
              </TableRow>
            </TableHead>
            {data && data.length ? (
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell >{item.name}</TableCell>
                    <TableCell >{item.category.name}</TableCell>

                    <TableCell >
                      <div className="displayFlex">
                        <Button
                          onClick={() =>
                            this.props.history.push(`/admin/subjects/${item.id}`)
                          }
                          color="primary"
                          className="noPadding minWidthInitial "
                        >
                          Edit
                        </Button>
                        {item.type === FORM_TYPE_MAP.discussion && 
                        <Divider id="editDivider" className="mgLeft8" orientation="vertical" />}
                        {item.type === FORM_TYPE_MAP.discussion && 
                        <Button
                          onClick={() =>
                            this.onClickViewComments(item)
                          }
                          color="primary"
                          className="noPadding minWidthInitial mgLeft8"
                        >
                          View Comments
                        </Button>}

                      </div>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <p className="noData">No Data</p>
            )}
          </Table>
          <Pagination
            style={{ float: "right" }}
            count={Math.ceil(totalItems / PAGE_LIMIT)}
            onChange={(e, page) => this.handlePageChange(page)}
          />
        </TableContainer>
        <ToastContainer />
        {this.state.openCommentModal && this.renderCommentModal()}
      </Fragment>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(SubjectsTable));
