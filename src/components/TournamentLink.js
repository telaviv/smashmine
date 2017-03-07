import React, { Component, PropTypes } from 'react';
import URI from 'urijs';
import 'urijs/src/URITemplate';

export default class TournamentLink extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  url() {
    const { id } = this.props;
    return URI.expand('/tournament/{id}', { id }).toString();
  }

  render() {
    const { title } = this.props;
    return (
      <a className="TournamentLink" href={this.url()}>{title}</a>
    );
  }
}
