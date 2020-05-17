import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Search extends React.Component<React.Props<Search>, {}> {
constructor(props: React.Props<Search>) {
super(props);
}

render() {
return(
    <div className='header__right__search-box'>
        <input type='search' name='search' />
        <FontAwesomeIcon
            icon={['fas', 'search']}
            size='1x'
        />
    </div>
);
}
}

export default Search;