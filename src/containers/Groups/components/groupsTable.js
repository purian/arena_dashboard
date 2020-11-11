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
const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
});
const PAGE_LIMIT = 20;

const DATA = [
  {
    name: "Group 1",
  },
  {
    name: "Group 2",
  },
  {
    name: "Group 3",
  },
  {
    name: "Group 4",
  },
  {
    name: "Group 5",
  },
];
class GroupsTable extends Component {
  state = {
    data: DATA,
    totalItems: null,
    currentPage: 0,
    searchValue: "",
    accountsData: [],
    account: null,
  };
  // componentDidMount() {
  //     const { currentPage, searchValue } = this.state;
  //     getAccounts(PAGE_LIMIT, currentPage, searchValue).then(resp => {
  //         toast.success('Success', {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //         });
  //         this.setState({
  //             data: resp.data.items,
  //             totalItems: resp.data.count
  //         })
  //     }).catch(err => {
  //         toast.error('Error', {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //         });
  //     })
  // }
  // handleSearch = (value) => {
  //     const { currentPage, searchValue } = this.state;
  //     this.setState({
  //         searchValue: value
  //     }, () => getAccounts(PAGE_LIMIT, currentPage, value).then(resp => {
  //         this.setState({
  //             data: resp.data.items,
  //             totalItems: resp.data.count
  //         })
  //     })
  //     )

  // }

  // handlePageChange(page) {
  //     this.setState({
  //         currentPage: page
  //     }, () => this.loadPageData())

  // }
  // loadPageData = () => {
  //     const { currentPage, searchValue } = this.state;
  //     let offset = (currentPage - 1) * PAGE_LIMIT
  //     if (offset < 0) {
  //         offset = 0
  //     }
  //     getAccounts(PAGE_LIMIT, offset, searchValue).then(resp => {
  //         this.setState({
  //             data: resp.data.items,
  //             totalItems: resp.data.count
  //         })
  //     })
  // }

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

  handleOptionChange = (e, newValue, type) => {
    debugger;
    this.setState({
      [type]: newValue,
    });
  };

  handleSearch = async (value) => {
    if (!this.state.account) {
      return;
    }
    try {
      await searchGroupByAccountId(
        value,
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage
      );
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { classes } = this.props;
    const { data, totalItems, selectedPage, accountsData } = this.state;
    return (
      <Fragment>
        <Autocomplete
          id="account"
          options={accountsData}
          style={{ width: "20%", float: "left", margin: "0 8px" }}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) =>
            this.handleOptionChange(event, newValue, "account")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              className="selectAccount"
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
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            {data && data.length ? (
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          this.props.history.push(`/admin/accounts/${item.id}`)
                        }
                        color="primary"
                      >
                        Edit
                      </Button>
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
      </Fragment>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(GroupsTable));
