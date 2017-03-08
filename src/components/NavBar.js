import React, { Component, PropTypes } from 'react';

export default class NavBar extends Component {
  static propTypes = {
    expand: PropTypes.bool,
  }

  render() {
    const { expand } = this.props;
    const classes = ['nav-bar'];
    if (expand) {
      classes.push('expand');
    }
    return (
      <div className={classes.join(' ')} >
        <a href="/">
          <img className="nav-bar__logo" src="/static/sm_logo.svg" alt="smashmine" />
        </a>
      </div>
    );
  }
}
