import {userActions} from '../actions';

export default function userDetailsReducer(state={}, action){

    switch(action.type){
        case userActions.loginStatus:
            return {...state, isLoggedIn: action.payload}
        case userActions.userDetails:
            return {...state, user: action.payload}
        default:
            return state
    }
}