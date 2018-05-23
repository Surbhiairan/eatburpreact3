import { CHANGE_SEARCHED_TEXT, CHANGE_SELECTED_FOOD, changeSearchedText, changeSelectedFood } from '../actions/search.action';

const initialState = {
    searchedText: '',
    selectedFood: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SEARCHED_TEXT:
            //state.searchedText = action.searchedText      //BIG NO NO
            //take that state and create a new state from it
            return {
                //return a new object
                ...state, 
                searchedText: action.searchedText || '',
            };
        case CHANGE_SELECTED_FOOD:
            return {
                //return a new object
                ...state, 
                selectedFood: action.foodId || 0,
            };
        default:
         return state;
    }
};

// console.log('initialState', initialState);
// console.log('changeSearchedText', reducer(initialState, changeSearchedText('pizzas')));
// console.log('changeSelectedFood', reducer(initialState, changeSelectedFood('1')));

export default reducer;