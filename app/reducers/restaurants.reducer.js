import {
    FETCH_RESTAURANTS,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAILURE,
    SELECT_RESTAURANT_FOR_DETAILS,
    SELECTED_RESTAURANT_DETAILS,
    FETCH_TOP_DISH_RESTAURANT,
    FETCH_TOP_DISH_RESTAURANT_FAILURE,
    FETCH_TOP_DISH_RESTAURANT_SUCCESS,
} from '../actions/restaurants.action';

const initialState = {
    
        restaurants: [],
        restaurantsError: null,
        restaurantsLoading: false,
        selectedRestaurantId: null,
        selectedRestaurant: null,
        topDishRestaurants: [],
        topDishRestaurantsLoading: false,
        topDishRestaurantsError: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_RESTAURANTS:// start fetching posts and set loading = true
      return { ...state,  restaurantsError: null, restaurantsLoading: true }; 
    case FETCH_RESTAURANTS_SUCCESS:// return list of posts and make loading = false
      return { ...state, restaurants: action.payload.restaurants, restaurantsError:null, restaurantsLoading: false };
    case FETCH_RESTAURANTS_FAILURE:// return error and make loading = false
      //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, restaurants: [], restaurantsError: action.payload.error, restaurantsLoading: false};
    case SELECT_RESTAURANT_FOR_DETAILS:
      return { ...state, selectedRestaurantId: action.payload.restaurant_id};
    case SELECTED_RESTAURANT_DETAILS: 
      return { ...state, selectedRestaurant: action.payload.selectedRestaurant};
    case FETCH_TOP_DISH_RESTAURANT:
      return { ...state,  topDishRestaurantsError: null, topDishRestaurantsLoading: true }; 
    case FETCH_TOP_DISH_RESTAURANT_FAILURE:
      return { ...state, topDishRestaurants: [], topDishRestaurantsError: action.payload.error, topDishRestaurantsLoading : false};
    case FETCH_TOP_DISH_RESTAURANT_SUCCESS:
      return { ...state, topDishRestaurants: action.payload.topDishRestaurants, topDishRestaurantsError: null, topDishRestaurantsLoading: false};
    default:
      return state;
    }
};

// console.log('initialState', initialState);
// console.log('changeSearchedText', reducer(initialState, changeSearchedText('pizzas')));
// console.log('changeSelectedFood', reducer(initialState, changeSelectedFood('1')));

export default reducer;