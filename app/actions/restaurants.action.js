import { API_ROOT } from '../../api-config';

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const FETCH_RESTAURANTS_FAILURE = 'FETCH_RESTAURANTS_FAILURE';

export function fetchRestaurants() {

    return (dispatch) => {
        dispatch(getRestaurants());
        return(fetch(`${API_ROOT}/getRestaurants`))
        .then(res => res.json())
        .then(json => {

            dispatch(fetchRestaurantsSuccess(json.docs));
            console.log(json,"jsonnnnnnnnnnnnnn=========================================");
            return json.docs;
        })  
        .catch(err => dispatch(fetchRestaurantsFailure(err)))
    }


    // const request = fetch('http://192.168.43.41:3000/getRestaurants');
    // console.log("fetching restaurants==============================");
    // return {
    //     type: FETCH_RESTAURANTS,
    //     payload: request 
    // };
}
 
export function getRestaurants() {
    return {
        type: FETCH_RESTAURANTS
    }
}

export function fetchRestaurantsSuccess(restaurants) {
    return {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: {restaurants} 
    };
}

export function fetchRestaurantsFailure(error) {
    return {
        type: FETCH_RESTAURANTS_FAILURE,
        payload: {error} 
    };
}