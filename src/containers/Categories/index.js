import React, { Component } from 'react';
import CategoriesTable from "./components/categoriesTable";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
export default class Categories extends Component {
    
render(){
  return (
    <React.Fragment>
        <Button
            variant="contained"
            color="default"
            onClick={() => this.props.history.push("/admin/categories/new")}
            startIcon={<CloudUploadIcon />}
            style={{ marginBottom: "20px", float: "left" }}
        >
            Create
        </Button>
        <CategoriesTable />
    </React.Fragment>
  );
}
}