import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../redux/modules/login';

class PrivateRoute extends Component {
    render() {
        const { component: Component, isLogin, ...rest} = this.props;
        return (
            <Route 
             {...rest}
             render={props =>{
                return isLogin ? 
                    <Component {...props}/> :
                    <Redirect to={{
                        pathname:'/login',
                        state: {from: props.location}
                    }}/>
             }}
            />
        );
    }
}

const mapStateToProps = state => ({
    isLogin: isLogin(state)
})

export default connect(mapStateToProps, null)(PrivateRoute);