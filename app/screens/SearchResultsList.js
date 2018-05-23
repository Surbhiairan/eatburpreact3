import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
    FlatList,
    ImageBackground, 
    Image, 
    Platform, 
    StatusBar,
    RefreshControl
} from 'react-native';

import tags from '../data/tags';
import food from '../data/food';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { fetchRestaurants, fetchRestaurantsSuccess, fetchRestaurantsFailure, selectedRestaurantDetails, fetchTopDishRestaurants } from '../actions/restaurants.action';

import { API_ROOT } from '../../api-config';

import SearchBarPinterest from '../components/SearchBar/SearchBarPinterest';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SearchResultsList extends React.Component {

    constructor(props){
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        state= {
            searchQuery: '',
            foodData: food,
            refreshing: false,
            topRestaurants: [],
        }
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
        const { params } = this.props.navigation.state;
        var searchQuery = params.tag;
        this.setState({searchQuery: searchQuery});
        console.log("search query in comp will mount", searchQuery); 
        this.props.dispatch(fetchTopDishRestaurants(searchQuery));
        
        //this.getTopDishRestaurants(searchQuery);
        // var foodId = params.foodId;
        // console.log("foooooood id", foodId);
        // this.fetchTopRestaurants(foodId);
    }

    // fetchTopRestaurants = async (foodId) => {
    //     try {
    //         console.log("in fetchTopRestaurants foodid", foodId);
    //         const response = await fetch(`${API_ROOT}/getTopRestaurants`, {
            
    //             method: 'POST',
    //             headers: {
    //               Accept: 'application/json',
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               foodId: foodId,
                  
    //             }),
    //         });

    //         const json = await response.json();

    //         console.log(json, "json");
    //         this.setState({topRestaurants: json.docs});
    //         //console.log(this.state.data,"dataaa=============");
    //     } catch( error) {
    //         console.error(error);
    //     }
    // }

    _onRefresh() {
        this.setState({refreshing: true});
        fetchData().then(() => {
          this.setState({refreshing: false});
        });
    }

    // fetchData() {
    //     var that = this;
    //     // this.setState({isFetching: false});
    //     // axios.get('http://192.168.0.13:3000/api/story/get/by/geo')
    //     //   .then((res) => {
    //     //     that.setState({ stories: res.data, isFetching: false });
    //     //     that.props.dispatch(StoryActions.setStories(res.data))
    //     //   })
    // }

    _renderRestaurants = (item) => {
        //console.log("item", item);
        return(
        <View style={{
            backgroundColor: '#fff',
            elevation: 2,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2
        }}>

            <Text style = {{
                fontFamily: 'open-sans-regular',
                fontSize: 20,
                paddingLeft: 5,
                
            }}>{item.restaurant_name}</Text>
            <Text style = {{
                fontFamily: 'open-sans-light',
                fontSize: 15,
                paddingLeft: 5,
            }}>{item.dish_name}</Text>
            
            <Text>Rating: {item.average_rating}</Text>
           
            <Text>Recommendations: {item.recommendation}</Text>
        </View>
        );
    }

    _renderItem({ item, index }) {
        
        if (index === 0) {
        return (
            <View style={styles.firstListComponent}>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    resizeMode="cover"
                    source={require('../assets/images/sandwich.jpg')}>                              
                </Image>
            </View>
            <View style= {styles.content}>
                <Text style= {styles.foodName}>
                    {item.name}
                </Text>
                <Text style= {styles.placeName}>
                    {item.bestAt}
            </Text>
            </View>
        </View>
        );}
        else if (index === 1) {
            return (
                <View style={styles.twoListComponent}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        resizeMode="cover"
                        source={require('../assets/images/lasagna.jpg')}>                              
                    </Image>
                </View>
                <View style= {styles.content}>
                    <Text style= {styles.foodName}>
                        {item.name}
                    </Text>
                    <Text style= {styles.placeName}>
                        {item.bestAt}
                </Text>
                </View>
            </View>
            );}
            else if (index === 2) {
                return (
                    <View style={styles.threeListComponent}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                            resizeMode="cover"
                            source={require('../assets/images/lassi.jpg')}>                              
                        </Image>
                    </View>
                    <View style= {styles.content}>
                        <Text style= {styles.foodName}>
                            {item.name}
                        </Text>
                        <Text style= {styles.placeName}>
                            {item.bestAt}
                    </Text>
                    </View>
                </View>
            );}
            else if (index === 3) {
                return (
                    <View style={styles.fourListComponent}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                            resizeMode="cover"
                            source={require('../assets/images/coldCoffee.jpg')}>                              
                        </Image>
                    </View>
                    <View style= {styles.content}>
                        <Text style= {styles.foodName}>
                            {item.name}
                        </Text>
                        <Text style= {styles.placeName}>
                            {item.bestAt}
                    </Text>
                    </View>
                </View>
            );}
            else if (index === 4) {
                return (
                    <View style={styles.fiveListComponent}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                            resizeMode="cover"
                            source={require('../assets/images/pavBhaji.jpeg')}>                              
                        </Image>
                    </View>
                    <View style= {styles.content}>
                        <Text style= {styles.foodName}>
                            {item.name}
                        </Text>
                        <Text style= {styles.placeName}>
                            {item.bestAt}
                    </Text>
                    </View>
                </View>
             );}
        else if (index === (5)) 
        return (
            <View style={styles.lastListComponent}>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    resizeMode="cover"
                    source={require('../assets/images/poha.jpg')}>                              
                </Image>
            </View>
            <View style= {styles.content}>
            <Text style= {styles.foodName}>
                {item.name}
            </Text>
            <Text style= {styles.placeName}>
                {item.bestAt}
        </Text>
        </View>
        </View>
        );
    }

    renderTag = (tag) => {
        return (
          <View style= {styles.suggestionTagContainer}>
            <Text 
              style={styles.suggestionTag}
              onPress={() => this._handlePressFood(tag)} >
            {tag.title}</Text>
          </View>
        );
    };
    
    render(){
        //console.log("this.props", this.props);
        //console.log("this.props.topdishrestaurants", this.props.topDishRestaurants);
        return(
            <View style = {styles.main}>
            <StatusBar translucent = {false} barStyle="default" />
            <View style = {styles.searchBarContainer}>
                <SearchBarPinterest />
            </View>
            {/* <View style={styles.tagsContainer}>
                <ListView
                 horizontal={true}
                 //style={{flex:1, margin: 4}}
                 dataSource={ds.cloneWithRows(tags)}
                 renderRow={this.renderTag} 
                 showsHorizontalScrollIndicator={false}/>
            </View> */}

            {/* <View style={styles.tagsContainer}>
                <View style= {styles.suggestionTagContainer}>
                    <Text style = {styles.suggestionTag}>
                        Pizza Cheese
                    </Text>
                </View>
                <View style= {styles.suggestionTagContainer}>
                    <Text style = {styles.suggestionTag}>
                        Garlic 
                    </Text>
                </View>
                <View style= {styles.suggestionTagContainer}>
                    <Text style = {styles.suggestionTag}>
                        Masala Cheese
                    </Text>
                </View>
                <View style= {styles.suggestionTagContainer}>
                    <Text style = {styles.suggestionTag}>
                        Cheese Chutney
                    </Text>
                </View>
            </View> */}
            <View style = {styles.searchResultsTitleContainer}>
                <Text style={{
                    paddingLeft: 20,
                    fontFamily: 'open-sans-regular',
                    fontSize: 15,
                }}>Top restaurants for </Text>
                <Text style = {styles.searchResultsTitle}>
                {this.props.navigation.state.params.tag}
                </Text>
            </View>

            {/* <View style={{ flexDirection: 'row', backgroundColor:'#fff'}}>
                <ListView
                 //horizontal={true}
                 style= {styles.list}
                 dataSource={ds.cloneWithRows(food)}
                 renderRow={this._renderItem} 
                 showsVerticalScrollIndicator={false}/>
            </View> */}
            {this.props.topDishRestaurantsLoading ? <Text>Loading...</Text>
            :
            <ListView style= {styles.list}
            dataSource={ds.cloneWithRows(this.props.topDishRestaurants)}
            renderRow={this._renderRestaurants}
            enableEmptySections = {true} />
           
            }
            </View>
        );
    }
}

const styles = {
   main: {
    flex:1,
    //backgroundColor: '#E6E6E6',     //grey
    //backgroundColor: '#4B0082',     //purple
    //backgroundColor: '#191970',     //dark blue  
    //backgroundColor:'#6A5ACD',        //light blue
    //backgroundColor : '#800080'         //bright purple 
    //backgroundColor: '#eeeeee',       //light grey
    //backgroundColor: '#81F7F3'        //sky blue
    //backgroundColor: '#90a4ae'
    backgroundColor: '#fff'
   },
   searchBarContainer: {
    backgroundColor: '#1976d2' 
   },
   tagsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1976d2',
   },
   suggestionTagContainer: {
    borderRadius: 6,
    //backgroundColor: '#673ab7',       purple
    backgroundColor: '#fff',
    padding: 6,
    margin: 4
   },
   suggestionTag :{
    fontFamily: 'open-sans-regular',
    fontSize: 14,
    color: '#1976d2',    
   },
   searchResultsTitleContainer: { 
    marginRight: 10,
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
    //backgroundColor: '#e0e0e0'
   },
   searchResultsTitle: { 
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    paddingLeft:20,
    color: '#00649f'
   },
   list:{
    //backgroundColor: '#e5e5e5',
    // borderTopLeftRadius:4,
    // borderTopRightRadius:4,
    // borderBottomLeftRadius:4,
    // borderBottomRightRadius:4,
    marginRight: 10,
    marginLeft: 10,
   },
   listComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    backgroundColor: '#fff',
    padding: 5, 
   },
   firstListComponent: {
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    //backgroundColor: '#560764',
    backgroundColor: '#00649f',       //p1 blue
    //backgroundColor: '',
    padding: 5, 
   },
   twoListComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    //backgroundColor: '#913175',
    backgroundColor: '#01aac1',       //p1 blue
    padding: 5, 
   },
   threeListComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    //backgroundColor: '#DD5B82',
    backgroundColor: '#00dbe7',       //p1 blue
    padding: 5, 
   },
   fourListComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    //backgroundColor: '#FE9797',
    backgroundColor: '#97ecc5',       //p1 blue
    padding: 5, 
   },
   fiveListComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
  //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    backgroundColor: '#c6f1e7',        //p1 blue
    padding: 5, 
   },
   lastListComponent :{
    flexDirection: 'row',
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    backgroundColor: '#c7f3ff',         //p1 blue
    padding: 5, 
   },
   imageContainer: {
    //backgroundColor:'#fff',
    
    //borderRadius: 64,
    // borderRadius: 30,
    // height:60,
    // width: 60,
    // alignItems: 'center',
    // justifyContent: 'center',
    // elevation:5,
},
image: {  
    height:80,
    width: 80,
    borderRadius: 40
},
content: {
    marginLeft: 20,
    marginTop: 5,
},
foodName: {
    fontFamily: 'open-sans-semibold',
    fontSize: 18,
    color: '#fff',
},
placeName: {
    fontFamily: 'open-sans-light',
    fontSize: 15,
    color: '#fff',
}
}

//taking the redux state and mapping it to the component props
//the param state is the redux state
const mapStateToProps = (state) => ({
    foodItems: state.foodItems.foodItems,
    foodItemsLoading: state.foodItems.foodItemsLoading,
    foodItemsError: state.foodItems.foodItemsError,
    topDishRestaurants: state.restaurants.topDishRestaurants,
    topDishRestaurantsLoading: state.restaurants.topDishRestaurantsLoading,
    topDishRestaurantsError: state.restaurants.topDishRestaurantsError,
    // const foodId : state.search.selectedFood,
    // return {
    //     foodId,
    // };
});

export default connect(mapStateToProps)(SearchResultsList);