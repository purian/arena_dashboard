import React, { Component, Fragment } from 'react';
import AccountsTable from "./components/dataTable";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
class Users extends Component {

  render() {
    return (
      <Fragment>
        <Button
          variant="contained"
          color="default"
          onClick={() => this.props.history.push("/admin/user/new")}
          startIcon={<AddIcon />}
          style={{ marginBottom: "20px", float: "left" }}
        >
          Create
      </Button>
        <AccountsTable />
      </Fragment>
    );
  }
}
export default (Users)