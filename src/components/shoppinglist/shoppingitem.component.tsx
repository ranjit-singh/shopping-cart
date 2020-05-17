import * as React from 'react';
import PropTypes from 'prop-types';
import './shoppingitem.scss';

class ShoppingItem extends React.Component {
    static propTypes: { products: any; };
    static defaultProps: { products: []; };
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {};
    }

    getProductList = (products) => {
        const contentElm = [];
        products.map((item: { image: string | undefined; name: React.ReactNode; }) => {
            contentElm.push(
                <div className='card flex flex-column'>
                    <div className='card-header'></div>
                    <img src={item.image} className='card-img-top' />
                        <div className='card-body'>
                        <h5 className='card-title'>{item.name}</h5>
                            <div className='card-detail flex flex-row justify-content-lg-between'>
                                <div>
                                    <span>300</span>
                                    <span>300</span>
                                </div>
                                <div>
                                    <span>64% off</span>
                                </div>
                            </div>
                            <a href='#' className='btn btn-primary'></a>
                        </div>
                        <div className='card-footer flex justify-center'>
                        <button type="button" class='btn btn-primary'>Primary</button>
                        </div>
                </div>
        );
        })
        return contentElm;
    }
        render() {
            const { products } = this.props;
            return (
                <div className='col-lg-8'>
                    <div className='card-container flex justify-content-lg-start flex-lg-wrap'>
                        {this.getProductList(products)}
                    </div>
                </div>
            );
        }
}

ShoppingItem.propTypes = {
    products: PropTypes.shape
}
ShoppingItem.defaultProps = {
    products: []
}

export default ShoppingItem;