import {
    FETCH_MENU,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE
} from '../actions/menu.action';

const initialState = {
    
        menu: [],
        menuError: null,
        menuLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_MENU:// start fetching posts and set loading = true
      return { ...state,  menuError: null, menuLoading: true }; 
    case FETCH_MENU_SUCCESS:// return list of posts and make loading = false
      return { ...state, menu: action.payload.menu, menuError:null, menuLoading: false };
    case FETCH_MENU_FAILURE:// return error and make loading = false
      //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, menu: [], menuError: action.payload.error, menuLoading: false};  
    default:
      return state;
    }
};

// console.log('initialState', initialState);
// console.log('changeSearchedText', reducer(initialState, changeSearchedText('pizzas')));
// console.log('changeSelectedFood', reducer(initialState, changeSelectedFood('1')));

export default reducer;