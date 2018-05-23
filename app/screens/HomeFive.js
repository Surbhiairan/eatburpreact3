import React, { Component } from 'react';
import { View, 
        StyleSheet, 
        Text, 
        Image, 
        TouchableNativeFeedback, 
        FlatList, 
        TouchableOpacity,
        StatusBar
    } from 'react-native';
import SearchBarWhite from '../components/SearchBar/SearchBarWhite';
import SearchBarPinterest from '../components/SearchBar/SearchBarPinterest';
import CategoryButton from '../components/CategoryButton/CategoryButton';
import {Constants} from 'expo';
import { connect } from 'react-redux';
import { fetchRestaurants, fetchRestaurantsSuccess, fetchRestaurantsFailure, selectRestaurantForDetails, selectedRestaurantDetails} from '../actions/restaurants.action';

class MyListItem extends React.PureComponent {
    _onPress = () => {
      //console.log('item----------', this.props.item)
      this.props.onPressItem(this.props.item);
    };
  
    render() {
      const textColor = this.props.selected ? "red" : "black";
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style= {{
            backgroundColor: '#fff',
            marginTop:10,
            marginLeft: 10,
            marginRight: 10,
            elevation: 5,
          }}>
          <Text style={{ 
              fontFamily: 'open-sans-regular',
              fontSize: 10,
              paddingTop:5,
              paddingLeft: 10,
              color: '#673ab7' }}>
              {this.props.category}
            </Text>
            <Text style={{ 
              fontFamily: 'open-sans-regular',
              fontSize: 20,
              paddingTop:2,
              paddingLeft: 10,
              color: '#34495e' }}>
              {this.props.name}
            </Text>
            <Text style={{ 
              fontFamily: 'open-sans-light',
              fontSize: 15,
              //paddingTop:5,
              paddingLeft: 8,
              color: '#800000' }}>
              {this.props.famous_dishes}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

class HomeFive extends Component {

    state = {selected: (new Map(): Map<string, boolean>)};

    componentDidMount() {
        this.props.dispatch(fetchRestaurants());
    }

    _handlePressSearch() {
       console.log('search pressed');
       this.props.navigation.navigate('searchList');
    };

    _onPressItem = (item) => {
        console.log("iddddddddddddd",item);
        //dispatch function to set selected restaurant
        //this.props.dispatch(selectRestaurantForDetails(id));
        this.props.dispatch(selectedRestaurantDetails(item));
        
        this.props.navigation.navigate('restaurantDetails');
      // updater functions are preferred for transactional updates
      // this.setState((state) => {
      //   // copy the map rather than modifying state.
      //   const selected = new Map(state.selected);
      //   selected.set(id, !selected.get(id)); // toggle
      //   return {selected};
      // });
    };

    _renderItem = ({item}) => (
      <MyListItem
        id={item._id}
        item= {item}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        name={item.restaurant_name}
        famous_dishes = {item.famous_dishes}
        category = {item.category}

      />
    );

    SampleFunction=()=>{
      
      // Write your own code here, Which you want to execute on Floating Button Click Event.
      Alert.alert("Floating Button Clicked");
      
    }
    
    render(){
        return(
           
            <View style = {styles.main}>
            <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
            />
            <View style = {styles.searchBarContainer}>
            <SearchBarPinterest 
            onPress={() => this._handlePressSearch()} />
            </View>
            {this.props.restaurantsLoading ? <Text>Loading...</Text>
            :<FlatList 
                data={this.props.restaurants}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem} 
            />
            }
            <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
 
            <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
          
            style={styles.FloatingButtonStyle} />
       
            </TouchableOpacity>
            </View> 
                  
                    
        );
    }
}

const styles = {
    main: {
        flex:1,
        //backgroundColor: '#E6E6E6',     grey
        backgroundColor: '#ffffff'
    },
    searchBarContainer :{
        marginTop:20
    },
    TouchableOpacityStyle:{
         position: 'absolute',
         width: 50,
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
         right: 30,
         bottom: 30,
    },
    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
    }
  
}

const mapStateToProps = (state) => ({
    restaurants: state.restaurants.restaurants,
    restaurantsLoading: state.restaurants.restaurantsLoading,
    restaurantsError: state.restaurants.restaurantsError,
})

export default connect(mapStateToProps)(HomeFive) ;