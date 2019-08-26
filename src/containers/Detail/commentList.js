import React, { Component } from 'react';
import { List , Avatar} from 'antd'
class CommentList extends Component {
    componentDidMount() {
        const {postId, loadArticleComments} = this.props;
        loadArticleComments(postId);
    }
    render() {
        const { comments } = this.props;
        return (
                <List
                    header={`文章评论(${comments.length})`}
                    dataSource={comments}
                    itemLayout='horizontal'
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.author.avatar} size="default"/>
                                }
                                title={<a href="https://ant.design">{item.author.name}</a>}
                                description={item.content}
                            />
                            <div>{item.created_time.split(/\s+/)[0]}</div>
                        </List.Item>
                    )}
                />
        );
    }
}

export default CommentList;