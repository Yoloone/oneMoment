import React, { Component } from 'react';


class ArticleDetail extends Component {
    componentDidMount() {
        const { postId, loadArticleDetail } = this.props;
        loadArticleDetail(postId);
    }

    componentDidUpdate() {
        const { photos } = this.props;
        let element;
        if (photos && Array.isArray(photos)) {
            photos.forEach(item => {
                element = document.getElementById(item.tag_name);
                if(element) {
                    element.setAttribute('src', item.medium.url);
                }
            })
        }
    }
    render() {
        const { content } = this.props;
        return (
            <div>
                <div className="wrap" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }
}

export default ArticleDetail;