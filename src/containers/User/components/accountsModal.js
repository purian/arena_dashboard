import { Typography } from "@material-ui/core";
import Spinner from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import {
  renderFailureNotification,
  renderSuccessNotification,
} from "../../../common/Notifications/showNotifications";
import { getSingleUser } from "../../../core/services/usersServices";

export default class AccountsModal extends React.Component {

  renderTable() {
    return (
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableBody>
            {this.props.selectedAccount.accounts.map((user, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <div className="displayFlex">
                    <PersonIcon color="primary" className="margin8" />
                    <Typography className="margin8">{user.name}</Typography>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  renderDialogContent() {
    return <React.Fragment>{this.renderTable()}</React.Fragment>;
  }

  renderEmptyPlaceHolder = () => {
    return <Typography variant="h6">No Accounts to show.</Typography>;
  };

  renderContent = () => {
    if (!this.props.selectedAccount ||!this.props.selectedAccount.accounts || this.props.selectedAccount.accounts.length <= 0) {
      return this.renderEmptyPlaceHolder();
    }
    return <DialogContent>{this.renderDialogContent()}</DialogContent>;
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.openAccountsModal}
          fullWidth={true}
          maxWidth="sm"
          id="commentModalMainContainer"
        >
          <DialogTitle>
            <Typography id="commentModalTitle" className="bold" variant="h4">
              Accounts
            </Typography>
          </DialogTitle>
          <IconButton
            id="closeSubjectCommentIcon"
            onClick={this.props.closeAccountsModal}
          >
            <CloseIcon />
          </IconButton>
          {this.renderContent()}
        </Dialog>
      </React.Fragment>
    );
  }
}
