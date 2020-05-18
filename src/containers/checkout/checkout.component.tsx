import * as React from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import { findIndex, isEmpty } from 'lodash';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import MobileHeader from '../../components/header/mobheader.component';
import Header from '../../components/header/header.component';
import './checkout.scss';

class Checkout extends React.Component<RouteComponentProps<Checkout>, {}> {
  static propTypes: { isSmallScreen: boolean; cart: any };
  static defaultProps: { cart: []; onEvent: () => {}; };
  constructor(props : RouteComponentProps<Checkout>){
    super(props);
    this.state = { 
      isSmallScreen: false,
      cartItem: this.removeDupliateItemAddCount(this.props.cart)
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
  
  removeDupliateItemAddCount = (cart: any[]) => {
    if (isEmpty(cart)) {
      return [];
    }
    return (cart.filter((v: { count: number; id: any; }, i: number, a: any[]) => {
      let count = 0;
      a.findIndex((t: { id: any; }) => { if (t.id === v.id) { count += 1; v.count = count; } }); return v;
    })).filter((v: { id: any; },i: any,a: any[])=>a.findIndex((t: { id: any; })=>(t.id === v.id))===i);
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
        <div className='c-card flex flex-row row'>
            <div className='c-card-header col-lg-2 flex'>
                <img src={item.image} className='card-img-top' />
            </div>
            <div className='c-card__body col-lg-7 flex flex-row'>
            <div className='col-lg-6'>
                <div className='c-card__title'>{item.name}</div>
                  <div className='c-card__detail flex flex-row justify-content-lg-start'>
                    <div className='c-card__price'>
                        <span className='c-card--disprice'>&#x20B9;{item.price.actual}</span>
                        <span className='c-card--orgprice'><del>{item.price.display}</del></span>
                    </div>
                    <div className='c-card__discount'>
                        <span>{item.discount}% off</span>
                    </div>
                </div>
            </div>
            <div className='col-lg-6 flex align-items-center c-card__quantity'>
              <div className='c-card__quantity--remove' onClick={() => {this.removeItem(item, false);}}>-</div>
              <input type='text' className='c-card__quantity--count' value={item.count} />
              <div className='c-card__quantity--add' onClick={() => {this.addItem(item);}}>+</div>
            </div>
            </div>
            <div className='c-card__footer flex justify-center col-lg-3'>
                <button type='button' className='button button-transparent' onClick={() => {this.removeItem(item, true);}}>REMOVE</button>
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
      <div className='col-lg-2'>
            <h3>PRICE DETAILS</h3>
            <div>
              <div>
                <span>Price({cartItem.length} item)</span>
                <span>:</span>
                <span>&#8377;{subTotal}</span>
              </div>
              <div>
                <span>Discount</span>
                <span>:</span>
                <span>&#8377;{discountTotal}</span>
              </div>
            </div>
            <div>
            <div>
                <span>Total Payable</span>
                <span>&#8377;{total}</span>
              </div>
            </div>
          </div>
    );
  }

  render() {
    return(
      <div>
        {this.state.isSmallScreen ? <MobileHeader hidden= {true} /> : <Header hidden= {true} />} 
        <div className='row co-container flex flex-row'>
          <div className='col-lg-8 c-card-container'>
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
