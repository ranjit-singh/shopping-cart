import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RouterPathEnum } from '../../enums/RouterPathEnum';

class Checkout extends React.Component<RouteComponentProps<Checkout>, {}> {
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
        &nbsp;
        <button onClick={ ( e: any ) => this.onClickMove( RouterPathEnum.HOME ) }>
            go Home
        </button>
      </div>
    );
  }

  private onClickMove = ( routerPathEnum: RouterPathEnum ) => {
    this.props.history.push( routerPathEnum );
  }
}

export default Checkout;
