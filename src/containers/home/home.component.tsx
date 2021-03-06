'use-strict';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import ReactSlider from 'react-slider';
import Filter from '../../components/filter/filter.component';
import Header from '../../components/header/header.component';
import ShoppingItem from '../../components/shoppinglist/shoppingitem.component';
import './home.scss';
import { isEmpty } from 'lodash';

class Home extends Component <any, any> {
  public static propTypes: { cart: any; items: any; onEvent: any; searchStr: any; };
  public static defaultProps: { cart: []; items: any; onEvent: null; searchStr: ''; };
	constructor(props: any) {
		super(props);
		this.state = {
        items: this.props.items,
        showFilterModal: false,
        minValue: 100,
        maxValue: 100000,
        searchInput: this.props.searchInput
    };
     this.setCartItem = this.setCartItem.bind(this);
     this.applyFilter = this.applyFilter.bind(this);
     this.onChange = this.onChange.bind(this);
     this.getModalBody = this.getModalBody.bind(this);
     this.getMobileFilter = this.getMobileFilter.bind(this);
     this.setFilter = this.setFilter.bind(this);
     this.searchItem = this.searchItem.bind(this);
  }

  public componentDidMount = () => {
    if (!isEmpty(this.props.searchInput)) {
        this.searchItem(this.props.searchInput);
    }
  }

  public setCartItem = (e: any, item: any) => {
    this.props.onEvent(e, item);
  }

  public applyFilter = (filterOptions: { minValue: number; maxValue: number; }) => {
    const { items } = this.props;
    const { searchInput } = this.state;
    const filterItems = items.filter((item: { name: string, price: { actual: number; }; }) => {
      return item.price.actual > filterOptions.minValue && item.price.actual < filterOptions.maxValue && item.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1;
    });
    this.setState({ items: filterItems });
    this.setFilter('filter', false);
  }

  public onChange = (value: any) => {
    this.setState({ minValue: value[0], maxValue: value[1] });
}

  public getModalBody = () => {
    const {
      minValue,
      maxValue
  } = this.state;
    const contentElm: any = [];
    const rdProps: any = {
        min: 100,
        max: 100000,
        className: 'horizontal-range__slider',
        thumbClassName: 'slider__thumb',
        trackClassName: 'slider__track',
        minDistance: 10,
        onChange: (value: any) => {
            this.onChange(value);
        }
    };
    contentElm.push(
      <div className='filter-mobile'>
      <div className='filter-mobile__header'>
          <h4>Filter Options</h4>
      </div>
      <div className='filter__body'>
        <div className='form-group rangeslider'>
            <ReactSlider
                {...rdProps}
                defaultValue={[minValue, maxValue]}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                pearling
            />
            <span className='horizontal-range__slider--label'>{'Price'}</span>
        </div>
      </div>
      </div>
    );
    return contentElm;
  }

  public getMobileFilter = () => {
    const mdProps: any = {
        'size': 'sm',
        'show': true,
        'onHide': () => {
            this.setFilter('filter', false);
        },
        'aria-labelledby': 'filter-modal-sizes-title-sm'
    };
    return (
      <Modal
          {...mdProps}
        >
        <Modal.Body>
          {this.getModalBody()}
        </Modal.Body>
        <Modal.Footer>
          <button name='cancel' onClick={() => this.setFilter('filter', false)}>
            Cancel
          </button>
          <button name='apply' onClick={() => this.applyFilter({ minValue: this.state.minValue, maxValue: this.state.maxValue })}>
            Apply
          </button>
        </Modal.Footer>
        </Modal>
    );
  }

  public setFilter = (_type: any, value: any) => {
    this.setState({ showFilterModal: value });
  }

  public searchItem = (searchStr: any) => {
    const { items } = this.props;
    const searchItems = items.filter((item: any) => {
        return item.name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1;
    });
    this.setState({ items: searchItems, searchInput: searchStr });
  }

  public render() {
    const {
      items
     } = this.state;
     const {
       cart,
       searchInput
     } = this.props;
    return(
      <div className='container-fluid wrapper'>
        <div className='row'>
          <Header cartItem={cart} onEvent={this.searchItem} searchInput={searchInput} />
          <main className='home-container'>
            <div className='d-none d-sm-none d-md-block d-lg-block d-xl-block'>
              <Filter title={'Filters'} onEvent={this.applyFilter} />
            </div>
            <ShoppingItem products={items} onEvent={this.setCartItem} onEventFilter={(type: any, value: any) => {this.setFilter(type, value);}} />
            {this.state.showFilterModal ? this.getMobileFilter() : null}
          </main>
          <footer className='footer'>&copy;copyright</footer>
        </div>
      </div>
    );
  }
}

export default Home;
