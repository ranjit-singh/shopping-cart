import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { RouterPathEnum } from './enums/RouterPathEnum';
import {
	library
  } from '@fortawesome/fontawesome-svg-core';
  import { fab } from '@fortawesome/free-brands-svg-icons';
  import {
	faShoppingCart,
	faSpinner,
	faQuoteLeft,
	faSquare,
	faCheckSquare,
	faSearch,
	faStar,
	faPlusCircle,
	faMinusCircle,
	faRupeeSign
  } from '@fortawesome/free-solid-svg-icons';
  
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
	faRupeeSign
);
import Home from './containers/home/home.component';
import Checkout from './containers/checkout/checkout.component';
import './styles/index.scss';

class App extends React.Component {
	state: { cartItem: any; };
	constructor(props : any){
		super(props);
		this.state = {
			cartItem: []
		};
		this.onEventHandler = this.onEventHandler.bind(this);
	}
	onEventHandler = (e: any, item: any) => {
		const cart = Object.assign(this.state.cartItem);
		cart.push(item);
		this.setState({ cartItem: cart });
	}

	public render() {
		const {
			cartItem
		} = this.state;
		return (
		<BrowserRouter>
			<Switch>
				<Route exact={true} path={RouterPathEnum.HOME} component={() => <Home cart={cartItem} onEvent={(e: any, value: any) => {this.onEventHandler(e, value); }} />} />
				<Route exact={true} path={RouterPathEnum.CHECKOUT} component={() => <Checkout cart={cartItem} />} />
				<Redirect to={RouterPathEnum.HOME} />
			</Switch>
		</BrowserRouter>
		);
	}
}

export default App;
