import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './checkout.scss';

class CheckoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    return (
      <div className={style['hello-world']}>{title}</div>
    );
  }
}

CheckoutComponent.propTypes = {
  title: PropTypes.string
};
CheckoutComponent.defaultProps = {
  title: 'Welcome'
}

export default CheckoutComponent;
