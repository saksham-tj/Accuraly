import { contextActions } from '../actions';

export default function contextReducer(state = {}, action) {
    switch(action.type) {
        case contextActions.questionType :
            return {...state, type: action.payload};
        default:
            return state
    }

}