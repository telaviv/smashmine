import React, { Component, PropTypes } from 'react';

export default class PageContent extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;
    return (
      <div className="PageContent">
        { children }
      </div>
    );
  }
}
