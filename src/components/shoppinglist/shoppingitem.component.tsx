import * as React from 'react';
import PropTypes from 'prop-types';
import './shoppingitem.scss';

class ShoppingItem extends React.Component {
    static propTypes: { products: any; onEvent: any;};
    static defaultProps: { products: []; onEvent: () => {} };
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {};
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart = (event: any, item: any) => {
        this.props.onEvent(event, item);
    }

    getProductList = (products: any) => {
        const contentElm: any = [];
        products.map((item) => {
            contentElm.push(
                <div className='s-card flex flex-column'>
                    <div className='s-card-header'>
                        <img src={item.image} className='card-img-top' />
                    </div>
                    <div className='s-card__body'>
                        <div className='s-card__title'>{item.name}</div>
                        <div className='s-card__detail flex flex-row'>
                            <div className='s-card__price'>
                                <span className='s-card--disprice'>&#x20B9;{item.price.actual}</span>
                                <span className='s-card--orgprice'><del>{item.price.display}</del></span>
                            </div>
                            <div className='s-card__discount'>
                                <span>{item.discount}% off</span>
                            </div>
                        </div>
                    </div>
                    <div className='s-card__footer flex center'>
                        <button type='button' className='button button--yellow' onClick={(e) => {this.addToCart(e, item)}}>Add to Cart</button>
                    </div>
                </div>
        );
        });
        return contentElm;
    }
        render() {
            const { products } = this.props;
            return (
                <div className='main-container flex flex-column'>
                    <div className='card-sort flex flex-row'>
                        <h4 className='card-sort__title'>Sort By</h4>
                        <ul className='card-sort__items flex flex-row' >
                            <li className='card-sort--item active'>Price -- High Low</li>
                            <li className='card-sort--item'>Price -- Low High</li>
                            <li className='card-sort--item'>Discount</li>
                        </ul>
                    </div>
                    <div className='card-container'>
                        {this.getProductList(products)}
                    </div>
                </div>
            );
        }
}

ShoppingItem.propTypes = {
    products: PropTypes.shape,
    onClick: PropTypes.func
};
ShoppingItem.defaultProps = {
    products: [],
    onClick: () => {}
};

export default ShoppingItem;