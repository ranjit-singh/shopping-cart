import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RouterPathEnum } from '../../enums/RouterPathEnum';

class Home extends React.Component<RouteComponentProps<Home>, {}> {
  constructor(props : RouteComponentProps<Home>){
    super(props);
  }

  render() {
    return(
      <main className="flex flex-column justify-center items-center">
        <h2>home</h2>
        <button onClick={ ( e: any ) => this.onClickMove( RouterPathEnum.CHECKOUT ) }>
            go CHECKOUT
        </button>
        &nbsp;
        <button onClick={ ( e: any ) => this.onClickMove( RouterPathEnum.HOME ) }>
            go Home
        </button>
        <FontAwesomeIcon 
          icon={['fas', 'spinner']}
          pulse
          fixedWidth
          size="4x" />
      </main>
    );
  }

  private onClickMove = ( routerPathEnum: RouterPathEnum ) => {
    this.props.history.push( routerPathEnum );
  }
}

export default Home;
