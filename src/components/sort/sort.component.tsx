import * as React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalBox from '../common/modal';

class Sort extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            sortType: ''
        };
        this.sortList = [
            {
                key: 'high',
                name: 'Price -- High Low'
            },
            {
                key: 'low',
                name: 'Price -- Low High'
            },
            {
                key: 'discount',
                name: 'Discount'
            }
        ];
    }

    applySorting = (elmObj: any) => {
        this.setState({ sortType: elmObj.key });
        this.props.onEvent(elmObj.key);
    }

    getSortElement = () => {
        const contentElm: any = [];
        this.sortList.forEach((elm: { name: React.ReactNode; }) => {
            const selectedClass = elm.key === this.state.sortType ? 'card-sort--item active' : 'card-sort--item';
            contentElm.push(
                <li className={selectedClass} onClick={() => {this.applySorting(elm);} } >{elm.name}</li>
        );
        });
        return contentElm;
    }

    getSortingModal = () => {
        <ModalBox show={true}>
            <ul className='card-sort__items flex flex-row' >
                {this.getSortElement()}
            </ul>
        </ModalBox>
    }

    getFilterModal = () => {
        return null;
    }

    render () {
        return (
            <div>
                <div className='card-sort flex flex-row'>
                    <h4 className='card-sort__title'>Sort By</h4>
                    <ul className='card-sort__items flex flex-row' >
                        {this.getSortElement()}
                    </ul>
                </div>
                <div className='card-sort-mob row'>
                    <div className='col-sm-6 col-6' onClick={() => {this.getSortingModal();}}>
                        <FontAwesomeIcon 
                            icon={['fas', 'sort']}
                            size='1x'
                        />
                        <span>Sort</span>
                    </div>
                    <div className='col-sm-6 col-6' onClick={() => {this.getFilterModal();}}>
                    <FontAwesomeIcon 
                            icon={['fas', 'filter']}
                            size='1x'
                        />
                        <span>Filter</span>
                    </div>
                </div>
            </div>
            
        );
    }
}
Sort.propTypes = {
    onEvent: PropTypes.func
};
Sort.defaultProps = {
    onEvent: () => {}
};

export default Sort;