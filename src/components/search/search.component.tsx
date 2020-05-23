import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import React, { Component } from 'react';

// Gneral Focus Hook
// const utilizeFocus = () => {
// 	const ref = React.createRef();
// 	const setFocus = (ref: any) => {ref.current &&  ref.current.focus(); };
// 	return {setFocus, ref};
// };

class Search extends Component<any, any> {
    public static propTypes: { onEventSearch: any; };
    public static defaultProps: { onEventSearch: null; };
    public searchInput: any;
    constructor(props: any) {
        super(props);
        this.state = {
            isSearchEnable: !isEmpty(this.props.searchInput) ? true : false,
            value: !isEmpty(this.props.searchInput) ? this.props.searchInput : ''
        };
        // this.searchInput = utilizeFocus();
    }

    public componentDidMount = () => {
        if (this.state.isSearchEnable) {
            // this.searchInput.focus();
        }
    }

    public setSearchValue = (event: any) => {
        this.setState({ value: event.target.value });
    }

    public showSearch = () => {
        const { isSearchEnable, value } = this.state;
        if (!isSearchEnable) {
            this.setState({ isSearchEnable: true }, () => {
                // this.searchInput.setFocus();
            });
        } else {
            this.props.onEventSearch(value);
        }
    }

    public render() {
        return(
            <div className={`search-box ${this.props.className}`}>
                {
                    this.state.isSearchEnable ?
                    <input type='search' name='search' value={this.state.value}  placeholder='Search' onChange={this.setSearchValue} onKeyDown={(event: any) => { if (event.keyCode === 13) this.showSearch(); }} /> : null
                }
                <span onClick={() => this.showSearch()}>
                    <FontAwesomeIcon
                        icon={['fas', 'search']}
                        size='1x'
                    />
                </span>
            </div>
        );
    }
}

export default Search;