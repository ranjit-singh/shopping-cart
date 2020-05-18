import * as React from 'react';
import PropTypes from 'prop-types';
import Sort from '../sort/sort.component';
import './shoppingitem.scss';

class ShoppingItem extends React.Component {
    static propTypes: { products: any; onEvent: any;};
    static defaultProps: { products: []; onEvent: () => {} };
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            products: this.props.products
        };
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart = (event: any, item: any) => {
        this.props.onEvent(event, item);
    }

    SortBy = (type) => {
        const newProducts = Object.assign(this.state.products);
        if (type === 'high') {
            newProducts.sort((a, b) => parseFloat(b.price.actual) - parseFloat(a.price.actual));
        } else if (type === 'low') {
            newProducts.sort((a, b) => parseFloat(a.price.actual) - parseFloat(b.price.actual));
        } else {
            newProducts.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount));
        }
        this.setState({ products: newProducts });
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
            const { products } = this.state;
            return (
                <div className='main-container flex flex-column'>
                    <Sort onEvent={(type) => {this.SortBy(type);}} />
                    <div className='card-container'>
                        {this.getProductList(products)}
                    </div>
                </div>
            );
        }
    SortBy() {
        throw new Error("Method not implemented.");
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