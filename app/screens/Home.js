import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, ImageBackground, Image, Platform } from 'react-native';
import SearchBarPinterest from '../components/SearchBar/SearchBarPinterest';
import SearchBarWhite from '../components/SearchBar/SearchBarWhite';
import CategoryButton from '../components/CategoryButton/CategoryButton';
import {Constants} from 'expo';
import food from '../data/food';

class Home extends Component {

state={
    foodData: food
}
    _renderItem({ item, index }) {
        
        if (index === 0) {
        return (
            <View style={styles.firstListComponent}>
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
            else if (index === 3) {
                return (
                    <View style={styles.fourListComponent}>
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
            else if (index === 4) {
                return (
                    <View style={styles.fiveListComponent}>
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
        else if (index === (5)) 
        return (
            <View style={styles.lastListComponent}>
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
        );
    //     else return (
    // <View style={styles.listComponent}>
    //     <View style={styles.imageContainer}>
    //         <Image style={styles.image}
    //             resizeMode="cover"
    //             source={require('../assets/images/lasagna.jpg')}>                              
    //         </Image>
    //     </View>
    //     <View style= {styles.content}>
    //     <Text style= {styles.foodName}>
    //         {item.name}
    //     </Text>
    //     <Text style= {styles.placeName}>
    //         {item.bestAt}
    // </Text>
    // </View>
    // </View>
    // );
    }

    render(){
        return(
            <View style = {styles.main}>
            <SearchBarWhite />
            <FlatList style= {styles.list}
                data={this.state.foodData}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
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
   list:{
       //backgroundColor: '#fff',
       borderTopLeftRadius:4,
       borderTopRightRadius:4,
       borderBottomLeftRadius:4,
       borderBottomRightRadius:4,
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
    borderTopLeftRadius:4,
    borderTopRightRadius:4,
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    //backgroundColor: '#560764',
    backgroundColor: '#00649f',
    padding: 5, 
   },
   twoListComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    //backgroundColor: '#913175',
    backgroundColor: '#01aac1',
    padding: 5, 
   },
   threeListComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    //backgroundColor: '#DD5B82',
    backgroundColor: '#00dbe7',
    padding: 5, 
   },
   fourListComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    //backgroundColor: '#FE9797',
    backgroundColor: '#97ecc5',
    padding: 5, 
   },
   fiveListComponent: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
  //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    backgroundColor: '#c6f1e7',
    padding: 5, 
   },
   lastListComponent :{
    flexDirection: 'row',
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
    borderBottomColor: '#e5e5e5',
    //borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,    
    backgroundColor: '#c7f3ff',
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
export default Home;