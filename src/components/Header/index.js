import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { Icon, Drawer, Avatar, DatePicker } from 'antd';
import moment from 'moment';

class Header extends Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    back = () => {
        window.history.back();
    }

    onChange = (date, dateString) => {
        if (date) {
            this.props.changeDate(date._d);
        }
    }
    disabledDate(current) {
        return current && current > moment().endOf('day');
    }
    render() {
        const { title, type, isLike, changeLikes, changeDate } = this.props;
        return (
            <div className='header-panel'>
                <div className='header-icon'>
                    <Icon type={type} onClick=
                        {type === 'menu' ?
                            this.showDrawer :
                            type === 'arrow-left' ?
                                this.back : ''
                        } />
                </div>
                <div className='header-title'>
                    {changeDate ?
                        <DatePicker
                            format='YYYY-MM-DD'
                            onChange={this.onChange}
                            disabledDate={this.disabledDate} /> :
                        title}
                </div>
                <div className='header-extra'>
                    {changeLikes ?
                        <Icon type='heart'
                            theme={isLike ? 'filled' : 'outlined'}
                            onClick={changeLikes} /> : ''}
                </div>
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div><Avatar size="large" icon="user" shape='circle' /> &nbsp; 登录</div>
                    <ul className='drawer-list'>
                        <li><Link to="/"><Icon type="home" theme="twoTone" twoToneColor="#48c7ce" />今日一刻</Link></li>
                        <li><Link to="/historyArticles"><Icon type="file" theme="twoTone" twoToneColor="#65c791" />往期内容</Link></li>
                        <li><Link to="/hotAuthors"><Icon type="edit" theme="twoTone" twoToneColor="#ef9d56" />热门作者</Link></li>
                        <li><Link to="/column"><Icon type="project" theme="twoTone" twoToneColor="#5295ce" />栏目浏览</Link></li>
                        <li><Link to="/like"><Icon type="heart" theme="twoTone" twoToneColor="#fb7677" />我的喜欢</Link></li>
                    </ul>
                </Drawer>
            </div>
        );
    }
}

export default Header;