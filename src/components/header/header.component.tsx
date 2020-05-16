import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return null;
  }
}
Header.propTypes = {
  items: PropTypes.oneOfType([
        PropTypes.object, PropTypes.array, PropTypes.string]),
  title: PropTypes.string
}
Header.defaultProps = {
  items: []
}

export default Header;
