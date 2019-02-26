import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from './QuestionActions';

const categories = [
	'JavaScript Questions',
	'CSS Questions',
	'Fun Questions',
	'General Questions',
	'HTML Questions',
	'Network Questions',
	'Performance Questions',
	'Testing Questions',
	'Coding Questions'
];

class Questions extends Component {

	constructor(props) {
		super(props);

		this.getArFromObj = this.getArFromObj.bind(this);
		this.getQuestionsByCategory = this.getQuestionsByCategory.bind(this);
		this.renderQuestionsByCategory = this.renderQuestionsByCategory.bind(this);
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

	getQuestionsByCategory(questionsAr) {
		let questionsByCategoryObj = {};

		categories.forEach(category => {
		 	let questionsForCategory = [];
		 	questionsAr.forEach(quest1 => {
		 		if (quest1.category === category) {
		 			questionsForCategory.push(quest1)
		 		}
		 	})

		 	questionsByCategoryObj[category] = questionsForCategory;
		})

		return questionsByCategoryObj;
	}

	renderQuestionsByCategory(category, questionsByCategory) {
		if (Object.keys(questionsByCategory).length) {
			return (
				questionsByCategory[category].map(question =>
					<React.Fragment key={question.id}>
						<li data-testid="question-item">{question.content}</li>
					</React.Fragment>
				)
			)
		}

		return (<div></div>)
	}

	render() {
		let questionsObj = this.props.questions && this.props.questions.questions ? this.props.questions.questions : null;
		let questionsAr = questionsObj ? this.getArFromObj(questionsObj): [];		
		let questionsByCategory = questionsAr && questionsAr.length ? this.getQuestionsByCategory(questionsAr) : {};

		return (
			<div data-testid="questions" id="questions">
				<h1>All Questions</h1>

				{categories.map(category => 
					(<div key={category}>
						<h3>{category}</h3>
						{this.renderQuestionsByCategory(category, questionsByCategory)}
					</div>)
				)}

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		questions: state.questions,
	}
}

export default connect(mapStateToProps)(Questions);