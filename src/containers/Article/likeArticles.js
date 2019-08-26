import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { getLikeList, isFetching, } from '../../redux/modules/showArticles';

class LikeArticles extends Component {
    render() {
        const { articles, isFetching } = this.props;
        return (
            <div>
                <Header title="我的喜欢" type="menu" />
                <ArticleList
                    loading={isFetching}
                    articles={articles}
                    loadArticles={() => { }}
                />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    articles: getLikeList(state),
    isFetching: isFetching(state)
});

export default connect(mapStateToProps, null)(LikeArticles);
