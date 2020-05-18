import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import Search from '../search/search.component';
import CartIcon from '../carticon/carticon.component';
import removeDuplicateItemAddCount from '../../utils/removeDuplicateItemAddCount';
import './header.scss';

class Header extends React.Component<React.Props<Header>, {}> {
    constructor(props: React.Props<Header>) {
        super(props);
    }

    render() {
        const {
            cartItem,
            hidden
        } = this.props;
        return(
            <header className='header flex'>
                <div className='header__logo'>
                    <Link to={ RouterPathEnum.HOME }>
                        <FontAwesomeIcon
                            icon={['fas', 'star']}
                            size='2x'
                        />
                    </Link>
                </div>
                <div className='header__right flex'>
                    <Search className='header__search-box' />
                    {!hidden ? 
                    <Link to={ RouterPathEnum.CHECKOUT } className='header__right__shopping-cart'>
                        <CartIcon />
                        <span className='shopping-cart__count'>{removeDuplicateItemAddCount(cartItem).length}</span>
                    </Link>
                    : null}
                </div>
            </header>
        );
    }
}
Header.propTypes = {
    cartItem: PropTypes.shape,
    hidden: PropTypes.bool,
    onEvent: PropTypes.func
};
Header.defaultProps = {
    cartItem: [],
    hidden: false,
    onEvent: () => {}
};

export default Header;