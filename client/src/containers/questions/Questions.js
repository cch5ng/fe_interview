import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchQuestions } from './QuestionActions';
import { formatQuestion } from '../../utils/helper';
import styles from '../App.css';

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
						<li data-testid="question-item">{formatQuestion(question.content, question.child_content)}</li>
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
			<div data-testid="questions" id="questions" className={styles.questionsContainer}>
				<h1>All Questions</h1>

				{categories.map(category => 
					(<div key={category} className={styles.questionContainer}>
						<h3 className={styles.h3Question}>{category}</h3>
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
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(Questions);