import React, { Component } from 'react';
import SubjectsTable from "./components/subjectTable";
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
export default class Subjects extends Component {
    
render(){
  return (
    <React.Fragment>
        <Button
            variant="contained"
            color="default"
            onClick={() => this.props.history.push("/admin/subjects/new")}
            startIcon={<AddIcon />}
            style={{ marginBottom: "20px", float: "left" }}
        >
            Create
        </Button>
        <SubjectsTable />
    </React.Fragment>
  );
}
}