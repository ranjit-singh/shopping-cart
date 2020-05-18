import * as React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/header.component';
import Filter from '../../components/filter/filter.component';
import ShoppingItem from '../../components/shoppinglist/shoppingitem.component';
import ModalBox from '../../components/common/modal';
import './home.scss';

class Home extends React.Component {
state: { items: any; };
static propTypes: { onEvent: any; cart: any };
static defaultProps: { onEvent: () => {}; cart: []; };
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = { 
      items: this.props.items
    };
     this.setCartItem = this.setCartItem.bind(this);
     this.applyFilter = this.applyFilter.bind(this);
  }
  
  setCartItem = (e: any, item: any) => {
    this.props.onEvent(e, item);
  }

  applyFilter = (filterOptions: { minValue: number; maxValue: number; }) => {
    const { items } = this.props;
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
      items
     } = this.state;
     const {
       cart
     } = this.props;
    return(
      <div className='container-fluid wrapper'>
        <div className='row'>
          <Header cartItem={cart} />
          <main className='home-container'>
            <Filter title={'Filters'} onEvent={this.applyFilter} />
            <ShoppingItem products={items} onEvent={this.setCartItem} />
          </main>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onEvent: PropTypes.func,
  cart: PropTypes.shape,
  items: PropTypes.shape
}
Home.defaultProps = {
  onEvent: () => {},
  cart: [],
  items: []
}
export default Home;
