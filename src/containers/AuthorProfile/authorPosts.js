import React, { Component } from 'react';
import { List, Icon } from 'antd';

class AuthorPosts extends Component {
    componentDidMount() {
        this.props.loadAuthorPosts();
    }
    render() {
        const { posts } = this.props;
        return (
            <div>
                <List
                    header={<div>发表的文章</div>}
                    dataSource={posts}
                    itemLayout='horizontal'
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                title={item.title}
                            />
                            <div><Icon type='heart'/>&nbsp;{item.like_count}</div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default AuthorPosts;