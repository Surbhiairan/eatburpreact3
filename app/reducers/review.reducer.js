import { 
    ADD_REVIEW, 
    ADD_REVIEW_SUCCESS, 
    ADD_REVIEW_FAILURE,
    FETCH_REVIEWS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAILURE } from '../actions/review.action';

const initialState = {
    reviewsList: [],
    reviewsListLoading: false,
    reviewsListError: null,

    review: [],
    reviewError: null,
    reviewLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ADD_REVIEW:
      return { ...state, reviewLoading: true }; 
    case ADD_REVIEW_SUCCESS:
      return { ...state, review: action.payload.review, reviewError:null, reviewLoading: false };
    case ADD_REVIEW_FAILURE:
      return { ...state, review: null, reviewError: action.payload.error, reviewLoading: false};  
    case FETCH_REVIEWS: 
      return { ...state,  reviewsListError: null, reviewLoading: true };     
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, reviewsList: action.payload.reviewsList, reviewsListError:null, reviewsListLoading: false };   
    case FETCH_REVIEWS_FAILURE:
      return { ...state, reviewsList: [], reviewsListError: action.payload.error, reviewsListLoading: false};  
    
      default:
      return state;
    }
};

export default reducer;