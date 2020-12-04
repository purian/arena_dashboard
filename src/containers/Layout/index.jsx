import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import InboxIcon from '@material-ui/icons/AccountBox';
import CategoryIcon from '@material-ui/icons/Category';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import SubjectIcon from '@material-ui/icons/Subject';
import clsx from 'clsx';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../../core/services/authenticationServices';
import Typography from "@material-ui/core/Typography";

const ROUTES ={
  accounts: "Accounts",
  subjects: "Subjects",
  user: "User",
  groups: "Groups",
  categories: "Categories"
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  appBarTitle: {
    marginLeft: 240
  }
}));


function Layout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getTitle=()=>{
    if(window.location.pathname.includes("accounts")){
      return ROUTES.accounts
    }
    if(window.location.pathname.includes("user")){
      return ROUTES.user
    }
    if(window.location.pathname.includes("subjects")){
      return ROUTES.subjects
    }
    if(window.location.pathname.includes("groups")){
      return ROUTES.groups
    }
    if(window.location.pathname.includes("categories")){
      return ROUTES.categories
    }
  }

  const handleLogout = () => {
    logout()
    window.location.reload('/')
    props.history.push('/')
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"

      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.appBarTitle}>
            {getTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerOpen]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerOpen]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </div>
        <Divider />
        <List>
          <NavLink activeClassName="navbar__link--active" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }} to="/admin/accounts" exact>
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItem>
          </NavLink>
          <NavLink activeClassName="navbar__link--active" to="/admin/user" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }} exact>
            <ListItem button>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </NavLink>
          <NavLink activeClassName="navbar__link--active" to="/admin/groups" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }} exact>
            <ListItem button>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>
          </NavLink>
          <NavLink activeClassName="navbar__link--active" to="/admin/categories" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }} exact>
            <ListItem button>
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
          </NavLink>
          <NavLink activeClassName="navbar__link--active" to="/admin/subjects" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }} exact>
            <ListItem button>
              <ListItemIcon><SubjectIcon /></ListItemIcon>
              <ListItemText primary="Subjects" />
            </ListItem>
          </NavLink>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default withRouter(Layout)
