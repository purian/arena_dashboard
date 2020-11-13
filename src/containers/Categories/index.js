import React, { Component } from 'react';
import CategoriesTable from "./components/categoriesTable";
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
export default class Categories extends Component {
    
render(){
  return (
    <React.Fragment>
        <Button
            variant="contained"
            color="default"
            onClick={() => this.props.history.push("/admin/categories/new")}
            startIcon={<AddIcon />}
            style={{ marginBottom: "20px", float: "left" }}
        >
            Create
        </Button>
        <CategoriesTable />
    </React.Fragment>
  );
}
}