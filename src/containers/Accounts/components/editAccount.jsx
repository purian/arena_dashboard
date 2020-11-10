import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getUserAccount, getAcntUsers, editAccount } from '../../../core/services/accountsServices';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArenaUploader from "../../../common/arenaUploader/arenaUploader"
import Typography from '@material-ui/core/Typography';
class EditAccount extends Component {
    state = {
        userData: [],
        data: {},
        admins: [],
        ownerId: "",
        userName: "",
        ownerName: "",
        slug: "",
        active: false,
        message: false,
        owner: null
    }
    componentDidMount() {
        const acntId = this.props.match.params.id
        getUserAccount(acntId).then(resp => {
            debugger
            this.setState({
                userName: resp.data.name,
                slug: resp.data.slug,
                owner: resp.data.owner,
                active: resp.data.active,
                admins: resp.data.admins
            })
        })

        // Handle prefilled owner
        //     handlePrefilled = (ownerName) => {
        //         console.log(ownerName, "value")
        //         getAcntUsers(ownerName).then(resp => {
        //             console.log(resp.items, "resp")
        //             this.setState({
        //                 userData: resp.items
        //             })
        //         })
        //     }
    }

    handleUser = (value) => {
        console.log(value, "value")
        getAcntUsers(value).then(resp => {
            this.setState({
                userData: resp.data.items
            })
        })
    }
    handleChange = (type, value) => {
        if (type === "name") {
            this.setState({
                userName: value,
                slug: value.replace(/\s+/g, '-').toLowerCase()
            })
        }else{
            this.setState({
                [type]: value
            })
        }
    }
    handleAdmins = (e, newValue) => {
        let admin = [];
        newValue.map(item => {
            return admin.push(item)
        })
        this.setState({
            admins: admin
        })
    }
    handleUsersOption = (e, newValue) => {
        this.setState({
            owner: newValue
        })
    }
    handleActive = (e) => {
        this.setState({
            active: e.target.checked
        })

    }
    handleSave = () => {
        const payload = {};
        const acntId = this.props.match.params.id
        const { userName, owner, admins, active, slug , coverURL , iconURL} = this.state;
        let cover ={
            original: coverURL || "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg",
            sizes: {
                "720x360": coverURL || "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg",
            }
        }
        let icon ={
            original: iconURL || "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg",
            sizes: {
                "240x240": iconURL || "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg",
            }
        }
        payload.name = userName;
        payload.slug = slug;
        payload.owner = owner.id;
        payload.admins = admins;
        payload.active = active;
        // payload.cover= cover
        // payload.icon = icon
        debugger
        editAccount(acntId, payload).then(resp => {
            toast.success('Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.props.history.push("/admin/accounts")
        }).catch(err => {
            toast.error('Error', {
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


    onUploadComplete = (response, type) => {
        this.setState({
          [type]: response?.data?.original,
        });
      };

    render() {
        const { userData, userName, ownerName, slug, data, active, message } = this.state;
        const { name } = data;
        console.log(userData, "userData")
        return (
            <div>
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
                                    label="Slug"
                                    placeholder="Slug"
                                    variant="outlined"
                                    value={slug}
                                    fullWidth
                                    style={{ marginBottom: "8px" }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => this.handleChange("slug", e.target.value)}
                                />

                                <Autocomplete
                                    id="owner"
                                    options={userData}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => this.handleUsersOption(event, newValue)}
                                    value={this.state.owner}
                                    renderInput={(params) => <TextField {...params} label="Owner" style={{ marginBottom: "8px" }} onChange={(e) => this.handleUser(e.target.value)} variant="outlined" />}
                                />
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={userData}
                                    getOptionLabel={(option) => option.name}
                                    filterSelectedOptions
                                    onChange={(event, newValue) => this.handleAdmins(event, newValue)}
                                    value={this.state.admins}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Admins"
                                            style={{ marginBottom: "8px" }}
                                            placeholder="Admins"
                                            onChange={(e) => this.handleUser(e.target.value)}
                                        />
                                    )}
                                />
                                <Typography variant="body2" className="mgTop12">
                                    Account Cover Uploader
                                </Typography>

                                <ArenaUploader
                                    isMultiple={false}
                                    fileURL={this.state.coverURL && this.state.coverURL}
                                    extensions={["jpg", "jpeg", "png"]}
                                    onUploadComplete={(response) => {
                                        this.onUploadComplete(response, "coverURL");
                                    }}
                                />
                                <Typography variant="body2" className="mgTop12">
                                    Icon Uploader
                                </Typography>
                                <ArenaUploader
                                    isMultiple={false}
                                    fileURL={this.state.iconURL && this.state.iconURL}
                                    extensions={["jpg", "jpeg", "png"]}
                                    onUploadComplete={(response) => {
                                        this.onUploadComplete(response, "iconURL");
                                    }}
                                />

                                <FormControlLabel style={{ width: "100%" }}
                                    control={
                                        <Checkbox
                                            checked={active}
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
export default withRouter(EditAccount)