'use-strict';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Modal } from 'react-bootstrap';
import './../common/modal.scss';
import './sort.scss';

class Sort extends React.Component <any, any> {
    public static propTypes: { onEvent: any; onEventFilter: any; };
    public static defaultProps: { onEvent: null; onEventFilter: null; };
    public sortList: Array<{ key: string; name: string; }>;
    constructor(props: any) {
        super(props);
        this.state = {
            sortType: '',
            showModal: false
        };
        this.setSortType = this.setSortType.bind(this);
        this.applySorting = this.applySorting.bind(this);
        this.getSortRadioElement = this.getSortRadioElement.bind(this);
        this.getSortElement = this.getSortElement.bind(this);
        this.setSmShow = this.setSmShow.bind(this);
        this.getSortingModal = this.getSortingModal.bind(this);
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

    public setSortType = (elmObj: any) => {
        this.setState({ sortType: elmObj.key });
    }
    public applySorting = (elmObj: any) => {
        this.setState({ sortType: elmObj.key });
        this.props.onEvent(elmObj.key);
        this.setSmShow(false);
    }

    public getSortRadioElement = () => {
        const contentElm: any = [];
        this.sortList.forEach((elm: { name: string; key: string; }) => {
            contentElm.push(
                <li>
                    <label className='radiobox'>{elm.name}
                        <input type='radio' name='radio' value={elm.key} checked={this.state.sortType === elm.key} onClick={() => {this.setSortType(elm); }} />
                        <span className='radio--checked'></span>
                    </label>
                </li>
        );
        });
        return contentElm;
    }

    public getSortElement = () => {
        const contentElm: any = [];
        this.sortList.forEach((elm: { name: string; key: string }) => {
            const selectedClass = elm.key === this.state.sortType ? 'card-sort--item active' : 'card-sort--item';
            contentElm.push(
                <li className={selectedClass} onClick={() => {this.applySorting(elm); } } >{elm.name}</li>
        );
        });
        return contentElm;
    }

    public setSmShow = (flag: boolean) => {
        this.setState({ showModal: flag });
    }

    public getSortingModal = () => {
        const mdProps: any = {
            'size': 'sm',
            'show': true,
            'onHide': () => {
                this.setSmShow(false);
            },
            'aria-labelledby': 'sort-modal-sizes-title-sm'
        };
        return(
            <Modal
                {...mdProps}
            >
            <Modal.Body>
                <div className='sort-mobile__header'>
                    <h3>Sorting Options</h3>
                </div>
                <ul className='m-card-sort__items flex flex-column'>
                    {this.getSortRadioElement()}
                </ul>
            </Modal.Body>
            <Modal.Footer>
            <button name='cancel' onClick={() => this.setSmShow(false) }>
                Cancel
            </button>
            <button name='apply'  onClick={() => this.applySorting({ key: this.state.sortType }) }>
                Apply
            </button>
            </Modal.Footer>
            </Modal>
        );
    }

    public render() {
        return (
            <div>
                <div className='card-sort flex flex-row'>
                    <h4 className='card-sort__title'>Sort By</h4>
                    <ul className='card-sort__items flex flex-row' >
                        {this.getSortElement()}
                    </ul>
                </div>
                <div className='card-sort-mob row'>
                    <div className='col-sm-6 col-6' onClick={() => this.setSmShow(true) }>
                        <FontAwesomeIcon
                            icon={['fas', 'sort']}
                            size='1x'
                        />
                        <span>Sort</span>
                    </div>
                    <div className='col-sm-6 col-6' onClick={() => this.props.onEventFilter('filter', true) } >
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

export default Sort;