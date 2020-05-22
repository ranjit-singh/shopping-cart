import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

class Search extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <div className={`search-box ${this.props.className}`}>
                <input type='search' name='search' placeholder='Search' />
                <FontAwesomeIcon
                    icon={['fas', 'search']}
                    size='1x'
                />
            </div>
        );
    }
}

export default Search;