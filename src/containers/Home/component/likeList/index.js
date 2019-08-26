import React, { Component } from 'react';
import LikeItem from '../likeItem';

class LikeList extends Component {
    componentDidMount() {
        this.props.loadLikes();
    }
    render() {
        const {likes, loadLikes} = this.props;
        return (
            <div>
                {
                    likes.map((item, index) => {
                        return <LikeItem product={item}/>
                    })
                }
            </div>
        );
    }
}

export default LikeList;