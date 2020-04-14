import { questionActions } from '../actions';

export default function questionReducer(state={}, action){
    switch(action.type){
        case questionActions.add :
            return {...state, questionData: action.payload}
        case questionActions.edit :
            return {...state, action}
        case questionActions.delete :
            return {...state, action}
        case questionActions.reset :
            return {...state, action}
        default:
            return state;
    }
}