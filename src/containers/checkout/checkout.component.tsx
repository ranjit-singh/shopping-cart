import * as React from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import { RouterPathEnum } from '../../enums/RouterPathEnum';

class Checkout extends React.Component<RouteComponentProps<Checkout>, {}> {
  static propTypes: { cartItems: <P extends PropTypes.ValidationMap<any>>(type: P) => PropTypes.Requireable<PropTypes.InferProps<P>>; };
  static defaultProps: { cartItems: never[]; };
  constructor(props : RouteComponentProps<Checkout>){
    super(props);
  }

  render() {
    return(
      <div>
        <h2>home</h2>
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
