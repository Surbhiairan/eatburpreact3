import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, ImageBackground, TouchableHighlight } from 'react-native'

import SearchBarPinterest from '../components/SearchBar/SearchBarPinterest';


const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
    'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/8758/food-dinner-lemon-rice.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/52539/cream-puffs-delicious-france-confectionery-food-52539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
]

export default class Cuisines extends Component {

  numItems = images.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

render() {
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      console.log(image, i)
      const thisImage = (
        <ImageBackground
          key={`image${i}`}
          source={{uri: image}}
          style={{ width: deviceWidth }}
        >
        <SearchBarPinterest />
        <View style ={{
            marginTop: 10,
            marginLeft: 20,

        }}><Text style={{
            color: '#fff',
            fontFamily: 'open-sans-semibold',
            fontSize: 20,
        }}>Spring Rolls</Text>
        <Text style={{
            color: '#fff',
            fontFamily: 'open-sans-semibold',
            fontSize: 15,
        }}>Cafe Mocha</Text>
        </View>
        <View style = {{ 
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 350,
                  }}>
               <View>
               <TouchableHighlight onPress={this.props.onPress} style={ styles.imageNotSelectedContainer }>
                    <Image 
                    style={ styles.imageNotSelected } 
                    source={require('../assets/icons/fire.png')}  
                    />
                </TouchableHighlight> 
                <Text onPress={this.onPressTab} style={styles.tabText}>Near Me</Text></View>
                <View>
               <TouchableHighlight onPress={this.props.onPress} style={ styles.imageContainer }>
                    <Image 
                    style={ styles.image } 
                    source={require('../assets/icons/fire.png')}  
                    />
                </TouchableHighlight> 
                <Text onPress={this.onPressTab} style={styles.tabText}>Trending</Text></View>
                <View>
               <TouchableHighlight onPress={this.props.onPress} style={ styles.imageNotSelectedContainer }>
                    <Image 
                    style={ styles.imageNotSelected } 
                    source={require('../assets/icons/fire.png')}  
                    />
                </TouchableHighlight> 
                <Text onPress={this.onPressTab} style={styles.tabText}>Review</Text></View>
                
                </View>
                
            
        </ImageBackground>
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View
        style={styles.container}
        flex={1}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >
        
          {imageArray}

        </ScrollView>
        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  imageNotSelectedContainer: {
    backgroundColor:'#fff',
    height:50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
},
imageNotSelected: {
    height:25,
    width: 25,
},
imageContainer: {
    backgroundColor:'#fff',
    height:60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:5,
  },
  image: {
    height:30,
    width: 30,
    
  },
  tabText :{
    fontSize: 16,
    fontFamily: 'open-sans-regular',
    color: '#fff',

}
})

