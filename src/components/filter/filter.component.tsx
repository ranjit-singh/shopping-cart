import * as React from 'react';
import PropTypes from 'prop-types';
import './filter.scss';

class Filter extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            minValue: 100,
            maxValue: 10000
        };
        this.applyFilter = this.applyFilter.bind(this);
    }

    getMinValue = (event: any) => {
        this.setState({ minValue: event.target.value });
    }

    getMaxValue = (event: any) => {
        this.setState({ maxValue: event.target.value });
    }

    applyFilter = () => {
        const filter = {};
        filter.minValue = this.state.minValue;
        filter.maxValue = this.state.maxValue;
        this.props.onEvent(filter);
    }

        render() {
            const {
                minValue,
                maxValue,
                title
            } = this.props;
            return (
                <div className='filter'>
                    <div className='filter__header'>
                        <h4>{title}</h4>
                    </div>
                    <div data-role='main' className='ui-content filter__body'>
                        <div className='form-group' data-role='rangeslider'>
                            <span className='rangeslider--rupeesymbol' name='min-price'>&#8377;</span>
                            <input type='range' className='form-control-range' name='price-min' id='price-min' value={minValue} min={minValue} max={maxValue} onKeyPress={this.getMinValue} onChange={this.getMinValue} readOnly />
                            <span className='rangeslider--rupeesymbol' name='max-price'>&#8377;</span>
                            <input type='range' name='price-max' id='price-max' value={maxValue} min={minValue} max={maxValue} onKeyPress={this.getMaxValue} onChange={this.getMaxValue} readOnly />
                        </div>
                        <label htmlFor='price-max'className='rangeslider__label'>Price</label>
                        <button type='submit' className='button button--blue' onClick={this.applyFilter}>Apply</button>
                    </div>
                </div>
            );
        }
}
Filter.propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    title: PropTypes.string,
    onEvent: PropTypes.func
};
Filter.defaultProps = {
    minValue: 100,
    maxValue: 1000,
    title: '',
    onEvent: () => {}
};

export default Filter;