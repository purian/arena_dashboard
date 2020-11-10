import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isValid } from '../../core/services/authenticationServices'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return(
    <Route {...rest} render={props => (
        isValid()
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />
    )
    }

export default PrivateRoute