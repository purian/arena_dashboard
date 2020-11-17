import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";


export default class DeleteModal extends React.Component{

    render(){
        return(
            <Dialog open={this.props.openDeleteModal}>
            <DialogContent>
              Are you sure you want to delete {this.props.name} ?
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClickCancel}>Cancel</Button>
              <Button onClick={this.props.onClickDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
        )
    }
}