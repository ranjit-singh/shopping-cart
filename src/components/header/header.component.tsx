'use-strict';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import removeDuplicateItemAddCount from '../../utils';
import CartIcon from '../carticon/carticon.component';
import Search from '../search/search.component';
import './header.scss';

class Header extends Component<any, any> {
    public static propTypes: { cartItem: any; hidden: any; onEvent: any; };
    public static defaultProps: { cartItem: []; hidden: false; onEvent: null; };
    constructor(props: any) {
        super(props);
    }

    public render() {
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

export default Header;