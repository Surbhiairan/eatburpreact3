import { API_ROOT } from '../../api-config';

export const FETCH_FOOD_ITEMS = 'FETCH_FOOD_ITEMS';
export const FETCH_FOOD_ITEMS_SUCCESS = 'FETCH_FOOD_ITEMS_SUCCESS';
export const FETCH_FOOD_ITEMS_FAILURE = 'FETCH_FOOD_ITEMS_FAILURE';

export function fetchFoodItems() {

    return (dispatch) => {
        dispatch(getFoodItems());
        return(fetch(`${API_ROOT}/getFoodItems`))
        .then(res => res.json())
        .then(json => {

            dispatch(fetchFoodItemsSuccess(json.docs));
            //console.log(json,"jsonnnnnnnnnnnnnn");
            return json.docs;
        })  
        .catch(err => dispatch(fetchFoodItemsFailure(err)))
    }
}
 
export function getFoodItems() {
    return {
        type: FETCH_FOOD_ITEMS
    }
}

export function fetchFoodItemsSuccess(foodItems) {
    return {
        type: FETCH_FOOD_ITEMS_SUCCESS,
        payload: {foodItems} 
    };
}

export function fetchFoodItemsFailure(error) {
    return {
        type: FETCH_FOOD_ITEMS_FAILURE,
        payload: {error} 
    };
}