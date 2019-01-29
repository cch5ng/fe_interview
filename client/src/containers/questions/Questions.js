import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from './QuestionActions';

class Questions extends Component {

	constructor(props) {
		super(props);

		this.getArFromObj = this.getArFromObj.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(fetchQuestions());
	}

	//helper
	getArFromObj(obj) {
		let resultAr = [];
		
		resultAr = Object.keys(obj).map(k => obj[k]);

		return resultAr;
	}

	render() {
		let questionsObj = this.props.questions && this.props.questions.questions ? this.props.questions.questions : null;
		let questionsAr = questionsObj ? this.getArFromObj(questionsObj): [];
		return (
			<div>
				<h2>All Questions</h2>

				<ul>
					{questionsAr.map(question => {
						return (
							<React.Fragment key={question.id}>
								<li>
									({question.category}) {question.content}
								</li>
							</React.Fragment>
						)
					})}

				</ul>
			</div>
		)
	}
}

function mapStateToProps({ questions }) {
	console.log('questions', questions);
	return {
		questions
	}
}

export default connect(mapStateToProps)(Questions);