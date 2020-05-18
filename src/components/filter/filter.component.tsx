import * as React from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';
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

    onChange = (value: any) => {
        console.log(value);
        this.setState({ minValue: value[0], maxValue: value[1] });
    }

    applyFilter = () => {
        const filter = {};
        filter.minValue = this.state.minValue;
        filter.maxValue = this.state.maxValue;
        this.props.onEvent(filter);
    }

    getNormalSlider = () => {
        const contentElm: any = [];
        const {
            minValue,
            maxValue
        } = this.props;
        contentElm.push(
            <div className='filter__body'>
                <div className='form-group rangeslider'>
                    <ReactSlider
                        min={minValue}
                        max={maxValue}
                        className='horizontal-range__slider'
                        thumbClassName='slider__thumb'
                        trackClassName='slider__track'
                        defaultValue={[minValue, maxValue]}
                        ariaLabel={['Lower thumb', 'Upper thumb']}
                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        pearling
                        minDistance={10}
                        onChange={this.onChange}
                    />
                    <span htmlFor='price-max'className='horizontal-range__slider--label'>Price</span>
                </div>
                <button type='submit' className='button button--blue' onClick={this.applyFilter}>Apply</button>
            </div>
        );
        return contentElm;
    }

        render() {
            const {
                title
            } = this.props;
            return (
                <div className='filter'>
                    <div className='filter__header'>
                        <h4>{title}</h4>
                    </div>
                    {this.getNormalSlider()}
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
    maxValue: 10000,
    title: '',
    onEvent: () => {}
};

export default Filter;