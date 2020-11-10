import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { getAccounts, editAccount, searchAccounts } from "../../../core/services/accountsServices"
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({
    table: {
        minWidth: 650,
    },
});
const PAGE_LIMIT = 20;
class AccountTable extends Component {
    state = {
        data: [],
        totalItems: null,
        currentPage: 0,
        searchValue: ""
    }
    componentDidMount() {
        const { currentPage, searchValue } = this.state;
        getAccounts(PAGE_LIMIT, currentPage, searchValue).then(resp => {
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
        const payload = {};
        const { currentPage, searchValue } = this.state;
        payload.active = e.target.checked
        payload.name = item.name
        payload.slug = item.slug
        payload.owner = item.owner
        editAccount(item.id, payload).then(resp => {
            getAccounts(PAGE_LIMIT, currentPage, searchValue).then(resp => {
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
        const { currentPage, searchValue } = this.state;
        this.setState({
            searchValue: value
        }, () => getAccounts(PAGE_LIMIT, currentPage, value).then(resp => {
            this.setState({
                data: resp.data.items,
                totalItems: resp.data.count
            })
        })
        )

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
        getAccounts(PAGE_LIMIT, offset, searchValue).then(resp => {
            this.setState({
                data: resp.data.items,
                totalItems: resp.data.count
            })
        })
    }

    render() {
        const { classes } = this.props;
        const { data, totalItems, selectedPage } = this.state;
        return (
            <Fragment>
                <Paper component="form" className="searchInput" style={{ marginBottom: "20px", width: "22%", padding: "2px 18px", float: "right" }}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={(e) => { this.handleSearch(e.target.value) }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Slug</TableCell>
                                <TableCell align="center">Owner</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Active</TableCell>
                            </TableRow>
                        </TableHead>
                        {data && data.length ?
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center">{item.name}</TableCell>
                                        <TableCell align="center">{item.slug}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => this.props.history.push(`/admin/accounts/${item.id}`)} color="primary">Edit</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={item.active}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                onClick={(e) => this.handleActive(e, item)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            : <p className="noData" >No Data</p>}
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
export default withRouter(withStyles(styles, { withTheme: true })(AccountTable))