import React, { Component } from 'react';
import ArticleDetail from './articleDetail';
import CommentList from './commentList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import "./style.css";
import { getArticleDetail, getArticleComments, getArticlePhotos, getIsLike, actions as detailActions } from '../../redux/modules/details';
import Header from '../../components/Header';
import { Drawer, BackTop } from 'antd';

class Detail extends Component {
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

    render() {
        const { content, photos, comments, isLike,
            actions: { loadArticleDetail, loadArticleComments, changeLikes },
            match: { params: { postId } } } = this.props;
        return (
            <div id='detail'>
                <Header title="文章详情" type="arrow-left"
                    isLike={isLike}
                    changeLikes={() => { changeLikes(postId) }}
                    showComments={this.showDrawer}
                />
                <ArticleDetail content={content} photos={photos}
                    loadArticleDetail={loadArticleDetail} postId={postId} />
                <Drawer
                    width="80%"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <CommentList comments={comments} loadArticleComments={loadArticleComments} postId={postId} />
                </Drawer>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    content: getArticleDetail(state),
    comments: getArticleComments(state),
    isLike: getIsLike(state),
    photos: getArticlePhotos(state),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(detailActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);