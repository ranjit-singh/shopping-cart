import {
	library
	} from '@fortawesome/fontawesome-svg-core';
  import { fab } from '@fortawesome/free-brands-svg-icons';
  import {
	faCheckSquare,
	faFilter,
	faMinusCircle,
	faPlusCircle,
	faQuoteLeft,
	faRupeeSign,
	faSearch,
	faShoppingCart,
	faSort,
	faSpinner,
	faSquare,
	faStar
} from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Checkout from './containers/checkout/checkout.component';
import { RouterPathEnum } from './enums/RouterPathEnum';

library.add(
	fab,
	faShoppingCart,
	faSpinner,
	faQuoteLeft,
	faSquare,
	faCheckSquare,
	faSearch,
	faStar,
	faPlusCircle,
	faMinusCircle,
	faRupeeSign,
	faSort,
	faFilter
);
import { assign } from 'lodash';
import Home from './containers/home/home.component';
import getApiItem from './mock/getApiItem';
import './styles/index.scss';

class App extends Component <any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			cartItem: [],
			items: []
		};
		this.onEventHandler = this.onEventHandler.bind(this);
	}

	public callBack = (resp: any) => {
		this.setState({ items: JSON.parse(resp).items });
	}
	public componentDidMount = () => {
		getApiItem(this.callBack);
	}

	public onEventHandler = (_e: any, item: any) => {
		const cart = assign(this.state.cartItem);
		cart.push(item);
		this.setState({ cartItem: cart });
	}

	public clearCart = () => {
		this.setState({ cartItem: [] });
	}

	public render() {
		const {
			cartItem,
			items
		} = this.state;
		return (
		<BrowserRouter>
			<Switch>
				<Route exact={true} path={RouterPathEnum.HOME} component={() => <Home items={items} cart={cartItem} onEvent={(e: any, value: any) => {this.onEventHandler(e, value); }} />} />
				<Route exact={true} path={RouterPathEnum.CHECKOUT} component={() => <Checkout cart={cartItem} onEvent={this.clearCart} />} />} />
				<Redirect to={RouterPathEnum.HOME} />
			</Switch>
		</BrowserRouter>
		);
	}
}

export default App;
