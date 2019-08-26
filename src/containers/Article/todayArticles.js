import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { getArticleList, getDate, isFetching, actions as todayActions } from '../../redux/modules/showArticles';

class TodayArticle extends Component {
    render() {
        const { articles,isFetching, date, actions: { loadArticles } } = this.props;
        // const date = new Date();
        return (
            <div>
                <Header title="今日一刻" type="menu" />
                <ArticleList
                    loading={isFetching}
                    articles={articles}
                    loadArticles={() => loadArticles(new Date())}
                    date={date} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    articles: getArticleList(state),
    date: getDate(state),
    isFetching: isFetching(state)
});

const mapDispatchToprops = dispatch => ({
    actions: bindActionCreators(todayActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToprops)(TodayArticle);