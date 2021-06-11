import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAcntUsers, postAccounts } from '../../../core/services/accountsServices';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {renderFailureNotification} from "../../../common/Notifications/showNotifications"

class CreateAccount extends Component {
    state = {
        userData: [],
        admins: [],
        ownerId: "",
        userName: "",
        slug: "",
        active: false,
        message: false
    }
    handleChange = (type, value) => {
        this.setState({
            userName: value,
            slug: value.replace(/\s+/g, '-').toLowerCase()
        })
    }
    handleUser = (value) => {
        getAcntUsers(value).then(resp => {
            console.log(resp.items, "resp")
            this.setState({
                userData: resp.data.items
            })
        })
    }
    handleAdmins = (e, newValue) => {
        let admin = [];
        newValue.map(item => {
            admin.push(item.id)
            this.setState({
                admins: admin
            })
        })
    }
    handleUsersOption = (e, newValue) => {
        this.setState({
            ownerId: newValue.id
        })
    }
    handleActive = (e) => {
        this.setState({
            active: e.target.checked
        })

    }

    checkErrors =(payload)=>{
        if(!payload.name || payload.name.length < 4){
            renderFailureNotification("Name should be greater than 4")
            return true
        }
        if(!payload.owner){
            renderFailureNotification("Owner required")
            return true
        }
        return false
    }
    handleSave = () => {
        const payload = {};
        const { userName, ownerId, admins, active, slug } = this.state;
        payload.name = userName;
        payload.slug = slug
        payload.owner = ownerId;
        payload.admins = admins;
        payload.active = active
        if(this.checkErrors(payload)){
            return 
        }
        postAccounts(payload).then(resp => {
            toast.success('Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(()=>{
                this.props.history.replace(`/admin/accounts/${resp.data.id}`)
              },1000)
        }).catch(err => {
            console.error(err)
            if(err?.response?.data?.details?.name?.message){
                renderFailureNotification(err?.response?.data?.details?.name?.message);
              }else{
                renderFailureNotification("Account post error");
              }
        })
    }

    render() {
        const { userData, userName, message, slug } = this.state;
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
                                    style={{ margin: 8 }}
                                    placeholder="Name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => this.handleChange("name", e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-width"
                                    label="Slug"
                                    className="textTransform"
                                    style={{ margin: 8 }}
                                    placeholder="Slug"
                                    value={slug}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <Autocomplete
                                    id="owner"
                                    options={userData}
                                    getOptionLabel={(option) => option.name}
                                    filterOptions={(option, state) => option}
                                    onChange={(event, newValue) => this.handleUsersOption(event, newValue)}
                                    renderInput={(params) => <TextField {...params} style={{ margin: 8 }} label="Owner" onChange={(e) => this.handleUser(e.target.value)} variant="outlined" />}
                                />
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={userData}
                                    getOptionLabel={(option) => option.name}
                                    filterOptions={(option, state) => option}
                                    filterSelectedOptions
                                    onChange={(event, newValue) => this.handleAdmins(event, newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Admins"
                                            placeholder="Admins"
                                            onChange={(e) => this.handleUser(e.target.value)}
                                            style={{ margin: 8 }}
                                        />
                                    )}
                                />
                                <FormControlLabel style={{ width: "100%", margin: 8 }}
                                    control={
                                        <Checkbox
                                            onChange={(e) => this.handleActive(e)}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Active"
                                />
                                <Button variant="contained" style={{ margin: 8 }} color="primary" onClick={() => this.handleSave()} >
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

export default withRouter(CreateAccount)