import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import Search from '../search/search.component';
import CartIcon from '../carticon/carticon.component';
import './header.scss';

class Header extends React.Component<React.Props<Header>, {}> {
constructor(props: React.Props<Header>) {
super(props);
}

render() {
return(
<header className='header flex col-lg-12 justify-content-lg-between'>
    <div className='header__logo'>
        <Link to={ RouterPathEnum.HOME }>
            <FontAwesomeIcon
                icon={['fas', 'star']}
                size='2x'
            />
        </Link>
    </div>
    <div className='header__right flex 123'>
        <Search className='header__search' />
        <Link to={ RouterPathEnum.CHECKOUT } className='header__right__shopping-cart'>
            <CartIcon />
            <div className='shopping-cart__count'>1</div>
        </Link>
    </div>
</header>
);
}
}

export default Header;