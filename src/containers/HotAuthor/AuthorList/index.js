import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import "./style.css";
class AuthorList extends Component {
    componentDidMount() {
        this.props.loadAuthors();
    }
    render() {
        const { authors, header, loading } = this.props;
        return (
            <div>
                <List
                    loading={loading}
                    header={header}
                    dataSource={authors}
                    itemLayout='horizontal'
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Avatar src={item.avatar} size="large" />
                            <List.Item.Meta
                                title={<Link to={`/authorProfile/${item.id}`}>{item.name}</Link>}
                                description={item.editor_notes}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default AuthorList;