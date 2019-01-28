import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTests } from './TestActions';

class Tests extends Component {

	componentDidMount() {
		this.props.dispatch(fetchTests());
	}

	render() {
		return (
			<div>
				stub for tests
			</div>
		)
	}

}

function mapStateToProps({ tests }) {
	return {
		tests
	}
}

export default connect(mapStateToProps)(Tests);
