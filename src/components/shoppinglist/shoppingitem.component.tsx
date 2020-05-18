import * as React from 'react';
import PropTypes from 'prop-types';
import './shoppingitem.scss';

class ShoppingItem extends React.Component {
    static propTypes: { products: any; };
    static defaultProps: { products: []; };
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            cartItem: []
        };
    }

    addToCart = (item: any) => {

    }

    getProductList = (products: { image: string | undefined; name: React.ReactNode; }[]) => {
        const contentElm: any = [];
        products.map((item) => {
            contentElm.push(
                <div className='s-card flex flex-column'>
                    <div className='s-card-header'>
                        <img src={item.image} className='card-img-top' />
                    </div>
                    <div className='s-card__body'>
                        <div className='s-card__title'>{item.name}</div>
                        <div className='s-card__detail flex flex-row justify-content-lg-between'>
                            <div className='s-card__price'>
                                <span className='s-card--disprice'>&#x20B9;300</span>
                                <span className='s-card--orgprice'><del>300</del></span>
                            </div>
                            <div className='s-card__discount'>
                                <span>64% off</span>
                            </div>
                        </div>
                    </div>
                    <div className='s-card__footer flex justify-center'>
                        <button type='button' className='button button--yellow' onClick={this.addToCart(item)}>Add to Cart</button>
                    </div>
                </div>
        );
        });
        return contentElm;
    }
        render() {
            const { products } = this.props;
            return (
                <div className='card-container flex justify-content-lg-start flex-lg-wrap'>
                    {this.getProductList(products)}
                </div>
            );
        }
}

ShoppingItem.propTypes = {
    products: PropTypes.shape
};
ShoppingItem.defaultProps = {
    products: []
};

export default ShoppingItem;