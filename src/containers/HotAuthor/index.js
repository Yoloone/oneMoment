import React, { Component } from 'react';
import AuthorList from './AuthorList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getHotAuthors, getRecAuthors, isFetching, actions as authorActions } from '../../redux/modules/hotAuthors';
import Header from '../../components/Header';

class HotAuthor extends Component {
    render() {
        const { recAuthors, hotAuthors,isFetching, actions: { loadRecAuthors, loadHotAuthors } } = this.props;
        return (
            <div id='hotAuthor'>
                <Header title="热门作者" type="menu" />
                <AuthorList loading ={isFetching} authors={recAuthors} loadAuthors={loadRecAuthors} header="本周推荐" />
                <AuthorList loading ={isFetching} authors={hotAuthors} loadAuthors={loadHotAuthors} header="热门作者" />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    recAuthors: getRecAuthors(state),
    hotAuthors: getHotAuthors(state),
    isFetching: isFetching(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(authorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotAuthor);