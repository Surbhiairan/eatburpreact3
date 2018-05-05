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
    Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { fetchRestaurants, fetchRestaurantsSuccess, fetchRestaurantsFailure } from '../actions/restaurants.action';
import { fetchFoodItems, fetchFoodItemsSuccess, fetchFoodItemsFailure } from '../actions/foodItems.action';
import { addReview, addReviewSuccess, addReviewFailure } from '../actions/review.action';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class AddReview extends Component{
    
    state = {
        restoName: '',
        itemName: '',
        review: '',
        rating: '',
        image: null, 
        restaurants: [],
        foodItems: [],
        searchedRestaurants: [],
        searchedFood: [],
        pickerResult: [],
    }

    componentDidMount() {
        //this.fetchRestaurants();
        //this.fetchFoodItems();
        this.props.dispatch(fetchRestaurants());
        this.props.dispatch(fetchFoodItems());        
    }

    // fetchRestaurants = async () => { 
    //     try {
    //         const response = await fetch('http://192.168.43.101:3000/getRestaurants');
    //         const json = await response.json();
    //         //console.log(json, "json");
    //         this.setState({restaurants: json.docs});
    //         //console.log(this.state.data,"dataaa=============");
    //     } catch( error) {
    //         console.error(error);
    //     }
    // }

    // fetchFoodItems = async () => { 
    //     try {
    //         const response = await fetch('http://192.168.43.101:3000/getFoodItems');
    //         const json = await response.json();
    //         //console.log(json, "json");
    //         this.setState({foodItems: json.docs});
    //         //console.log(this.state.data,"dataaa=============");
    //     } catch( error) {
    //         console.error(error);
    //     }
    // }

    handleRestaurant = (text) => {
        console.log("this.state.restaurants=============",this.state.restaurants);
        var searchedRestaurants = this.props.restaurants.filter(function(restaurant) {
            return restaurant.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
          });
          this.setState({searchedRestaurants: searchedRestaurants});
          //this.setState({text: searchedText});
          //console.log('anjaliiiiiiiiiii',this.state.text);

          this.setState({ restoName: text })
    }
    
    handleFood = (text)=> {
        var searchedFood = this.props.foodItems.filter(function(food) {
            return food.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
          });
        this.setState({searchedFood: searchedFood});
        this.setState({ itemName: text })
    }

    handleReview = (text)=> {
        this.setState({ review: text })
    }

    handleRating = (text)=> {
        this.setState({ rating: text })
    }
    
    renderRestaurant = (restaurant) => {
        return (
          <View           
          style= {styles.listItem}>
            <Text 
              style={styles.listItemText}
              onPress={() => this._handlePressRestaurant(restaurant)}
            >
            {restaurant.name}</Text>
          </View>
        );
    };

    renderFood = (food) => {
        return (
          <View           
          style= {styles.listItem}>
            <Text 
              style={styles.listItemText}
              onPress={() => this._handlePressFood(food)}
            >
            {food.name}</Text>
            
          </View>
        );
    };

    _handlePressRestaurant = (restaurant) => {
        this.setState ( { restoName: restaurant.name});
        this.setState ( { searchedRestaurants: []});
        console.log("in handle press restaurant", this.state.restoName);
    }

    _handlePressFood = (food) => {
        this.setState ( { itemName: food.name});
        this.setState ( { searchedFood: []});
        console.log("in handle press food item", this.state.itemName);       
    }

    addImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this.setState({pickerResult: pickerResult});
        //this._handleImagePicked(pickerResult);

        console.log(pickerResult);
    
        if (!pickerResult.cancelled) {
          this.setState({ image: pickerResult.uri });
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;
    
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadResponse = this.uploadImageAsync(pickerResult.uri,
            this.state.restoName,
            this.state.itemName,
            this.state.rating,
            this.state.review);
            uploadResult = await uploadResponse.json();
            this.setState({ image: uploadResult.location });
          }
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
    };
    async uploadImageAsync(uri, restoName, itemName, rating, review) {
        let apiUrl = 'http://192.168.43.101:3000/uploadimage';
        console.log(restoName, itemName, rating, review );
        
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
      
        let formData = new FormData();
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        formData.append('restaurantName', restoName);
        formData.append('foodItem', itemName)
        formData.append('rating', rating);
        formData.append('review', review);
      
        console.log("formdata====================================", formData);
        this.props.dispatch(addReview(formData));
        consol.log("form data in addreview.js", formData);
        // let options = {
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //   },
        // };
      
        //return fetch(apiUrl, options);
    }
    addReview = (restoName, itemName, review, rating) => {
        this.onSubmitReview();
        //alert(restoName+itemName+review+rating);
    }

    async onSubmitReview() {

        this._handleImagePicked(this.state.pickerResult);
    }

    render(){

        let { image } = this.state;
        
        return(
            <ScrollView>
                <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: '#fff',
                    margin: 10
                }}> 
                    <Text
                    style={{
                        fontFamily: 'open-sans-semibold',
                        fontSize: 20,
                        color:'#673ab7',

                    }}> Add Review </Text>
                </View>
            <View style = {styles.container}>
            <TextInput style = {styles.input}
               //onPress = {this.updateText}
               underlineColorAndroid = "transparent"
               placeholder = "Restaurant Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               //ref = { }
               value = {this.state.restoName}
               onChangeText = {this.handleRestaurant}/>
               
               {this.props.restaurantsLoading ? <Text>Loading...</Text>
                    :
                   <ListView
                dataSource={ds.cloneWithRows(this.state.searchedRestaurants)}
                renderRow={this.renderRestaurant} />
               }
               
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Food Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value = {this.state.itemName}
               onChangeText = {this.handleFood}/>
               {this.props.foodItemsLoading ? <Text>Loading...</Text>
                    :
                    <ListView
               dataSource={ds.cloneWithRows(this.state.searchedFood)}
               renderRow={this.renderFood} />
               }
               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Review"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleReview}/>

               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Rating"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleRating}/>

               <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.addImage()
               }>
               <Text style = {styles.submitButtonText}> Add Image </Text>
               </TouchableOpacity>
                
                {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
               <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.addReview(this.state.itemName, this.state.review, 
                    this.state.restoName, this.state.rating)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>  
         </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#fff',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 2,
       paddingLeft:20
    },
    listItem: {
        paddingLeft: 20
    },
    listItemText: {
        fontFamily: 'open-sans-regular',
        fontSize: 20,
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
});

const mapStateToProps = (state) => ({
    restaurants: state.restaurants.restaurants,
    restaurantsLoading: state.restaurants.restaurantsLoading,
    restaurantsError: state.restaurants.restaurantsError,
    foodItems: state.foodItems.foodItems,
    foodItemsLoading: state.foodItems.foodItemsLoading,
    foodItemsError: state.foodItems.foodItemsError,
    review: state.review.review,
    reviewLoading: state.review.reviewLoading,
    reviewError: state.review.reviewError

});

export default connect(mapStateToProps)(AddReview) ;