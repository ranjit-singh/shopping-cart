import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouterPathEnum } from '../../enums/RouterPathEnum';

class MobileHeader extends React.Component<React.Props<MobileHeader>, {}> {
constructor(props: React.Props<MobileHeader>) {
super(props);
}

render() {
return(
<ul className='ulContainer'>
<li><Link to={ RouterPathEnum.HOME }>HOME</Link></li>
<li><Link to={ RouterPathEnum.CHECKOUT }>CHECKOUT</Link></li>
</ul>
);
}
}

export default MobileHeader;