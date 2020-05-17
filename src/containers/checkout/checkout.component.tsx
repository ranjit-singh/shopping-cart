import * as React from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import MobileHeader from '../../components/header/mobheader.component';
import Header from '../../components/header/header.component';

class Checkout extends React.Component<RouteComponentProps<Checkout>, {}> {
  static propTypes: { isSmallScreen: boolean; cartItems: <P extends PropTypes.ValidationMap<any>>(type: P) => PropTypes.Requireable<PropTypes.InferProps<P>>; };
  static defaultProps: { cartItems: never[]; };
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
  render() {
    return(
      <div>
        { this.state.isSmallScreen ? <MobileHeader /> : <Header /> } 
        <button onClick={ ( e: any ) => this.onClickMove( RouterPathEnum.CHECKOUT ) }>
            go CHECKOUT
        </button>
      </div>
    );
  }

  private onClickMove = ( routerPathEnum: RouterPathEnum ) => {
    this.props.history.push( routerPathEnum );
  }
}
Checkout.propTypes = {
  cartItems: PropTypes.shape
}
Checkout.defaultProps = {
  cartItems: []
}

export default Checkout;
