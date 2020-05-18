import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import ReactSlider from 'react-slider';
import Header from '../../components/header/header.component';
import Filter from '../../components/filter/filter.component';
import ShoppingItem from '../../components/shoppinglist/shoppingitem.component';
import './home.scss';

class Home extends React.Component {
state: { items: any; };
static propTypes: { onEvent: any; cart: any };
static defaultProps: { onEvent: () => {}; cart: []; };
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = { 
      items: this.props.items,
      showFilterModal: false,
      minValue: 100,
      maxValue: 10000
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

  onChange = (value: any) => {
    this.setState({ minValue: value[0], maxValue: value[1] });
}

  getModalBody = () => {
    const contentElm: any = [];
    contentElm.push(
      <div className='filter-mobile'>
      <div className='filter-mobile__header'>
          <h4>Filter Options</h4>
      </div>
      <div className='filter__body'>
        <div className='form-group rangeslider'>
            <ReactSlider
                min={100}
                max={10000}
                className='horizontal-range__slider'
                thumbClassName='slider__thumb'
                trackClassName='slider__track'
                defaultValue={[100, 10000]}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                pearling
                minDistance={10}
                onChange={this.onChange}
            />
            <span htmlFor='price-max'className='horizontal-range__slider--label'>Price</span>
        </div>
      </div>
      </div>
    );
    return contentElm;
  }
  
  getMobileFilter = () => {
    return (
      <Modal
      size='sm'
      show={true}
      onHide={() => this.setFilter('filter', false)}
      aria-labelledby='filter-modal-sizes-title-sm'
        >
        <Modal.Body>
          {this.getModalBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.setFilter}>
            Cancel
          </Button>
          <Button variant='primary' onClick={() => {this.applyFilter({ minValue: this.state.minValue, maxValue: this.state.maxValue })}}>
            Apply
          </Button>
        </Modal.Footer>
        </Modal>
    );
  }

  setFilter = (type: any, value: any) => {
    this.setState({ showFilterModal: value });
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
            <div className='d-none d-sm-none d-md-block d-lg-block d-xl-block'>
              <Filter title={'Filters'} onEvent={this.applyFilter} />
            </div>
            <ShoppingItem products={items} onEvent={this.setCartItem} onEventFilter={(type: any, value: any) => {this.setFilter(type, value)}} />
            {this.state.showFilterModal ? this.getMobileFilter() : null}
          </main>
          <footer className='footer'>&copy;copyright</footer>
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
