import * as React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/header/header.component';
import MobileHeader from '../../components/header/mobheader.component';
import Filter from '../../components/filter/filter.component';
import ShoppingItem from '../../components/shoppinglist/shoppingitem.component';
import itemList from '../../mock/cart.json';
import './home.scss';

interface IState {
isSmallScreen: boolean;
items: any;
}

class Home extends React.Component<{}, IState> {
	state: { isSmallScreen: boolean; items: any; };
  static propTypes: { onEvent: PropTypes.Requireable<(...args: any[]) => any>; };
  static defaultProps: {};
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

  render() {
    const { items } = this.state;
    console.log(items);
    return(
      <div className='container-fluid'>
        <div className="row">
          { this.state.isSmallScreen ? <MobileHeader /> : <Header /> }        
          <main className="home-container">
            <Filter />
            <ShoppingItem products={items} />
          </main>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onEvent: PropTypes.func
}
Home.defaultProps = {
  onEvent: () => {}
}
export default Home;
