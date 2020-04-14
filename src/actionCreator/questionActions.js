import { questionActions } from '../actions';

export const addQuestion = (payload) => {
    return {type: questionActions.add, payload};
}

export const editQuestion = (payload) => {
    return {type: questionActions.edit, payload};
}

export const deleteQuestion = (payload) => {
    return {type: questionActions.delete, payload};
}

export const resetQuestion = (payload) => {
    return {type: questionActions.reset, payload};
}