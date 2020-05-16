import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import Search from '../search/search.component';
import CartIcon from '../carticon/carticon.component';
// import './header.scss';

class Header extends React.Component<React.Props<Header>, {}> {
constructor(props: React.Props<Header>) {
super(props);
}

render() {
return(
<header className='container__header header bg-dark-blue'>
    <div className='header__left-side'>
        <Link to={ RouterPathEnum.HOME }>
            <FontAwesomeIcon
                icon={['fas', 'star']}
                size='2x'
            />
        </Link>
    </div>
    <div className='header__right-side'>
        <Search />
        <Link to={ RouterPathEnum.CHECKOUT }><CartIcon /></Link>
    </div>
</header>
);
}
}

export default Header;