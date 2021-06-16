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
import { searchGroupByAccountId, deleteGroup } from "../../../core/services/groupsServices";
import { renderFailureNotification, renderSuccessNotification } from "../../../common/Notifications/showNotifications";
import DeleteModal from "../../../common/deleteModal/deleteModal"
import Divider from '@material-ui/core/Divider';
import UserModal from "./userModal"
const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
});
const PAGE_LIMIT = 20;

const DATA = [
  {
    name: "Group 1",
    id: "123"
  },
  {
    name: "Group 2",
    id: "456"
  },
  {
    name: "Group 3",
    id: "789"
  },
  {
    name: "Group 4",
    id: "011"
  },
  {
    name: "Group 5",
    id: "511"
  },
];
class GroupsTable extends Component {
  state = {
    data: null,
    totalItems: null,
    currentPage: 0,
    searchValue: "",
    accountsData: [],
    account: null,
    openUsersModal: false,
    selectedGroup: null
  };

  componentDidMount=async()=>{
    try {
      let response = await getAccounts(
        100,
        this.state.currentPage,
        ""
      );
      ;
      this.setState({
        accountsData: response.data.items
      });
    } catch (e) {
      console.error(e);
    }
  }
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
        totalItems: response.data.count
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleOptionChange = async(e, newValue, type) => {
    this.setState({
      [type]: newValue,
    });
    if(!newValue || !newValue.id){
      this.setState({
        data: null,
        totalItems: null
      })
      return
    }
    if(type === "account"){
      try{
          let response = await searchGroupByAccountId("",newValue.id, PAGE_LIMIT, this.state.currentPage)
          
          this.setState({
              data: response.data.items,
              accountId: newValue.id
          })

      }catch(e){
          renderFailureNotification("Groups fetch error")
      }
  }
  };

  handleSearch = async (value) => {
    
    if (!this.state.account) {
      return;
    }
    try {
      let response = await searchGroupByAccountId(
        value,
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage
      );
      this.setState({
        data: response.data.items,
    })
    } catch (e) {
      console.error(e);
    }
  };

  onClickCancel =()=>{
    this.setState({
      openDeleteModal: false
    })
  }

  deleteGroupLocally=(id)=>{
    let data = this.state.data
    let index = data.findIndex((item) => item.id === id);
    if (index < 0) {
      return;
    }
    data.splice(index, 1);
  }

  onClickDelete=async()=>{
    if(!this.state.item?.id){
      return
    }
    try{
      await deleteGroup(this.state.item?.id)
      renderSuccessNotification("group deleted")
      this.deleteGroupLocally(this.state.item.id)
      this.setState({
        openDeleteModal: false
      })
    }catch(e){
      console.error(e)
      renderFailureNotification()
    }
  }

  renderDeleteModal=()=>{
    return(
      <DeleteModal 
      openDeleteModal={this.state.openDeleteModal}
      onClickCancel={this.onClickCancel}
      onClickDelete={this.onClickDelete}
      name={this.state.item?.name}
      />
    )
  }

  onClickDeleteItem=(item)=>{
    this.setState({
      item: item,
      openDeleteModal: true
    })
  }

  handlePageChange(page) {
    this.setState({
        currentPage: page
    }, () => this.loadPageData())

}

loadPageData = () => {
  const { currentPage, searchValue } = this.state;
  let offset = (currentPage - 1) * PAGE_LIMIT
  if (offset < 0) {
      offset = 0
  }
  searchGroupByAccountId(
    "",
    this.state.account.id,
    PAGE_LIMIT,
    this.state.currentPage
  ).then(resp => {
      this.setState({
          data: resp.data.items,
          totalItems: resp.data.count
      })
  }).catch(err => {
  })
}

onClickViewUsers=(item)=>{
  this.setState({
    openUsersModal: true,
    selectedGroup: item
  })
}

closeUserModal=()=>{
  this.setState({
    openUsersModal: false
  })
}
renderUserModal=()=>{
  return(

      <UserModal
      selectedGroup={this.state.selectedGroup}
      closeUserModal={this.closeUserModal}
      openUsersModal={this.state.openUsersModal}
      />
  )
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
          filterOptions={(option, state) => option}
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
            placeholder="Search Groups"
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
                <TableCell >Actions</TableCell>
              </TableRow>
            </TableHead>
            {data && data.length ? (
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell >{item.name}</TableCell>
                    <TableCell >
                    <div className="displayFlex">
                      <Button
                        onClick={() =>
                          this.props.history.push(`/admin/groups/${item.id}`)
                        }
                        color="primary"
                        className="noPadding minWidthInitial"
                      >
                        Edit
                      </Button>
                      <Divider id="editDivider" className="mgLeft8" orientation="vertical" />
                        <Button
                          onClick={() =>
                            this.onClickDeleteItem(item)
                          }
                          color="primary"
                          className="noPadding minWidthInitial mgLeft8"
                        >
                          Delete
                        </Button>
                        
                        <Divider id="editDivider" className="mgLeft8" orientation="vertical" />
                         
                        <Button
                          onClick={() =>
                            this.onClickViewUsers(item)
                          }
                          color="primary"
                          className="noPadding minWidthInitial mgLeft8"
                        >
                          View Users
                        </Button>
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
        {this.state.openUsersModal && this.renderUserModal()}
        {this.renderDeleteModal()}
      </Fragment>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(GroupsTable));
