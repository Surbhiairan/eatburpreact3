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
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';

import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { fetchRestaurants, fetchRestaurantsSuccess, fetchRestaurantsFailure } from '../actions/restaurants.action';
import { fetchFoodItems, fetchFoodItemsSuccess, fetchFoodItemsFailure } from '../actions/foodItems.action';
import { addReview, addReviewSuccess, addReviewFailure } from '../actions/review.action';
import deviceStorage from '../services/storage.service';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class AddReview extends Component{
    
    state = {
        restoName: '',
        restoId: '',
        itemName: '',
        itemId: '',
        review: '',
        rating: '',
        image: null, 
        restaurants: [],
        foodItems: [],
        searchedRestaurants: [],
        searchedFood: [],
        pickerResult: [],
        token: '',
        restoNameError: '',
    }

    componentDidMount() {
        this.props.dispatch(fetchRestaurants());
        this.props.dispatch(fetchFoodItems());     
        deviceStorage.loadJWT()
        .then(res => {
            this.setState({token: res})
        })   
        .catch(err => alert(err));
    }

    // fetchRestaurants = async () => { 
    //     try {
    //         const response = await fetch('http://192.168.43.41:3000/getRestaurants');
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
    //         const response = await fetch('http://192.168.43.41:3000/getFoodItems');
    //         const json = await response.json();
    //         //console.log(json, "json");
    //         this.setState({foodItems: json.docs});
    //         //console.log(this.state.data,"dataaa=============");
    //     } catch( error) {
    //         console.error(error);
    //     }
    // }

    handleRestaurant = (text) => {
        //console.log("this.state.restaurants=============",this.state.restaurants);
        var searchedRestaurants = this.props.restaurants.filter(function(restaurant) {
            return restaurant.restaurant_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
          });
          this.setState({searchedRestaurants: searchedRestaurants});
          this.setState({ restoName: text })
    }
    
    _handlePressRestaurant = (restaurant) => {
        this.setState ( { restoName: restaurant.restaurant_name});
        this.setState ( { restoId: restaurant._id});      
        this.setState ( { searchedRestaurants: []});
        //console.log("in handle press restaurant", this.state.restoName);
    }

    handleFood = (text)=> {
        var searchedFood = this.props.foodItems.filter(function(food) {
            //console.log('foooooooo************************dddddddddddd',food);
            return food.dish_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
          });
        this.setState({searchedFood: searchedFood});
        this.setState({ itemName: text })
    }

    _handlePressFood = (food) => {
        this.setState ( { itemName: food.dish_name});
        this.setState({ itemId: food._id })        
        this.setState ( { searchedFood: []});
        //console.log("in handle press food item", this.state.itemName);       
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
            {restaurant.restaurant_name}</Text>
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
            {food.dish_name}</Text>
            
          </View>
        );
    };

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
            this.uploadImageAsync(pickerResult.uri);
            // uploadResult = await uploadResponse.json();
            // this.setState({ image: uploadResult.location });
          }
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          console.log("e****************************************",e)
          //alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
    };

    refreshFields = () => {
        this.setState({restoName: ''});
        this.setState({itemName:''});
        this.setState({review:''});
        this.setState({rating:''});
        this.setState({image:null});
    }

    showAlert(){
        console.log("in showalert")
        Alert.alert(
            'bla bla bla',
            'Review Added',
            [
            //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            //   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: this.refreshFields},
            ],
            { cancelable: false }
          )
    }

    async uploadImageAsync(uri) {
        //let apiUrl = 'http://192.168.43.101:3000/uploadimage';
        //console.log(restoName, itemName, rating, review );
        
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
      
        let formData = new FormData();
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        //formData.append('restaurantId', this.state.restoId);
        //formData.append('itemId', this.state.itemId)
        formData.append('restaurantName', this.state.restoName);
        formData.append('foodItem', this.state.itemName);
        formData.append('rating', this.state.rating);
        formData.append('review', this.state.review);
      
        //console.log("formdata====================================", formData);
        this.props.dispatch(addReview(formData, this.state.token)).then(res => {
            console.log('res------', res)
            if (res.success) {
                this.showAlert();
                //alert('Review saved to database!');
                // Alert.alert(
                //     'Alert Title',
                //     'alertMessage',
                //     [
                //       {text: 'Ok', onPress: () => console.log('Ok Pressed!')},
                //       {text: 'OK', onPress: this.onDeleteBTN},
                //     ],
                //     { cancelable: false }
                //   )
            } else {
                alert(res);

            }
        }).catch(err => {
            alert(err)
        })
    
        //console.log("form data in addreview.js", formData);

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
    addReview () {
        if (this.state.restoName.trim() === "") {
            this.setState(() => ({ restoNameError: "Restaurant name required."}));
          } else {
            this.setState(() => ({ restoNameError: null}));
          }

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
                <KeyboardAvoidingView
                behavior="padding">
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
               onBlur={() => this.state.restoName.trim()==="" && this.setState({restoNameError: 'Required'})}
               onChangeText = {this.handleRestaurant}/>
               {!!this.state.restoNameError && (
                <Text style={{color: '#000'}}>{this.state.restoNameError}</Text>
               )}
               {this.props.restaurantsLoading ? <Text>Loading...</Text>
                    :
                <ListView
                dataSource={ds.cloneWithRows(this.state.searchedRestaurants)}
                renderRow={this.renderRestaurant} 
                enableEmptySections = {true}/>
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
               renderRow={this.renderFood}
               enableEmptySections = {true} />
               }
               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Review"
               value = { this.state.review}
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleReview}/>

               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Rating"
               value = { this.state.rating}
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
                  () => this.addReview()
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>  
         {this.props.reviewLoading &&
                  <View style={styles.loading}>
                      <ActivityIndicator/>
                  </View>
         }
         </KeyboardAvoidingView>
         </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
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