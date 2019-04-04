import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from './QuestionActions';
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
		this.formatQuestion = this.formatQuestion.bind(this);
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
						<li data-testid="question-item">{this.formatQuestion(question.content)}</li>
					</React.Fragment>
				)
			)
		}

		return (<div></div>)
	}

	formatQuestion(str) {

		let threeHatAr = [];
		let oneHatAr = [];

		//handle 3 cases
		// only has '^^^'
		// only has '^'
		// has both '^^^' and '^'

		if (str.indexOf('^^^') > -1 && str.indexOf('^') > -1) {
			threeHatAr = str.split('^^^');
			return (
				<span>
					{threeHatAr.map((subStr, idx) => {
						if (subStr.indexOf('^')) {
							subStr = this.formatQuestion(subStr);
						}

						if (idx % 2 === 1) {
							return (<span key={idx} className={styles.code}>{subStr}<br/></span>)
						} else {
							return (<span key={idx} >{subStr}</span>)
						}
					})}
				</span>
			)
		} else if (str.indexOf('^^^') > -1) {
			threeHatAr = str.split('^^^');
			return (
				<span>
					{threeHatAr.map((subStr, idx) => {
						if (idx % 2 === 1) {
							return (<span key={idx} className={styles.code}><br>{subStr}</br></span>)
						} else {
							return (<span key={idx} >{subStr}</span>)
						}
					})}
				</span>
			)
		} else if (str.indexOf('^') > -1) {
			oneHatAr = str.split('^')
			return (
				<span>
					{oneHatAr.map((subStr, idx) => {
						if (idx % 2 === 1) {
							return (<span key={idx} className={styles.code}>{subStr}</span>)
						} else {
							return (<span key={idx} >{subStr}</span>)
						}
					})}
				</span>
			)
		} else {
			return (<span>{str}</span>);
		}

	}

	render() {
		let questionsObj = this.props.questions && this.props.questions.questions ? this.props.questions.questions : null;
		let questionsAr = questionsObj ? this.getArFromObj(questionsObj): [];		
		let questionsByCategory = questionsAr && questionsAr.length ? this.getQuestionsByCategory(questionsAr) : {};

		return (
			<div data-testid="questions" id="questions">
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
	}
}

export default connect(mapStateToProps)(Questions);