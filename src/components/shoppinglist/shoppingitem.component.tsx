import * as React from 'react';

class ShoppingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        getProductList = () => {
            return null;
        }

        render() {
            return (
                <div className='product-list'>
                    {this.getProductList}
                </div>
            );
        }
    }
}

export default ShoppingItem;