import { API_ROOT } from '../../api-config';

export const ADD_REVIEW = 'ADD_REVIEW';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_FAILURE = 'ADD_REVIEW_FAILURE';

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE= 'FETCH_REVIEWS_FAILURE';

import reviews from '../data/reviews';
import deviceStorage from "../services/storage.service"; 

export function addReview(data, token) {
    //console.log("in add review===========================", review);
    return (dispatch) => {
        dispatch(saveReview());
        console.log("this.review===============",data);
        
        console.log('token in review----------', token);
        return( 
            fetch(`${API_ROOT}/addReview`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'x-access-token': token
                //'Content-Type': 'multipart/form-data',
                },
                body: data,
                }
            )
        )
         .then(
             res => res.json())
        .then(json => {
            console.log("klsdhfldkhflksdfds======================",json);
            dispatch(addReviewSuccess(json));
            //console.log(json,"jsonnnnnnnnnnnnnn");
            return json;
        })  
        .catch(err => dispatch(addReviewFailure(err)))
    }
    
}
 
export function saveReview() {
    return{
        type: ADD_REVIEW
        
    }
}

export function addReviewSuccess(review) {
    return {
        type: ADD_REVIEW_SUCCESS,
        payload: {review} 
    };
}

export function addReviewFailure() {
    return {
        type: ADD_REVIEW_FAILURE,
        payload: {error} 
    };
}

export function fetchReviews() {
    return (dispatch) => {
        dispatch(getReviews());
        return(fetch(`${API_ROOT}/getRestaurants`))
        .then(res => res.json())
        .then(json => {

            dispatch(fetchReviewsSuccess(reviews));
            //console.log(json,"jsonnnnnnnnnnnnnn");
            return reviews;
        })  
        .catch(err => dispatch(fetchReviewsSuccess(err)))
    }
}

export function getReviews() {
    return {
        type: FETCH_REVIEWS
    }
}

export function fetchReviewsSuccess(reviewsList) {
    return {
        type: FETCH_REVIEWS_SUCCESS,
        payload: { reviewsList }
    }
}

export function fetchReviewsFailure(error) {
    return {
        type: FETCH_REVIEWS_FAILURE,
        payload: {error}
    }
}