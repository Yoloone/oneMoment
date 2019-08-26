import React, { Component } from 'react';
import { Avatar } from 'antd';

class AuthorInfo extends Component {
    render() {
        const { author } = this.props;
        return (
            <div>
                <div id='profile-panel'>
                    <Avatar src={author.large_avatar} shape='circle' icon='user' size='large'/>
                    <p>{author.name}</p>
                    <p>签名：{author.alt}</p>
                </div>
                <p id="resume">简介：{author.resume}</p>
            </div>
        );
    }
}

export default AuthorInfo;