import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

class CartIcon extends React.Component<React.Props<CartIcon>, {}> {
    constructor(props: React.Props<CartIcon>) {
        super(props);
    }

    public render() {
        return(
            <FontAwesomeIcon
                icon={['fas', 'shopping-cart']}
                size='1x'
            />
        );
    }
}

export default CartIcon;