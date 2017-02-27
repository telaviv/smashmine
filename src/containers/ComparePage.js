import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { If, Then, Else } from 'react-if';
import CompareForm from '../containers/CompareForm';


function mapStateToProps(state) {
  return { isFetching: state.compare.isFetching };
}

export class ComparePage extends Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.node,
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className="ComparePage">
        <CompareForm />
        <If condition={isFetching} >
          <Then><p>Loading ... </p></Then>
          <Else>{this.props.children}</Else>
        </If>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ComparePage);
