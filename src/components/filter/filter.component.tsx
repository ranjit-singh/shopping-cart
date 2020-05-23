'use-strict';
import * as React from 'react';
import ReactSlider from 'react-slider';
import './filter.scss';

class Filter extends React.Component <any, any> {
    public static propTypes: { title: any; minValue: any; maxValue: any; onEvent: any; };
    public static defaultProps: { title: ''; minValue: 100; maxValue: 10000; onEvent: null; };
    constructor(props: any) {
        super(props);
        this.state = {
            minValue: 100,
            maxValue: 100000
        };
        this.applyFilter = this.applyFilter.bind(this);
    }

    public onChange = (value: any) => {
        this.setState({ minValue: value[0], maxValue: value[1] });
    }

    public applyFilter = () => {
        const filter: any = {};
        filter.minValue = this.state.minValue;
        filter.maxValue = this.state.maxValue;
        this.props.onEvent(filter);
    }

    public getNormalSlider = () => {
        const contentElm: any = [];
        const rdProps: any = {
            min: 100,
            max: 100000,
            className: 'horizontal-range__slider',
            thumbClassName: 'slider__thumb',
            trackClassName: 'slider__track',
            minDistance: 10,
            onChange: (value: any) => {
                this.onChange(value);
            }
        };
        contentElm.push(
            <div className='filter__body'>
                <div className='form-group rangeslider'>
                    <ReactSlider
                        {...rdProps}
                        defaultValue={[100, 100000]}
                        ariaLabel={['Lower thumb', 'Upper thumb']}
                        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        pearling
                    />
                    <span className='horizontal-range__slider--label'>Price</span>
                </div>
                <button type='submit' className='button button--blue' onClick={this.applyFilter}>Apply</button>
            </div>
        );
        return contentElm;
    }

        public render() {
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

export default Filter;