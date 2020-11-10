import React, { Component, Fragment } from 'react';
import AccountsTable from "./components/dataTable";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
class Accounts extends Component {

    render() {
        return (
            <Fragment>
                <Button
                    variant="contained"
                    color="default"
                    onClick={() => this.props.history.push("/admin/accounts/new")}
                    startIcon={<CloudUploadIcon />}
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