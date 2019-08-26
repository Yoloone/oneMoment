import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorInfo from './authorInfo';
import AuthorPosts from './authorPosts';
import Header from '../../components/Header';
import './style.css';
import { getAuthorInfo, getAuthorPosts, actions as authorActions } from '../../redux/modules/authorInfo';

class AuthorProfile extends Component {

    componentWillMount() {
        const { actions: { setAuthorID }, match: { params: { authorId } } } = this.props;
        setAuthorID(authorId);
    }
    render() {
        const { authorInfo, authorPosts,
            actions: { loadAuthorPosts } } = this.props;

        return (
            <div id='authorProfile'>
                <Header title="作者详情" type="arrow-left" />
                {authorInfo ? <AuthorInfo author={authorInfo} /> : ''}
                <AuthorPosts posts={authorPosts} loadAuthorPosts={loadAuthorPosts} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    authorInfo: getAuthorInfo(state),
    authorPosts: getAuthorPosts(state),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(authorActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile)
