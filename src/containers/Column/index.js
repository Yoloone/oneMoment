import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./style.css";
import { getAllColumns, actions as columnActions } from '../../redux/modules/showColumns';
import Header from '../../components/Header';

class Column extends Component {
    componentDidMount() {
        const { actions: { loadColumns } } = this.props;
        loadColumns();
    }
    render() {
        const { columns } = this.props;
        return (
            <div>
                <Header title="栏目浏览" type="menu" />
                <div className="columns__container">
                    {
                        columns.map(item => {
                            return (<div className="columns__items" key={item.id}>
                                <img src={item.icon} />
                                <h3><Link to={`/columnArticle/${item.id}`}>{item.name}</Link></h3>
                                <h4>{item.description}</h4>
                            </div>)
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    columns: getAllColumns(state),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(columnActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);