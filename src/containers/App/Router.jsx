import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from "../Layout"
import Login from "../Login";
import LostPassword from "../Lost Password";
import User from "../User";
import Accounts from "../Accounts";
import CreateAccount from "../Accounts/components/createAccounts";
import EditAccount from "../Accounts/components/editAccount";
import EditUser from "../User/components/editUser";
import CreateUser from "../User/components/createUser";
import ResetPassword from "../ResetPassword";
import Subjects from "../Subjects";
import Groups from "../Groups";
import Categories from "../Categories";
import { getRole } from '../../core/services/authenticationServices'
import PrivateRoute from './PrivateRoutes'
import { isValid } from '../../core/services/authenticationServices'
import CreateGroup from "../Groups/components/createGroup"
const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/admin/user" component={User} />
    <PrivateRoute path="/admin/user/new" component={CreateUser} />
    <PrivateRoute path="/admin/user/:id" component={EditUser} />
    <PrivateRoute exact path="/admin/accounts" component={Accounts} />
    <PrivateRoute path="/admin/accounts/new" component={CreateAccount} />
    <PrivateRoute path="/admin/accounts/:id" component={EditAccount} />
    <PrivateRoute path="/admin/subjects" component={Subjects} />
    <PrivateRoute exact path="/admin/groups" component={Groups} />
    <PrivateRoute path="/admin/groups/new" component={CreateGroup} />

    <PrivateRoute path="/admin/categories" component={Categories} />

  </Switch>

)
const RBAC_ROUTES = [
  {
    path: "/admin",
    component: Routes,
    canAccess: ['SYSTEM_ADMIN']
  },
]
const wrappedRoutes = () => (
  <Fragment>
    <Layout>
      {
        RBAC_ROUTES.filter(route => route.canAccess.includes(getRole()))
          .map(route => { { console.log(route.path, "route") } return <PrivateRoute path={route.path} key={route.path} component={route.component} /> })
      }
    </Layout>
    {/* <Footer /> */}
  </Fragment>
);

const Router = () => (
  <main>
    {isValid() ?
      <Switch>
        <PrivateRoute path="/" component={wrappedRoutes} />
      </Switch>
      :
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/log_in" component={Login} />
        <Route exact path="/lostPassword" component={LostPassword} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <PrivateRoute path="/" component={wrappedRoutes} />
      </Switch>
    }
  </main>
);

export default Router;
