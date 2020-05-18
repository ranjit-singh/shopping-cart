import * as React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import './sort.scss';

class Sort extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            sortType: '',
            showModal: false
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

    getSortRadioElement = () => {
        const contentElm: any = [];
        this.sortList.forEach((elm: { name: React.ReactNode; }) => {
            const selectedClass = elm.key === this.state.sortType ? 'card-sort--item active' : 'card-sort--item';
            contentElm.push(
                <li className={selectedClass} onClick={() => {this.applySorting(elm);} } >
                    <label className='radiobox'>{elm.name}
                        <input type='radio' name='radio' />
                        <span className='radio--checked'></span>
                    </label>
                </li>
        );
        });
        return contentElm;
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

    setSmShow = (flag) => {
        this.setState({ showModal: flag });
    }

    getSortingModal = () => {
        return(
            <Modal
                size="sm"
                show={true}
                onHide={() => this.setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
            <Modal.Header closeButton>
            <Modal.Title id="sorting-custom-modal-styling-title">
                Sort Options
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className='m-card-sort__items flex flex-column'>
                    {this.getSortRadioElement()}
                </ul>
            </Modal.Body>
            </Modal>
        );
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
                    <div className='col-sm-6 col-6' onClick={() => {this.setSmShow(true);}}>
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
                    {this.state.showModal ? this.getSortingModal() : null }
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