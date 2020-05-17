import * as React from 'react';
import './filter.scss';

class Filter extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            minValue: 100,
            maxValue: 10000
        };
    }
    
    getMinValue = (event: any) => {
        this.setState({ minValue: event.target.value });
    }

    getMaxValue = (event: any) => {
        this.setState({ maxValue: event.target.value });
    }

    render() {
        const {
            minValue,
            maxValue
        } = this.state;
        return (
            <div className='filter'>
                <div className='filter__header'>
                    <h4>Filters</h4>
                </div>
                <div data-role='main' className='ui-content filter__body'>
                    <div className='form-group' data-role='rangeslider'>
                        <input type='range' className='form-control-range' name='price-min' id='price-min' value={minValue} min={minValue} max={maxValue} onChange={this.getMinValue} readOnly />
                        <input type='range' name='price-max' id='price-max' value={maxValue} min={minValue} max={maxValue} onChange={this.getMaxValue} readOnly />
                    </div>
                    <label htmlFor='price-max'>Price</label>
                    <button type="submit" className='utton button--blue'>Apply</button>
                </div>
            </div>
        );
    }
}

export default Filter;