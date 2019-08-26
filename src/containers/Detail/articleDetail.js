import React, { Component } from 'react';


class ArticleDetail extends Component {
    componentDidMount() {
        const {postId, loadArticleDetail} = this.props;
        loadArticleDetail(postId);
    }
    render() {
        const {content} = this.props;
        return (
            <div className="wrap" dangerouslySetInnerHTML={{__html: content}} />
        );
    }
}

export default ArticleDetail;