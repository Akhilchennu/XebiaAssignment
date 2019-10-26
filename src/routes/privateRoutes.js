import React from 'react';
import {store} from '../index.js';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoutes = ({component: Component, ...rest }) => {
    return (
        <Route  {...rest} render={
            (props) => {
                
                return store.getState().loginSession? <Component {...props} />:<Redirect to={ 
                {
                    pathname: '/',
                    state: {
                        from: props.location
                    }
                }
            } />
            }
        } />
    )
}