import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
    StatusBar,
} from 'react-native';
import food from '../data/food';
import SearchBarPinterest from '../components/SearchBar/SearchBarPinterest';
import { changeSearchedText } from '../actions/search.action';
import { changeSelectedFood } from '../actions/search.action';
import { fetchRestaurants, fetchRestaurantsSuccess, fetchRestaurantsFailure, selectedRestaurantDetails, fetchTopDishRestaurants } from '../actions/restaurants.action';
import { fetchFoodItems, fetchFoodItemsSuccess, fetchFoodItemsFailure } from '../actions/foodItems.action';
import { BackHandler } from 'react-native';

import { bindActionCreators } from 'redux';
//to remove error: this.props.dispatch is not a function
import { connect } from 'react-redux';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SearchList extends React.Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);        
        this.state = {
            data: [],
            searchedItem: [], 
            text: '',
            underlineButton1: true,
            underlineButton2: false,
            searchedFood: [],
            searchedPlace: [],
            tags: [],
        };  
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    
    componentDidMount() {
        this.props.dispatch(fetchRestaurants());
        this.props.dispatch(fetchFoodItems())
            .then( data => {
                //console.log("data", data);
                var tags = [];
                var searchedFood = data.filter(function(food) {
                    if(food.search_tag && food.search_tag.length!=0){
                        //console.log("search taggggggggggggggg", food.search_tag);
                        for( i in food.search_tag){
                            //console.log("iiiiiiiiiiiiiiiiiiiiiiiii",i);
                            //console.log("food.searchtag[i]", food.search_tag[i]);
                            if(! (tags.indexOf(food.search_tag[i]) > -1)) {
                                tags.push(food.search_tag[i]);
                            }
                        }
                        //console.log("tagsssssssssssssssssssssssssss", tags);
                       
                     //return food.search_tag[0].toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
                   }
                   });
                   this.setState({tags: tags});
            });
    }
    
    // componentWillMount() {
    //     this.fetchData();
    // }

    // fetchData = async () => { 
    //     try {
    //         const response = await fetch('http://192.168.43.41:3000/getFoodItems');
    //         const json = await response.json();
    //         //console.log(json, "json");
    //         this.setState({data: json.docs});
    //         //console.log(this.state.data,"dataaa=============");
    //     } catch( error) {
    //         console.error(error);
    //     }
    // }

    _handlePressPlace = (item) => {
        // console.log("handel press food", food._id);
        // console.log(changeSelectedFood(food._id));
        // this.props.dispatch(changeSelectedFood(food._id));
        // this.props.navigation.navigate('searchResultsList', { foodId: food._id });
        this.props.dispatch(selectedRestaurantDetails(item));
        
        this.props.navigation.navigate('restaurantDetails');
    } 
    _handlePressFood = (item) => {
        console.log('tag pressed', item);
        //pass the tag
        //this.props.dispatch(fetchTopDishRestaurants(item));
        this.props.navigation.navigate('searchResultsList', {tag:item});
        
    }

    renderFood = (food) => {
        console.log("foooood", food);
        return (
          <View           
          style= {styles.listItem}>
            <Text 
              style={styles.listItemText}
              onPress={() => this._handlePressFood(food)}
            >
            {food}</Text>
            
          </View>
        );
    };

    renderPlace = (place) => {
        return (
          <View           
          style= {styles.listItem}>
            <Text 
              style={styles.listItemText}
              onPress={() => this._handlePressPlace(place)}
            >
            {place.restaurant_name}</Text>
          </View>
        );
    };

    handleChangeText = (searchedText) => {
        //console.log(searchedText,'first condition');
        
        //console.log(changeSearchedText(searchedText));
        const { restaurants, restaurantsLoading, restaurantsError,  foodItems, foodItemsLoading, foodItemsError} = this.props;
        
        this.props.dispatch(changeSearchedText(searchedText));

        if(this.state.underlineButton1)
        {
            var searchedFood = this.state.tags.filter(function(tag) {
                //console.log("tagssss", tag);
                return tag.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
              });
            this.setState({searchedFood: searchedFood});

           //console.log(foodItems,'first condition==============================================')
           
           //for all food tags in each dish create an array and show that in search suggestion
           
        //    var tags = [];
        //    var searchedFood = this.props.foodItems.filter(function(food) {
        //     if(food.search_tag && food.search_tag.length!=0){
        //         //console.log("search taggggggggggggggg", food.search_tag);
        //         for( i in food.search_tag){
        //             //console.log("iiiiiiiiiiiiiiiiiiiiiiiii",i);
        //             //console.log("food.searchtag[i]", food.search_tag[i]);
        //             if(! (tags.indexOf(food.search_tag[i]) > -1)) {
        //                 tags.push(food.search_tag[i]);
        //             }
        //         }
        //         //console.log("tagsssssssssssssssssssssssssss", tags);
               
        //      //return food.search_tag[0].toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        //    }
        //    });
        //    this.setState({searchedFood: tags});
           //console.log('anjaliiiiiiiiiii',this.state.searchedFood);
        }
        else{
           //console.log(searchedText,'second condition')
           var searchedPlace = this.props.restaurants.filter(function(place) {
               return place.restaurant_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
             });
             this.setState({searchedPlace: searchedPlace});
        }

        // //console.log("in handle change text============================", this.props.restaurants);
        // var searchedItem = this.props.restaurants.filter(function(item) {
        //     //console.log("food===========", food)
        //   return item.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        // });
        // this.setState({searchedItem: searchedItem});
        this.setState({text: searchedText});
        //console.log('anjaliiiiiiiiiii',this.state.text);
    }

    onSearchSubmit = () => {
        console.log("in on search submit");
        console.log(this.state.text, "========text==============");
        const param = this.state.text;
        this.props.navigation.navigate('searchResultsList', { searchQuery: param });        
    }

    render(){
        const { restaurants, restaurantsLoading, restaurantsError } = this.props;
        if(restaurantsLoading) {
            return (
                <View> 
                    <Text>Loading....</Text>
                </View>
            );
        }
        
        return(
        
        <View style= {styles.container}>
        <StatusBar
            translucent={true}
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
        />
        <View style = {styles.searchBarContainer}>
        <SearchBarPinterest
         autoFocus={true}
         //onChangeText = {(text) => this._handleOnChangeText(text)} />
         onChangeText={this.handleChangeText}
         //value={this.state.text}
         onSubmitEditing={this.handleChangeText} />
        </View>

        <View style={{flexDirection: 'row',}}>
        
            <View style={{flex:1,}}>
            <TouchableOpacity
            style={styles.button}
            onPress={()=> this.setState( {underlineButton1: true,underlineButton2: false,})}
            >
            <Text
            style={this.state.underlineButton1 ? styles.textOnSelect:styles.defaultText}> 
            What? 
            </Text>

            </TouchableOpacity>
            </View>

            <View style={{flex:1,}}>
            <TouchableOpacity
            style={styles.button}
            onPress={()=> this.setState({underlineButton1: false,underlineButton2: true,})}
            >
            <Text style={this.state.underlineButton2 ? styles.textOnSelect: styles.defaultText}> Where? </Text>
            </TouchableOpacity>
            </View>
        </View>
        
        <View style={{backgroundColor:'#f7f7f7',marginTop: 20,}}>
        <ListView
        dataSource={ds.cloneWithRows(this.state.underlineButton1? this.state.searchedFood: this.state.searchedPlace)}
        renderRow={this.state.underlineButton1? this.renderFood: this.renderPlace} 
        enableEmptySections={true}/>
        </View>
        </View>

        );
    }
}

const styles = {
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBarContainer: {
        marginTop: 20,
    },
    defaultText:{
        fontSize:15,
        color:'#7e7e7e',
        fontFamily: 'open-sans-regular'
    },
    textOnSelect:{
        fontSize:15,
        borderBottomWidth: 1, 
        borderBottomColor: '#3d3d3d',
        color:'#3d3d3d',
        fontFamily: 'open-sans-semibold',
    },
    button: {
        alignItems: 'center',
        //backgroundColor: '#DDDDDD',
        paddingTop: 8,
        paddingBottom:1,
    },
    listItem: {
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderBottomColor:'#f7f7f7',
        justifyContent: 'flex-start',
        padding: 10,
    },
    listItemText: {
        color: '#283747',
        fontSize: 15,
        fontFamily: 'open-sans-light',
    }
};

const mapStateToProps = (state) => ({
    restaurants: state.restaurants.restaurants,
    restaurantsLoading: state.restaurants.restaurantsLoading,
    restaurantsError: state.restaurants.restaurantsError,
    foodItems: state.foodItems.foodItems,
    foodItemsLoading: state.foodItems.foodItemsLoading,
    foodItemsError: state.foodItems.foodItemsError,
});

// const mapDispatchToProps = (dispatch) => {
//     return {
//         ...bindActionCreators({ fetchRestaurants }, dispatch)
//     }
// }

export default connect(mapStateToProps)(SearchList) ;