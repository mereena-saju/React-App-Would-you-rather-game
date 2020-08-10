
import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer
  };
}
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}
export function handleAddAnswer({ authedUser, qid, answer }) {
  return dispatch => {
    dispatch(showLoading());

    return saveQuestionAnswer({
      authedUser: authedUser,
      qid: qid,
      answer: answer
    })
      .then(
        dispatch(
          addAnswer({
            authedUser: authedUser,
            qid: qid,
            answer: answer
          })
        ))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestion({ optionOneText, optionTwoText, authedUser }) {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}