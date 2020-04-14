import { userActions } from '../actions';

export const setLogin = (payload) => {
    return {type: userActions.loginStatus, payload};
}

export const setUserDetails = (payload) => {
    return {type: userActions.userDetails, payload}
}