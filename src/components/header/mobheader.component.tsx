import React, { Component } from 'react';

class MobileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return null;
  }
}
MobileHeader.propTypes = {
  items: PropTypes.oneOfType([
        PropTypes.object, PropTypes.array, PropTypes.string]),
  title: PropTypes.string
}
MobileHeader.defaultProps = {
  items: []
}

export default MobileHeader;
