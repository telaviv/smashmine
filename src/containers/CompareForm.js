import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitCompare } from '../actions/compare';
import CompareForm from '../components/CompareForm';

function mapDispatchToProps(dispatch) {
  return { submitCompare: bindActionCreators(submitCompare, dispatch) };
}

export default connect(null, mapDispatchToProps)(CompareForm);
