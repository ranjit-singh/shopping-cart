import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './home.scss';

class HomeComponent extends Component {
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

HomeComponent.propTypes = {
  title: PropTypes.string
};
HomeComponent.defaultProps = {
  title: 'Welcome'
}

export default HomeComponent;
