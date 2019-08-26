import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

class loginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        this.props.onSubmit(username, password);
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{ textAlign: 'center', margin: '10%' }}>
                <Form.Item>
                    <Input id="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item>

                    <Input
                        id="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />

                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#21BBA6' }}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default loginForm;