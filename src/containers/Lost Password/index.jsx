import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { lostPassword } from "../../core/services/authenticationServices"
import { getHomePage } from '../../core/services/authenticationServices';
import { renderFailureNotification, renderSuccessNotification } from "../../common/Notifications/showNotifications";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LostPassword extends Component {
  state = {
    userName: "",
    password: ""
  }
  handleResetFields = (type, value) => {
    if (type === "email") {
      this.setState({
        userName: value
      })
    }
  }
  handleReset = () => {
    const payload = {};
    const { userName, password } = this.state;
    if (userName !== "") {
      payload.email = userName
      payload.returnUrl = `${process.env.REACT_APP_RESET_PASSWORD_RETURN_URL}/auth/reset-password`
    }
    lostPassword(payload).then(res => {
      renderSuccessNotification("Please check your email id")
      this.props.history.push("/log_in");
    }).catch(err => {
      console.error(err)
      renderFailureNotification("Something went wrong")
    })
  }
  handleCancel = () => {
    this.props.history.push("/log_in");
  }
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => this.handleResetFields("email", e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.handleReset()}
            >
              Reset Password
          </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={() => this.handleCancel()} variant="body2">
                  Cancel
              </Link>
              </Grid>
              {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }
}
export default withStyles(styles, { withTheme: true })(LostPassword)