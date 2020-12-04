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

export default class UserModal extends React.Component {
  state = {
    loading: true,
    users: [],
  };

  async componentDidMount() {
    const selectedGroup = this.props.selectedGroup;
    await this.fetchUsers(selectedGroup.users);
  }

  fetchUsers = async (users) => {
    let usersData = [];
    try {
      for (let user of users) {
        let data = await getSingleUser(user);
        usersData.push(data.data);
      }
      this.setState({
        users: usersData,
        loading: false,
      });
      renderSuccessNotification("Users fetched");
    } catch (e) {
      console.error(e);
      renderFailureNotification("Users not fetched");
    }
  };

  renderTable() {
    return (
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableBody>
            {this.state.users.map((user, index) => (
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
    return <Typography variant="h6">No users to show.</Typography>;
  };

  renderContent = () => {
    if (this.state.loading) {
      return (
        <div className="loadingContainer">
          {" "}
          <Spinner size="24px" style={{ color: "#65D2FC" }} />{" "}
        </div>
      );
    }

    if (!this.state.users || this.state.users.length <= 0) {
      return this.renderEmptyPlaceHolder();
    }
    return <DialogContent>{this.renderDialogContent()}</DialogContent>;
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.openUsersModal}
          fullWidth={true}
          maxWidth="sm"
          id="commentModalMainContainer"
        >
          <DialogTitle>
            <Typography id="commentModalTitle" className="bold" variant="h4">
              Users
            </Typography>
          </DialogTitle>
          <IconButton
            id="closeSubjectCommentIcon"
            onClick={this.props.closeUserModal}
          >
            <CloseIcon />
          </IconButton>
          {this.renderContent()}
        </Dialog>
      </React.Fragment>
    );
  }
}
