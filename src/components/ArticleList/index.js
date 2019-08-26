import React, { Component } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import './style.css'

class ArticleList extends Component {
    componentDidMount() {
        const { loadArticles } = this.props;
        loadArticles();
    }
    render() {
        //const articles = data.posts;
        const { loading, articles, date } = this.props;
        const dateStr = date ? date.toDateString() : ' ';
        return (
            <div>
                <List
                    loading={loading}
                    header={dateStr}
                    dataSource={articles}
                    itemLayout='vertical'
                    renderItem={item => (
                        <List.Item key={item.id}>
                            {
                                item.column ? <span className="listItem-tag">{item.column}</span> : ''
                            }
                            <h4 className="listItem-title"><Link to={`/artileDetail/${item.id}`}>{item.title}</Link></h4>

                            {
                                item.display_style === 10001 ?
                                    <div className="listItem-content">
                                        <div className="listItem-abstract">{item.abstract}</div>
                                    </div>
                                    : ''
                            }
                            {
                                item.display_style === 10002 ?
                                    <div className="listItem-content">
                                        <div className="listItem-abstract">{item.abstract}</div>
                                        {item.thumbs.length > 0 ?
                                            <div>
                                                <img src={item.thumbs[0].medium.url} />
                                            </div>
                                            : ''}
                                    </div>
                                    : ''
                            }

                            {
                                item.display_style === 10003 ?
                                    <div className="listItem-content">
                                        {item.thumbs.map(image => {
                                            if (image) {
                                                return <div key={image.id}><img src={image.small.url} /></div>
                                            } else {
                                                return '';
                                            }
                                        })}
                                    </div>
                                    : ''
                            }
                        </List.Item>
                    )}
                />

            </div>
        );
    }
}

export default ArticleList;