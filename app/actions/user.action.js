import deviceStorage from '../services/storage.service';
import { API_ROOT } from '../../api-config';

export const FETCH_USER = 'FETCH_USER';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';

export function postUserSignIn(user) {
    return (dispatch) => {
        dispatch(getUser());
        return (
            fetch(`${API_ROOT}/signIn`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
                }
            )
        )
            .then(res => res.json())
            .then(json => {
                console.log('json--------', json);
                dispatch(postUserSuccess(json));
                deviceStorage.saveItem('currentUser_Token', json.token);
                //console.log(json,"jsonnnnnnnnnnnnnn");
                return json;
            })
            .catch(err => dispatch(postUserFailure(err)))
    }
}

export function postUserSignUp(user) {
    return (dispatch) => {
        dispatch(getUser());
        return (
            fetch(`${API_ROOT}/signUp`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
            )
        )
            .then(res => res.json())
            .then(json => {
                console.log('json--------', json);
                dispatch(postUserSuccess(json));
                deviceStorage.saveItem('currentUser_Token', json.token);
                //console.log(json,"jsonnnnnnnnnnnnnn");
                return json;
            })
            .catch(err => dispatch(postUserFailure(err)))
    }
}

export function getUser() {
    return{
        type: FETCH_USER
    }
}

export function postUserSuccess(user) {
    return {
        type: POST_USER_SUCCESS,
        payload: {user}
    }
}

export function postUserFailure(err) {
    return {
        type: POST_USER_FAILURE,
        payload: {err}
    }
}