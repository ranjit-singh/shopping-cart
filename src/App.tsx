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
import Header from './components/header/header.component';
import MobileHeader from './components/header/mobheader.component';
import itemList from './mock/cart.json';

interface IState {
isSmallScreen: boolean;
items: any;
}

class App extends React.Component<{}, IState> {
	state: { isSmallScreen: boolean; items: any; };
	constructor(props : any){
		super(props);
		this.state = { 
			isSmallScreen: false,
			items: []
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
		let items = itemList.items;
		this.setState({ isSmallScreen: window.innerWidth < 500, items });
	}

	public render() {
		return (
		<BrowserRouter>
			<div className='container bg-light-gray'>
			{ this.state.isSmallScreen ? <MobileHeader /> : <Header /> }
				<div className='w-100 min-vh-100 bg-gray8 white sans-serif pa6 flex flex-column justify-center items-center'>
					<Switch>
						<Route exact={true} path={RouterPathEnum.HOME} component={Home}/>
						<Route path={RouterPathEnum.CHECKOUT} component={Checkout}/>
						<Redirect to={RouterPathEnum.HOME} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
		);
	}
}

export default App;
