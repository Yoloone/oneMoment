import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isLogin, actions as loginActions } from '../../redux/modules/login'
import LoginForm from './loginForm';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';


class Login extends Component {

    render() {
        const { isLogin, actions: { login }, location: { state } } = this.props;
        if (isLogin) {
            if (state && state.from) {
                return <Redirect to={state.from} />;
            }
            return <Redirect to='/' />;
        }
        return (
            <div>
                <Header title="用户登录" type="arrow-left"
                />
                <LoginForm onSubmit={login} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isLogin: isLogin(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(loginActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);