import React, { Component, Fragment } from 'react';
import AccountsTable from "./components/dataTable";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
class Accounts extends Component {

    render() {
        return (
            <Fragment>
                <Button
                    variant="contained"
                    color="default"
                    onClick={() => this.props.history.push("/admin/accounts/new")}
                    startIcon={<AddIcon />}
                    style={{ marginBottom: "20px" }}
                >
                    Create
                </Button>
                <AccountsTable />
            </Fragment>
        );
    }
}
export default (Accounts)