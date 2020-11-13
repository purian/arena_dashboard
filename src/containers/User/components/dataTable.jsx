import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { getUsers, blockUser, searchUser, seacrUserByAccount } from "../../../core/services/usersServices"
import { searchAccounts, postAccounts } from '../../../core/services/accountsServices';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({
    table: {
        minWidth: 650,
    },
});
const PAGE_LIMIT = 20;
class UserTable extends Component {
    state = {
        data: [],
        userData: [],
        totalItems: null,
        currentPage: 0,
        searchValue: ""
    }
    componentDidMount() {
        const { currentPage, searchValue } = this.state;
        getUsers(PAGE_LIMIT, currentPage, searchValue).then(resp => {
            
            toast.success('Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                data: resp.data.items,
                totalItems: resp.data.count
            })
        }).catch(err => {
            toast.error('Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
    handleActive = (e, item) => {
        const { currentPage, searchValue } = this.state;
        const payload = {};
        payload.blocked = e.target.checked
        blockUser(payload, item.id).then(resp => {
            toast.success('Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            getUsers(PAGE_LIMIT, currentPage, searchValue).then(resp => {
                this.setState({
                    data: resp.data.items,
                    count: resp.data.count
                })
            })
        }).catch(err => {
            toast.error('Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
    handleSearch = (value) => {
        this.setState({
            searchValue: value
        }, () => searchUser(value).then(resp => {

            this.setState({
                data: resp.data.items
            })
        }).catch(err => {

        })
        )

    }
    handleUsersOption = (e, newValue) => {
        console.log(e, newValue, "e, newValue")
        const { currentPage } = this.state;
        if (newValue) {
            this.setState({
                ownerId: newValue.id
            }, () => seacrUserByAccount(newValue.id, PAGE_LIMIT, currentPage).then(resp => {

                this.setState({
                    data: resp.data.items,
                    totalItems: resp.data.count
                })
            }).catch(err => {

            })
            )
        }
    }
    handleUser = (value) => {
        searchAccounts(value).then(resp => {
            this.setState({
                userData: resp.data.items
            })
        }).catch(err => {

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
        getUsers(PAGE_LIMIT, offset, searchValue).then(resp => {
            this.setState({
                data: resp.data.items,
                totalItems: resp.data.count
            })
        }).catch(err => {
        })
    }
    render() {
        const { classes } = this.props;
        const { data, userData, totalItems } = this.state;
        return (
            <Fragment>
                <Autocomplete
                    id="owner"
                    options={userData}
                    style={{ width: "20%", float: "left", margin: "0 16px" }}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => this.handleUsersOption(event, newValue)}
                    renderInput={(params) => <TextField {...params} className="selectAccount customHeight" label="Select Account" onChange={(e) => this.handleUser(e.target.value)} variant="outlined" />}
                />
                <Paper component="form" className="searchInput" style={{ marginBottom: "20px", width: "22%", padding: "2px 18px", float: "right" }}>
                    <div className="displayFlex">
                        <InputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(e) => { this.handleSearch(e.target.value) }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>

                    </div>
                </Paper>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell >Email</TableCell>
                                <TableCell >Actions</TableCell>
                                <TableCell >Active</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length ? data.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell >{item.email}</TableCell>
                                    <TableCell >
                                        <Button className="noPadding minWidthInitial" onClick={() => this.props.history.push(`/admin/user/${item.id}`)} color="primary">Edit</Button>
                                    </TableCell>
                                    <TableCell >
                                        <Checkbox
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            onClick={(e) => this.handleActive(e, item)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )) : <p className="noData"> No Results</p>}
                        </TableBody>
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
export default withRouter(withStyles(styles, { withTheme: true })(UserTable))