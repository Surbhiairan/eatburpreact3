import React, { Component } from 'react';
import { View, 
        StyleSheet, 
        Text, 
        Image, 
        TouchableNativeFeedback, 
        FlatList, 
        TouchableOpacity,
        StatusBar,
        ScrollView,
        ListView,
    } from 'react-native';
import SearchBarWhite from '../components/SearchBar/SearchBarWhite';
import SearchBarPinterest from '../components/SearchBar/SearchBarPinterest';
import CategoryButton from '../components/CategoryButton/CategoryButton';
import {Constants} from 'expo';
import { fetchMenu } from '../actions/menu.action';
import { selectedRestaurantDetails } from '../actions/restaurants.action';
import { connect } from 'react-redux';

class RestaurantDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //selectedRestaurant: null,
            //menu: [],
            categorizedMenu: [],
            selectedDishCategory: []
        };  
    }

    componentWillMount() {
        //console.log("in component did mount");
        // console.log("this.propsssssssssssssss outside", this.props.selectedRestaurantId);
        // var id = this.props.selectedRestaurantId;
        // var selectedRestaurant = this.props.restaurants.filter(function(restaurant) {
        //     console.log("restaurant===========", restaurant)
        //     //console.log("this.propsssssssssssssss", this.props.restaurants.selectedRestaurantId);
        //     return restaurant._id == id;
        // });
        // this.props.dispatch(selectedRestaurantDetails(selectedRestaurant))
        this.props.dispatch(fetchMenu(this.props.selectedRestaurant._id));
        // .then(data => {
        //     console.log("selected restaurant inside=============", this.props);
            
        // })
        //console.log("selected restaurant=============", this.props.selectedRestaurant);
        
        // this.setState({selectedRestaurant: selectedRestaurant}, function() {
        // console.log("selected restaurant info in state================", selectedRestaurant);
        // this.props.dispatch(fetchMenu(this.props.selectedRestaurantId));
        // });
    }

    // componentWillMount() {
    //     const { params } = this.props.navigation.state; 
    //     var restaurantId = params.restaurantId;
    //     console.log("restaurant id", restaurantId);
    //     var selectedRestaurant = this.props.restaurants.filter(function(restaurant) {
    //         console.log("restaurant===========", restaurant)
    //       return restaurant._id == restaurantId;
    //     });
    //     console.log("selected resturant==================", selectedRestaurant);
    //     this.setState({selectedRestaurant: selectedRestaurant}, function() {
    //         this.fetchRestoItem()
    //             .then(data => {
    //             console.log("data==================", data);
    //             result = data.reduce(function (r, a) {
    //             r[a.dish_category] = r[a.dish_category] || [];
    //             r[a.dish_category].push(a);
    //             //this.setState({categorizedMenu: r})
    //             return r;
    //         }, Object.create(null));
    //         console.log("resulttttttttttttttttttttttttttttttt", result);
            
    //         var ja = [];
    //         for( item in result) {
    //             //var jo = [];
    //             ja.push({
    //                 "category": item,
    //                 "dishes": result[item]
    //             }) 
    //         }
    //         console.log("jaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", ja);
    //         // JSONArray ja = new JSONArray();
            
    //         // for(item in result){
    //         //     JSONObject jo = new JSONObject();
    //         //     jo.put("dishCategory", item);
    //         //     jo.put("dishes", result[item]);
    //         //     ja.put(jo);
    //         //     console.log("item===============",result[item]);
    //         // }
    //         // console.log("===============================", jo);
    //         this.setState({ categorizedMenu: ja});
    //         } 
    //      )
    //     });        
    // }

    // fetchRestoItem = async () => { 
    //     try {
    //         var restaurantId = this.state.selectedRestaurant[0]._id;
    //         console.log(restaurantId, "restaurant id in fetch resto item");
    //         const response = await fetch('http://192.168.43.101:3000/getMenu?restaurantId='+restaurantId);
    //         const json = await response.json();
    //         console.log(json, "json");
    //         return json;

    //     //     this.setState({menu: json});

    //     //     result = json.reduce(function (r, a) {
    //     //         r[a.dish_category] = r[a.dish_category] || [];
    //     //         r[a.dish_category].push(a);
    //     //         return r;
    //     //     }, Object.create(null));
        
    //     // console.log(result, "reduced result");
    //         //console.log(this.state.data,"dataaa=============");
    //     } catch( error) {
    //         console.error(error);
    //     }
    // }

    _onMenuClicked = () => {
        //send restaurant id in the form of query param(GET)
    }

    _handlePressDishCategory = (menu) => {
        console.log("selectedDishCategory===================", menu);
        this.setState({selectedDishCategory: menu.item.dishes});
    }

    renderMenuCategory = (menu) => {
        console.log("menuuuuuuuuuuuuuu", menu)
        return (
          <View style= {styles.suggestionTagContainer}>
            <Text 
              style={styles.suggestionTag}
              onPress={() => this._handlePressDishCategory(menu)} 
              >
            {menu.item.category}</Text>
          </View>
        );
    }; 

    renderSelectedDishCategoryDishes = (category) => {
        console.log("selecte dish category============================",category);
        return (
            <View style = {styles.dish}>
              <View style = {styles.dishNameContainer}>
                <Text style ={ styles.dishName }>{category.item.dish_name}</Text></View>
              <View style ={styles.dishPriceContainer}>
                <Text style ={ styles.dishPrice }>{category.item.dish_price}</Text></View>
            </View>
          );
    };

    render(){
        const { selectedRestaurant } = this.props;
        return(
           
            <ScrollView>
            <View style = {styles.main}>
            <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
            />
            <View style ={styles.name}><Text style ={styles.nameText}>{selectedRestaurant.restaurant_name}</Text></View>
            
            <View style={ styles.imageRow}>
             <Image style={styles.image} source = {{uri: selectedRestaurant.images[0] }} />
             <Image style={styles.image} source = {{uri: selectedRestaurant.images[1] }} />
             <Image style={styles.image} source = {{uri: selectedRestaurant.images[2] }} />
            </View>
            <View style ={styles.locality}><Text style = {styles.localityText}>Locality: {selectedRestaurant.address.locality}</Text></View>
            <View style ={styles.locality}><Text style = {styles.localityText}>Contact: {selectedRestaurant.phone_number}</Text></View>
            <View style ={styles.locality}><Text style = {styles.localityText}>Cost for two: {selectedRestaurant.avg_cost_for_two}</Text></View>

            <TouchableOpacity onPress={this._onMenuClicked}>
             <View style={styles.menuButton}>
               <Text style ={styles.menuText}>
                 Menu
               </Text>
             </View>
           </TouchableOpacity> 
           <View style={styles.menuContainer}>
           {this.props.menuLoading ? <Text>Loading...</Text>
                    :<FlatList
                 horizontal={true}
                 //style={{flex:1, margin: 4}}
                 keyExtractor={(item, index) => index}
                 data={this.props.menu}
                 renderItem={this.renderMenuCategory} 
                 showsHorizontalScrollIndicator={false}/>
           }
            </View> 
            <View>
            {(this.state.selectedDishCategory) && <FlatList
                    style= {styles.menu}
                    data = { this.state.selectedDishCategory }
                    keyExtractor={(item, index) => index}
                    renderItem = {this.renderSelectedDishCategoryDishes}
            />}
            </View>
           </View>  
           </ScrollView>
        );
    }
}

const styles = {
    main: {
        flex:1,
    },
    name: {
        backgroundColor: '#fff',
        elevation: 4,
        marginRight: 10,
        marginTop:30,
        marginLeft:10,
        marginBottom:10,
        height: 46, 
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        justifyContent: 'center',
        
    },
    nameText: {
        textAlign: 'center',
        fontFamily: 'open-sans-semibold',
        fontSize: 20,
    },
    locality: {
        backgroundColor: '#fff',
        marginRight: 10,
        marginTop:5,
        marginLeft:10,
        //marginBottom:10,
        //height: 25, 
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
    },
    localityText: {
        //textAlign: 'center',
        paddingLeft: 10,
        fontFamily: 'open-sans-regular',
        fontSize: 15,
    },
    imageRow: {
        flexDirection: 'row'
    },
    image: {
        //elevation: 5,
        width: 100,
        height: 100,
        margin: 10,
    },
    menuButton: {
        backgroundColor: '#fff',
        marginRight: 10,
        marginTop:10,
        marginLeft:10,
        //marginBottom:10,
        height: 25, 
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
    },
    menuText: {
        textAlign: 'center',
        fontFamily: 'open-sans-semibold',
        fontSize: 18,
    },
    menu : {
        //backgroundColor: '#673ab7',
    },
    dish : {
        backgroundColor: '#fff',
        // borderTopLeftRadius:4,
        // borderTopRightRadius:4,
        // borderBottomLeftRadius:4,
        // borderBottomRightRadius:4,
        marginTop: 2,
        marginLeft: 10,
        marginRight: 10,
    },
    dishNameContainer :{

    },
    dishPriceContainer : {

    },
    dishName: {
        fontFamily: 'open-sans-regular',
        fontSize: 14,
        paddingLeft: 10,
    },
    dishPrice: {
        fontFamily: 'open-sans-regular',
        fontSize: 12,
        paddingLeft: 10,
        
    },
    searchBarContainer :{
        marginTop:20
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
}

const mapStateToProps = (state) => ({
    restaurants: state.restaurants.restaurants,
    restaurantsLoading: state.restaurants.restaurantsLoading,
    restaurantsError: state.restaurants.restaurantsError,
    selectedRestaurantId : state.restaurants.selectedRestaurantId,
    selectedRestaurant : state.restaurants.selectedRestaurant,
    menu: state.menu.menu,
    menuLoading: state.menu.menuLoading,
    menuError: state.menu.menuError,
})

export default connect(mapStateToProps)(RestaurantDetails) ;