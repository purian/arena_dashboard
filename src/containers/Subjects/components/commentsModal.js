import React, { Component } from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getComments, deleteComment} from "../../../core/services/miscServices";
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"
import Spinner from "@material-ui/core/CircularProgress";
import { Typography, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from '@material-ui/icons/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class CommentsModal extends React.Component{
    state={
        loading: true,
        commentsData: null
    }

    async componentDidMount(){
        const subjectId = this.props.subjectId

        await this.fetchComments(subjectId)
    }

    fetchComments=async(subjectId) =>{
        if(!subjectId){
            renderFailureNotification("subject id not present")
        }
        try{
            let response = await getComments(subjectId) 
            this.setState({
                commentsData: response.data.items,
                loading: false
            })
            renderSuccessNotification("Comments fetched")
        }catch(e){
            console.error(e)
            renderFailureNotification("Comments not fetched")
        }
    }

    onClickDelete =(index) =>{
        debugger
        this.setState({
            openConfirmModal: true,
            index: index
        })
    }

    renderTable(){
        return(
            <TableContainer component={Paper} elevation={0}>
            <Table >
              <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="h6" className="margin8 bold" >
                            Name
                        </Typography>
                    </TableCell>
                  <TableCell >
                        <Typography variant="h6" className="margin8 bold" >
                            Comment
                        </Typography>
                </TableCell>
                  <TableCell >
                    <Typography variant="h6" className="margin8 bold" >
                            Action
                        </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.commentsData.map((singleComment, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        <div className="displayFlex">
                            <PersonIcon color="primary" className="margin8"  />
                            <Typography className="margin8" >
                                {singleComment.user.name}
                            </Typography>

                        </div>
                    </TableCell>
                    <TableCell >
                        <Typography className="margin8" >
                            {singleComment.text}
                        </Typography>
                    </TableCell>
                    <TableCell >
                        <Button className="margin8" color="primary" onClick={()=>{this.onClickDelete(index)}}>
                            Delete
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
    }

    renderDialogContent(){
        return(
            <React.Fragment>
                {this.renderTable()}
            </React.Fragment>
        )
    }

    renderEmptyPlaceHolder=()=>{
        return (<Typography variant="h6">
            No comments to show.
        </Typography>)
    }

    onClickCancel=()=>{
        this.setState({
            openConfirmModal: false
        })
    }

    onClickDeleteConfirm =async()=>{
        try{
            await deleteComment(this.state.commentsData[this.state.index].id)
            let commentDataCopy = Object.assign([], this.state.commentsData)
            debugger
            commentDataCopy.splice(this.state.index, 1)
            this.setState({
                commentsData: commentDataCopy,
                openConfirmModal: false
    
            })

            renderSuccessNotification("Comment deleted")
        }catch(e){
            renderFailureNotification("Comment delete failed")
        }

    }

    renderConfirmModal=()=>{
        return(<Dialog
        open={this.state.openConfirmModal}
        >
            <DialogContent>
                Are you sure you want to delete this comment ?
            </DialogContent>
            <DialogActions>
                <Button onClick={this.onClickCancel}>
                    Cancel
                </Button >
                <Button onClick={this.onClickDeleteConfirm}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>)
    }

    renderContent=()=>{
        if(!this.state.commentsData || this.state.commentsData.length <= 0 ){
            return this.renderEmptyPlaceHolder()
        }
        return(<DialogContent>
        {this.renderDialogContent()}
    </DialogContent>)
    }


    render(){
        if(this.state.loading){
            return <Spinner size="24px" style={{ color: "#65D2FC" }} />
        }
        debugger

        return(
            <React.Fragment>
                <DialogTitle>
                    <Typography id="commentModalTitle" className="bold" variant="h4">
                        Subject Comments
                    </Typography>
                </DialogTitle>
                <IconButton
                    id="closeSubjectCommentIcon"
                    onClick={this.props.closeCommentModal}
                >
                    <CloseIcon />
                </IconButton>
                {this.renderContent()}

                {this.renderConfirmModal()}
            </React.Fragment>
        )
    }
}