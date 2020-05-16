import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
// import RouterPathEnum from './enums';
// import { getCart } from './mock/api'
// import HomeComponent from './containers/home';
// import CheckoutComponent from './containers/checkout';
// import Header from './components/header';
// import MobileHeader from './components/header/mobheader.component';

interface IState {
isSmallScreen: boolean;
}

class App extends React.PureComponent<{}, IState> {
	constructor(props : any){
		super(props);

		this.state = { isSmallScreen: false };
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);

		this.updateDimensions( null );
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	private updateDimensions = (e: any) => {
		this.setState( { isSmallScreen: window.innerWidth < 500 } );
	}

	public render() {
		return (
		<BrowserRouter>
			<div>
			{ this.state.isSmallScreen ? 'Mobile View' : 'Desktop View' }
			<Switch>
				<Redirect to='/' />
			</Switch>
			</div>
		</BrowserRouter>
		);
	}
}

export default App;
