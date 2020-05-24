'use-strict';
import { assign } from 'lodash';
import * as React from 'react';
import Sort from '../sort/sort.component';
import './shoppingitem.scss';

class ShoppingItem extends React.Component <any, any> {
    public static propTypes: { products: any; onEventFilter: any; };
    public static defaultProps: { products: []; onEventFilter: null };
    constructor(props: any) {
        super(props);
        this.state = {
            products: this.props.products
        };
        this.addToCart = this.addToCart.bind(this);
        this.updateState = this.updateState.bind(this);
        this.SortBy = this.SortBy.bind(this);
        this.getProductList = this.getProductList.bind(this);
    }

    public updateState = (props: any) => {
        this.setState({ products: props.products });
    }

    public UNSAFE_componentWillReceiveProps = (nextProps: any) => {
        if (nextProps.products !== this.props.products) {
            this.updateState(nextProps);
        }
    }

    public addToCart = (event: any, item: any) => {
        this.props.onEvent(event, item);
    }

    public SortBy = (type: any) => {
        const newProducts = assign(this.state.products);
        if (type === 'high') {
            newProducts.sort((a: { price: { actual: string; }; }, b: { price: { actual: string; }; }) => parseFloat(b.price.actual) - parseFloat(a.price.actual));
        } else if (type === 'low') {
            newProducts.sort((a: { price: { actual: string; }; }, b: { price: { actual: string; }; }) => parseFloat(a.price.actual) - parseFloat(b.price.actual));
        } else {
            newProducts.sort((a: { discount: string; }, b: { discount: string; }) => parseFloat(b.discount) - parseFloat(a.discount));
        }
        this.setState({ products: newProducts });
    }

    public getProductList = (products: any) => {
        const contentElm: any = [];
        products.map((item: { image: string; name: string; price: { actual: number; display: number; }; discount: number; }) => {
            contentElm.push(
                <div className='s-card flex flex-column'>
                    <div className='s-card-header'>
                        <img src={item.image} className='card-img-top' />
                    </div>
                    <div className='s-card__body'>
                        <div className='s-card__title text-ellipsis'>{item.name}</div>
                        <div className='s-card__detail flex flex-row'>
                            <div className='s-card__price'>
                                <span className='s-card--disprice'>&#x20B9;{item.price.actual}</span>
                                <span className='s-card--orgprice'><del>{item.price.display}</del></span>
                            </div>
                            <div className='s-card--discount'>
                                <span>{item.discount}% off</span>
                            </div>
                        </div>
                    </div>
                    <div className='s-card__footer flex center'>
                        <button type='button' className='button button--yellow' onClick={(e) => {this.addToCart(e, item); }}>Add to Cart</button>
                    </div>
                </div>
        );
        });
        return contentElm;
    }
        public render() {
            const { products } = this.state;
            return (
                <div className='main-container flex flex-column'>
                    <Sort onEvent={(type: any) => {this.SortBy(type); }} onEventFilter={this.props.onEventFilter} />
                    <div className='card-container'>
                        {this.getProductList(products)}
                    </div>
                </div>
            );
        }
}

export default ShoppingItem;