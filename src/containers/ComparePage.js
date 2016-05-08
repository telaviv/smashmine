import React, { Component} from 'react';


export default class ComparePage extends Component {
  render() {
    return (
      <p>
        <form name="compare">
          <input class="player-1" type="text"/>
          <input class="player-2" type="text"/>
          <button type="submit">Submit</button>
        </form>
      </p>
    );
  }
}
