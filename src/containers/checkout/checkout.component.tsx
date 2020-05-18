import * as React from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import { findIndex, isEmpty } from 'lodash';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import MobileHeader from '../../components/header/mobheader.component';
import Header from '../../components/header/header.component';
import removeDuplicateItemAddCount from '../../utils/removeDuplicateItemAddCount';
import './checkout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Checkout extends React.Component<RouteComponentProps<Checkout>, {}> {
  static propTypes: { isSmallScreen: boolean; cart: any };
  static defaultProps: { cart: []; onEvent: () => {}; };
  constructor(props : RouteComponentProps<Checkout>){
    super(props);
    this.state = { 
      isSmallScreen: false,
      cartItem: removeDuplicateItemAddCount(this.props.cart)
		 };
  }
  
  componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);

		this.updateDimensions();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	private updateDimensions = () => {
		this.setState({ isSmallScreen: window.innerWidth < 500 });
  }

  addItem = (item: any) => {
    const newItem = Object.assign(item);
    const cartItem = this.state.cartItem;
    const index = findIndex(cartItem, { id: item.id })
    if(index !== -1) {
      newItem.count = newItem.count + 1;
      cartItem.splice(index, 1, newItem);
    }
    this.setState({ cartItem });
  }

  removeItem = (item: any, isFullyRemove: boolean) => {
    const newItem = Object.assign(item);
    const cartItem = this.state.cartItem;
    const index = findIndex(cartItem, { id: item.id });
    if(!isFullyRemove && index !== -1 && newItem.count > 1) {
      newItem.count = newItem.count - 1;
      cartItem.splice(index, 1, newItem);
    } else {
      cartItem.splice(index, 1);
    }
    this.setState({ cartItem });
    if (isEmpty(cartItem)) {
      this.props.onEvent('click', cartItem);
    }
  }

  getCartItem = () => {
    const { cartItem } = this.state;
    const contentElm: any = [];
    cartItem.map((item: any) => {
      contentElm.push(
        <div className='c-card'>
            <div className='c-card__header col-xl-2 col-lg-2 col-md-4 col-sm-4 col-5 flex'>
                <img src={item.image} className='card-img-top' />
            </div>
            <div className='c-card__body col-xl-10 col-lg-10 col-md-8 col-sm-8 col-7'>
              <div className='col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12'>
                  <div className='c-card__title text-ellipsis'>{item.name}</div>
                  <div className='c-card__detail flex flex-row justify-content-xl-start'>
                    <div className='c-card__price'>
                        <span className='c-card--disprice'>&#x20B9;{item.price.actual}</span>
                        <span className='c-card--orgprice'><del>{item.price.display}</del></span>
                    </div>
                    <div className='c-card__discount'>
                        <span>{item.discount}% off</span>
                    </div>
                  </div>
              </div>
              <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 c-card__quantity'>
                <div className='c-card__quantity--remove' onClick={() => {this.removeItem(item, false);}}>
                  <span>-</span>
                </div>
                <input type='text' className='c-card__quantity--count' value={item.count} />
                <div className='c-card__quantity--add' onClick={() => {this.addItem(item);}}>
                  <span>+</span>
                </div>
              </div>
              <div className='c-card__footer flex justify-center col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12'>
                  <button type='button' className='button button-transparent' onClick={() => {this.removeItem(item, true);}}>REMOVE</button>
              </div>
            </div>
          </div>
      );
    });
    return contentElm;
  }

  getPrice = () => {
    const cartItem = Object.assign(this.state.cartItem);
    let subTotal = 0;
    let discountTotal = 0;
    let total = 0;
    cartItem.forEach((itemObj: { price: { display: number; actual: number; }; count: number; }) => {
      subTotal += itemObj.price.display * itemObj.count;
      discountTotal += (itemObj.price.display * itemObj.count)  - (itemObj.price.actual * itemObj.count);
    });
    total = subTotal - discountTotal;
    return (
      <div className='c-sum-container'>
        <div className='c-sum'>
          <h3 className='c-sum__title'>PRICE DETAILS</h3>
          <div className='c-sum__detail'>
            <div className='c-sum__detail--item'>
              <span>Price({cartItem.length} item)</span>
              <span>&nbsp;:&nbsp;</span>
              <span>&#8377;{subTotal}</span>
            </div>
            <div className='c-sum__detail--item'>
              <span>Discount</span>
              <span>&nbsp;:&nbsp;</span>
              <span>&#8377;{discountTotal}</span>
            </div>
          </div>
          <div>
          <div className='c-sum__total'>
              <span>Total Payable</span>
              <span>&#8377;{total}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div>
        {this.state.isSmallScreen ? <MobileHeader hidden= {true} /> : <Header hidden= {true} />} 
        <div className='co-container'>
          <div className='c-card-container'>
            {this.getCartItem()}
          </div>
          {this.state.cartItem.length > 0 ? this.getPrice() : null}
        </div>
      </div>
    );
  }

  private onClickMove = ( routerPathEnum: RouterPathEnum ) => {
    this.props.history.push( routerPathEnum );
  }
}
Checkout.propTypes = {
  cart: PropTypes.shape,
  onEvent: PropTypes.func
}
Checkout.defaultProps = {
  cart: [],
  onEvent: () => {}
}

export default Checkout;
