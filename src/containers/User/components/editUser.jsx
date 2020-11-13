import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getSingleUser, editUser } from '../../../core/services/usersServices';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class EditUser extends Component {
    state = {
        userName: "",
        email: "",
        allowEmails: false,
        userType: "USER"
    }
    componentDidMount() {
        const userId = this.props.match.params.id
        getSingleUser(userId).then(resp => {
            
            this.setState({
                userName: resp.data.name,
                email: resp.data.email,
                allowEmails: resp.data.allowEmails,
                userType: resp.data.role
            })

        })
    }

    handleChange = (type, value) => {
        if (type === "name") {
            this.setState({
                userName: value
            })
        }
        if (type === "email") {
            this.setState({
                email: value
            })
        }
    }
    handleUserType = (e) => {
        this.setState({
            userType: e.target.value
        })
    }
    handleUsersOption = (e, newValue) => {
        this.setState({
            ownerId: newValue.id
        })
    }
    handleActive = (e) => {
        this.setState({
            allowEmails: e.target.checked
        })

    }
    handleSave = () => {
        const payload = {};
        const userId = this.props.match.params.id
        const { userName, userType, allowEmails, email } = this.state;
        payload.name = userName;
        payload.email = email;
        payload.allowEmails = allowEmails
        payload.role = userType
        editUser(userId, payload).then(resp => {
            toast.success('Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.props.history.push("/admin/user")
        }).catch(err => {
            toast.success('Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    render() {
        const { userType, userName, email, allowEmails } = this.state;
        return (
            <div>
                <ToastContainer />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: "20px" }}>
                            <form autoComplete="off">
                                <TextField
                                    id="standard-full-width"
                                    label="Name"
                                    placeholder="Name"
                                    fullWidth
                                    value={userName}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => this.handleChange("name", e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-width"
                                    label="Email"
                                    placeholder="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => this.handleChange("email", e.target.value)}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <FormControlLabel style={{ width: "100%" }}
                                    control={
                                        <Checkbox
                                            onChange={(e) => this.handleActive(e)}
                                            name="checkedB"
                                            color="primary"
                                            checked={allowEmails}
                                        />
                                    }
                                    label="Allow e-mails"
                                />
                                {/* <FormLabel component="legend" style={{ margin: 8 }}>Role</FormLabel>
                                <RadioGroup aria-label="userType" name="userType" style={{ margin: 8 }} value={userType} onChange={(e) => this.handleUserType(e)} >
                                    <FormControlLabel value="SYSTEMOWNER" control={<Radio />} label="System Owner" disabled />
                                    <FormControlLabel value="ADMINISTRATOR" control={<Radio />} label="Administrator" disabled />
                                    <FormControlLabel value="USER" control={<Radio />} label="User" disabled />
                                </RadioGroup> */}
                                <Button variant="contained" color="primary" onClick={() => this.handleSave()} >
                                    Save
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
