import React, { Component, PropTypes } from 'react';
import URI from 'urijs';
import 'urijs/src/URITemplate';

export default class PlayerLink extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  url() {
    const { name } = this.props;
    return URI.expand('/player/{name}', { name }).toString();
  }

  render() {
    const { name } = this.props;
    return (
      <a className="PlayerLink" href={this.url()}>{name}</a>
    );
  }
}
