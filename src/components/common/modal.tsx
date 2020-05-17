import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

class ModalOverlay extends React.Component {
    static propTypes: { minValue: PropTypes.Requireable<number>; maxValue: PropTypes.Requireable<number>; };
    static defaultProps: { minValue: null; };
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            mdShow: false
        };
    }

    setMdShow = (type: any) => {
        this.setState({ mdShow: type });
    }

    close = (event: any) => {
        this.setState({ mdShow: false});
    }

    save = (event: any) => {
        this.close();
    }
    
    render() {
        const {
            mdShow
        } = this.state;
        const {
            minValue,
            maxValue
        } = this.props;
        return (
            <Modal size='lg' show={mdShow} onHide={() => this.setMdShow(false)} onShow={() => this.setMdShow(true)}>
                <div data-role='main' className='ui-content filter__body'>
                        <div className='form-group' data-role='rangeslider'>
                            <input type='range' className='form-control-range' name='price-min' id='price-min' value={minValue} min={minValue} max={maxValue} onChange={this.getMinValue} />
                            <input type='range' name='price-max' id='price-max' value={maxValue} min={minValue} max={maxValue} onChange={this.getMaxValue} readOnly />
                        </div>
                        <label htmlFor='price-max'>Price</label>
                <div className='modal-footer'>
                    <button type='submit' className='utton button--blue' onClick={(e) => this.close(e)}>Cancel</button>
                    <button type='submit' className='utton button--blue' onClick={(e) => this.save(e)}>Apply</button>
                </div>
                </div>
            </Modal>
        );
    }
}
ModalOverlay.propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number
}
ModalOverlay.defaultProps = {
    minValue: null,
    maxValue: null
}
export default ModalOverlay;
