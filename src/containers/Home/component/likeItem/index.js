import React, { Component } from 'react';

class LikeItem extends Component {
    render() {
        const { product } = this.props;
        return (
            <div>
                
                {product.description}
            </div>
        );
    }
}

export default LikeItem;