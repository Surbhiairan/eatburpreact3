import {
    FETCH_FOOD_ITEMS,
    FETCH_FOOD_ITEMS_SUCCESS,
    FETCH_FOOD_ITEMS_FAILURE
} from '../actions/foodItems.action';

const initialState = {
    
        foodItems: [],
        foodItemsError: null,
        foodItemsLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_FOOD_ITEMS:// start fetching posts and set loading = true
      return { ...state,  foodItemsError: null, foodItemsLoading: true }; 
    case FETCH_FOOD_ITEMS_SUCCESS:// return list of posts and make loading = false
      return { ...state, foodItems: action.payload.foodItems, foodItemsError:null, foodItemsLoading: false };
    case FETCH_FOOD_ITEMS_FAILURE:// return error and make loading = false
      //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, foodItems: [], foodItemsError: action.payload.error, foodItemsLoading: false};  
    default:
      return state;
    }
};

// console.log('initialState', initialState);
// console.log('changeSearchedText', reducer(initialState, changeSearchedText('pizzas')));
// console.log('changeSelectedFood', reducer(initialState, changeSelectedFood('1')));

export default reducer;