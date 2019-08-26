import React, { Component } from 'react';
import ArticleDetail from './articleDetail';
import CommentList from './commentList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import "./style.css";
import { getArticleDetail, getArticleComments, getIsLike, actions as detailActions } from '../../redux/modules/details';
import Header from '../../components/Header';

class Detail extends Component {
    render() {
        const { content, comments, isLike,
            actions: { loadArticleDetail, loadArticleComments, changeLikes },
            match: { params: { postId } } } = this.props;
        return (
            <div id='detail'>
                <Header title="文章详情" type="arrow-left"
                    isLike={isLike}
                    changeLikes={() =>{changeLikes(postId)}}
                />
                <ArticleDetail content={content} loadArticleDetail={loadArticleDetail} postId={postId} />
                <CommentList comments={comments} loadArticleComments={loadArticleComments} postId={postId} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    content: getArticleDetail(state),
    comments: getArticleComments(state),
    isLike: getIsLike(state),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(detailActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);