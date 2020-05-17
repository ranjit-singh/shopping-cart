import * as React from 'react';
import './filter.scss';

class Filter extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {};
    }

        render() {
            return (
                <div className='col-lg-4'>
                    <div className="side-pusher">
                        <h1>SIDE</h1>
                    </div>
                </div>
            );
        }
}

export default Filter;