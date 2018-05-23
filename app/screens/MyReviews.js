import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet, 
    Button, 
    Image, 
    ListView, 
    ScrollView,
    NativeModules,
    Alert, 
    FlatList,
    Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { fetchReviews, fetchReviewsSuccess, fetchReviewsFailure } from '../actions/review.action';

class MyReviews extends Component {

    componentDidMount(){
        //get user details
        //pass token here
        this.props.dispatch(fetchReviews());
    }



    render(){
        return(
            <View style = {{
                backgroundColor: '#fff',
            }}>
                <Text style= {{
                    fontFamily: 'open-sans-semibold',
                    fontSize: 20
                }}
                >My Reviews</Text>

                <FlatList
                 data={this.props.reviewsList}
                 extraData={this.state}
                 keyExtractor={this._keyExtractor}
                 renderItem={({item}) => <Text>{item.review}</Text>}
               />

               <TouchableOpacity>
                   
               </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
   
    reviewsList: state.review.reviewsList,
    reviewsListLoading: state.review.reviewsListLoading,
    reviewsListError: state.review.reviewsListError

});

export default connect(mapStateToProps)(MyReviews);