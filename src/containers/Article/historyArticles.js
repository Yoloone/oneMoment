import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { getArticleList, getDate, isFetching, actions as todayActions } from '../../redux/modules/showArticles';

class HistoryArticle extends Component {
    render() {
        const { articles, isFetching, actions: { loadArticles } } = this.props;
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return (
            <div>
                <Header title="往期内容" type="menu"  changeDate={loadArticles}/>
                <ArticleList
                    loading={isFetching}
                    articles={articles}
                    loadArticles={() => loadArticles(date)}
                    date={this.props.date} />
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

export default connect(mapStateToProps, mapDispatchToprops)(HistoryArticle);