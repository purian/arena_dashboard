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
import { searchGroupByAccountId } from "../../../core/services/groupsServices";
import { fetchCategoryByAccountId, deleteCategory} from "../../../core/services/categoriesServices"
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"
import DeleteModal from "../../../common/deleteModal/deleteModal"
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
});
const PAGE_LIMIT = 20;

class CategoriesTable extends Component {
  state = {
    data: [],
    totalItems: null,
    currentPage: 0,
    searchValue: "",
    accountsData: [],
    account: null,
    accountId: null,
    openDeleteModal: false
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
    if(!newValue || !newValue.id){
      this.setState({
        data: null,
        totalItems: null
      })
      return
    }
    if(type === "account"){
        try{
            let response = await fetchCategoryByAccountId(newValue.id, PAGE_LIMIT, this.state.currentPage, "")
            
            this.setState({
                data: response.data.items,
                accountId: newValue.id,
                totalItems: response.data.count

            })
            renderSuccessNotification("Category fetched")

        }catch(e){
          renderFailureNotification("Category fetch error")
        }
    }
  };

  handleSearch = async (value) => {
      
    if (!this.state.account) {
      return;
    }
    try {
    let response = await fetchCategoryByAccountId(this.state.account.id,PAGE_LIMIT, this.state.currentPage, value);
    
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

  deleteCategoryLocally=(id)=>{
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
      await deleteCategory(this.state.item?.id)
      renderSuccessNotification("category deleted")
      this.deleteCategoryLocally(this.state.item.id)
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
  fetchCategoryByAccountId(this.state.accountId, PAGE_LIMIT, this.state.currentPage, "").then(resp => {
      this.setState({
          data: resp.data.items,
          totalItems: resp.data.count
      })
  }).catch(err => {
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
            placeholder="Search Categories"
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
                <TableCell>Name</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {data && data.length ? (
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.account.name}</TableCell>

                    <TableCell>
                    <div className="displayFlex">
                      <Button
                        onClick={() =>
                          this.props.history.push(`/admin/categories/${item.id}`)
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
        {this.renderDeleteModal()}
      </Fragment>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(CategoriesTable));
