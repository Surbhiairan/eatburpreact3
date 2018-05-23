import { API_ROOT } from '../../api-config';

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const FETCH_RESTAURANTS_FAILURE = 'FETCH_RESTAURANTS_FAILURE';
export const SELECT_RESTAURANT_FOR_DETAILS = 'SELECT_RESTAURANT_FOR_DETAILS';
export const SELECTED_RESTAURANT_DETAILS = 'SELECTED_RESTAURANT_DETAILS';
export const FETCH_TOP_DISH_RESTAURANT = 'FETCH_TOP_DISH_RESTAURANT';
export const FETCH_TOP_DISH_RESTAURANT_SUCCESS = 'FETCH_TOP_DISH_RESTAURANT_SUCCESS';
export const FETCH_TOP_DISH_RESTAURANT_FAILURE = 'FETCH_TOP_DISH_RESTAURANT_FAILURE';

export function fetchTopDishRestaurants(item) {
    return (dispatch) => {
        dispatch(getTopDishRestaurants());
        return(fetch(`${API_ROOT}/getTopDishRestaurants?tag=`+item))
        .then(res => res.json())
        .then(json => {
            console.log(json,"jsonnnnnnnnnnnnnn=========================================");
            
            dispatch(fetchTopDishRestaurantsSuccess(json));
            return json;
        })  
        .catch(err => dispatch(fetchTopDishRestaurantsFailure(err)))
    }
}

export function getTopDishRestaurants() {
    return {
        type: FETCH_TOP_DISH_RESTAURANT
    }
}

export function fetchTopDishRestaurantsSuccess(topDishRestaurants) {
    return {
        type: FETCH_TOP_DISH_RESTAURANT_SUCCESS,
        payload: {topDishRestaurants} 
    };
}

export function fetchTopDishRestaurantsFailure(error) {
    return {
        type: FETCH_TOP_DISH_RESTAURANT_FAILURE,
        payload: {error} 
    };
}

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

export function selectRestaurantForDetails(restaurant_id) {
    return {
        type: SELECT_RESTAURANT_FOR_DETAILS,
        payload: {restaurant_id}
    }
}

export function selectedRestaurantDetails(selectedRestaurant) {
    return {
        type: SELECTED_RESTAURANT_DETAILS,
        payload: {selectedRestaurant}
    }
}