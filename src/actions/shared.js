import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, addUserQuestion, addUserAnswer } from './users'
import { receiveQuestions, addAnswer, addQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading())
            });
    }
}

export function handleAddAnswer({ authedUser, qid, answer }) {
    return dispatch => {
        dispatch(showLoading());
        return saveQuestionAnswer({
            authedUser: authedUser,
            qid: qid,
            answer: answer
        }).then(() => {
            dispatch(addAnswer({ authedUser: authedUser, qid: qid, answer: answer }));
            dispatch(addUserAnswer({ authedUser: authedUser, qid: qid, answer: answer }));
            dispatch(hideLoading());
        });
    };
}

export function handleAddQuestion({ optionOneText, optionTwoText, authedUser }) {
    return dispatch => {
        dispatch(showLoading());
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        }).then(question => {
            dispatch(addQuestion(question));
            dispatch(addUserQuestion(question));
            dispatch(hideLoading());
        });
    };
}
