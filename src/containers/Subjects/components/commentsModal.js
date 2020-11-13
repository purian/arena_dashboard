import React, { Component } from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getComments} from "../../../core/services/miscServices";
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"
import Spinner from "@material-ui/core/CircularProgress";

export default class CommentsModal extends React.Component{
    state={
        loading: true
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
    render(){
        if(this.state.loading){
            return <Spinner size="24px" style={{ color: "#65D2FC" }} />
        }
        return(
            <React.Fragment>
                <DialogContent>
                    Dialog Content
                </DialogContent>
                <DialogActions>
                    Dialog Actions
                </DialogActions>
            </React.Fragment>
        )
    }
}