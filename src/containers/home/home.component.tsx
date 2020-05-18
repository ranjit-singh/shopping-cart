import * as React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/header.component';
import MobileHeader from '../../components/header/mobheader.component';
import Filter from '../../components/filter/filter.component';
import ShoppingItem from '../../components/shoppinglist/shoppingitem.component';
import ModalBox from '../../components/common/modal';
import itemList from '../../mock/cart.json';
import './home.scss';

class Home extends React.Component {
state: { isSmallScreen: boolean; items: any; };
static propTypes: { onEvent: any; cart: any };
static defaultProps: { onEvent: () => {}; cart: []; };
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = { 
			isSmallScreen: false,
      items: itemList.items
    };
     this.setCartItem = this.setCartItem.bind(this);
     this.applyFilter = this.applyFilter.bind(this);
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

  setCartItem = (e: any, item: any) => {
    this.props.onEvent(e, item);
  }

  applyFilter = (filterOptions: { minValue: number; maxValue: number; }) => {
    const { items } = this.state;
    const filterItems = items.filter((item: { price: { actual: number; }; }) => {
      return item.price.actual > filterOptions.minValue && item.price.actual < filterOptions.maxValue;
    });
    this.setState({ items: filterItems });
  }
  
  getMobileFilter = () => {
    return (
      <ModalBox>
        <filter
          title={'Filter Options'}
          onEvent={this.applyFilter}
         />
      </ModalBox>
    );
  }

  render() {
    const { 
      items,
     } = this.state;
     const {
       cart
     } = this.props;
    console.log(items);
    return(
      <div className='container-fluid'>
        <div className="row">
          { this.state.isSmallScreen ? <MobileHeader cartItem={cart} /> : <Header cartItem={cart} /> }
          <main className="home-container">
          { this.state.isSmallScreen ? this.getMobileFilter : <Filter title={'Filters'} onEvent={this.applyFilter} /> }
            <ShoppingItem products={items} onEvent={this.setCartItem} />
          </main>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onEvent: PropTypes.func,
  cart: PropTypes.shape
}
Home.defaultProps = {
  onEvent: () => {},
  cart: []
}
export default Home;
