import * as React from 'react';
import './filter.scss';

class Filter extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {};
    }

        render() {
            return (
                <div className='filter'>
                    <div className='filter__header'>
                        <h4>Filters</h4>
                    </div>
                    <div className='filter__body justify-lg-'>
                        <form>
                            <div className='form-group'>
                                <input type='range' className='form-control-range' id='formControlRange' />
                            </div>
                            <button type="submit" class="button button--blue">Apply</button>
                        </form>
                    </div>
                </div>
            );
        }
}

export default Filter;