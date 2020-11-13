import React, { Component } from 'react';
import GroupsTable from "./components/groupsTable";
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
export default class Groups extends Component {
    state = {
        userName:"",
        password:""
    }
    
render(){
  return (
    <React.Fragment>
        <Button
            variant="contained"
            color="default"
            onClick={() => this.props.history.push("/admin/groups/new")}
            startIcon={<AddIcon />}
            style={{ marginBottom: "20px", float: "left" }}
        >
            Create
        </Button>
        <GroupsTable />
    </React.Fragment>
  );
}
}