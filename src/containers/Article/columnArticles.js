import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { getArticleList, getColumnName, isFetching, actions as articleActions } from '../../redux/modules/showArticles';

class ColumnArticle extends Component {
    componentWillMount() {
        const { actions: { setColumnID },
            match: { params: { columnId } } } = this.props;
        setColumnID(columnId);
    }
    render() {
        const { articles, isFetching, columnName, actions: { loadColumnArticles },
            match: { params: { columnId } } } = this.props;
        return (
            <div>
                <Header title={columnName} type="arrow-left" />
                <ArticleList
                    loading={isFetching}
                    articles={articles}
                    loadArticles={() => loadColumnArticles(columnId)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    articles: getArticleList(state),
    columnName: getColumnName(state),
    isFetching: isFetching(state)
});

const mapDispatchToprops = dispatch => ({
    actions: bindActionCreators(articleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToprops)(ColumnArticle);