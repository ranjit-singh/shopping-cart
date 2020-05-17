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
  )
import Home from './containers/home/home.component';
import Checkout from './containers/checkout/checkout.component';
import './styles/index.scss';

interface IState {
cartItem: any;
}

class App extends React.Component<{}, IState> {
	state: { cartItem: any; };
	constructor(props : any){
		super(props);
		this.state = { 
			cartItem: []
		 };
	}
	onEventHandler = (eventName: any, value: any) => {
		console.log(eventName, value);
	}

	public render() {
		return (
		<BrowserRouter>
			<Switch>
				<Route exact={true} path={RouterPathEnum.HOME} component={() => <Home  onEvent={this.onEventHandler} />} />
				<Route exact={true} path={RouterPathEnum.CHECKOUT} component={() => <Checkout cartItems={this.state.cartItem} />} />
				<Redirect to={RouterPathEnum.HOME} />
			</Switch>
		</BrowserRouter>
		);
	}
}

export default App;
