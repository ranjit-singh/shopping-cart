import * as React from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import MobileHeader from '../../components/header/mobheader.component';
import Header from '../../components/header/header.component';
import './checkout.scss';

class Checkout extends React.Component<RouteComponentProps<Checkout>, {}> {
  static propTypes: { isSmallScreen: boolean; cart: any };
  static defaultProps: { cart: []; };
  constructor(props : RouteComponentProps<Checkout>){
    super(props);
    this.state = { 
			isSmallScreen: false
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
  
  getCartItem = () => {
    const { cart } = this.props;
    const contentElm: any = [];
    let count = 0;
    let newCart = cart.filter((v: { count: number; id: any; }, i: number, a: any[]) => {
      // const result = Object.assign(v);
      a.findIndex((t: { id: any; }, j) => {
        if ((t.id === v.id) && j === i) {
          v.count = count + 1;
        }
      });
    });
    console.log(contentElm, newCart);
    
  }

  render() {
    return(
      <div>
        {this.state.isSmallScreen ? <MobileHeader /> : <Header />} 
        {this.getCartItem()}
        <div className='row co-container flex flex-row'>
          <div className='col-lg-8 c-card-container'>
            
            <div className='c-card flex flex-row row'>
              <div className='c-card-header col-lg-2 flex'>
                  <img src='{item.image}' className='card-img-top' />
              </div>
              <div className='c-card__body col-lg-7 flex flex-row'>
              <div className='col-lg-6'>
                  <div className='c-card__title'>{'item.name'}</div>
                    <div className='c-card__detail flex flex-row justify-content-lg-start'>
                      <div className='c-card__price'>
                          <span className='c-card--disprice'>&#x20B9;300</span>
                          <span className='c-card--orgprice'><del>300</del></span>
                      </div>
                      <div className='c-card__discount'>
                          <span>64% off</span>
                      </div>
                  </div>
              </div>
              <div className='col-lg-6 flex align-items-center c-card__quantity'>
                <div className='c-card__quantity--remove'>-</div>
                <input type="text" className='c-card__quantity--count' />
                <div className='c-card__quantity--add'>+</div>
              </div>
              </div>
              <div className='c-card__footer flex justify-center col-lg-3'>
                  <button type="button" className='button button-transparent'>REMOVE</button>
              </div>
            </div>
          </div>
          <div className='col-lg-2'>
            <h3>PRICE DETAILS</h3>
            <div>
              <div>
                <span>Price(1 item)</span>
                <span>:</span>
                <span>&#8377;900</span>
              </div>
              <div>
                <span>Discount</span>
                <span>:</span>
                <span>&#8377;579</span>
              </div>
            </div>
            <div>
            <div>
                <span>Total Payable</span>
                <span>&#8377;319</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onClickMove = ( routerPathEnum: RouterPathEnum ) => {
    this.props.history.push( routerPathEnum );
  }
}
Checkout.propTypes = {
  cart: PropTypes.shape
}
Checkout.defaultProps = {
  cart: []
}

export default Checkout;
