import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, TouchableOpacity,Text, SwitchNavigator } from 'react-navigation';
import {Platform, StatusBar, View} from 'react-native';

import Home from '../screens/Home';
import HomeOne from '../screens/HomeOne';
import HomeTwo from '../screens/HomeTwo';
import HomeThree from '../screens/HomeThree';
import HomeFour from '../screens/HomeFour';
import AddReview from '../screens/AddReview';
import SearchList from '../screens/SearchList';
import SearchResultsList from '../screens/SearchResultsList';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MyReviews from '../screens/MyReviews';
import HomeFive from '../screens/HomeFive';
import RestaurantDetails from '../screens/RestaurantDetails';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchStack = StackNavigator(
    {
        searchList: {
            screen : SearchList,
        },
        searchResultsList: {
            screen : SearchResultsList,           
        }
    },
        {
            headerMode: 'none',
        }
    
);

const RestaurantStack = StackNavigator(
    {
        restaurantList: {
            screen: HomeFive,
        },
        restaurantDetails :{
            screen: RestaurantDetails,
        }
    },
    {
        headerMode: 'none',
    }
);

const HomeStack = StackNavigator(
    {
        home: {
            screen: RestaurantStack,
        },
        searchSuggestion: {
            screen: SearchStack,
        },
        
    },
    {
        headerMode: 'none',
    }
);

const signed = TabNavigator(
    {
        home: {
            screen : HomeStack,
        },
        map: {
            screen : HomeOne,
        },
        review: {
            screen : AddReview,
        },
        settings: {
            screen : MyReviews,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            
          tabBarLabel: () => {
            const { routeName } = navigation.state;
            let label = routeName;
            if (label === 'home') {
              return 'Home';
            } if(label === 'map'){
              return 'Town Map';
            } if(label === 'review'){
                return 'Review';
            } if(label === 'settings'){
                return 'Me';
            }
          },
          tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            let iconName;                                                                       
            switch (routeName) {
              case 'home':
                iconName = Platform.OS === 'ios' ? 'ios-list' : 'home';
                break;
              case 'map':
                iconName = Platform.OS === 'ios' ? 'ios-map-outline' : 'map-marker';
                break;
              case 'review':
            //   StatusBar.setHidden(false);
            //   StatusBar.setTranslucent(false);
            //   StatusBar.setBackgroundColor('#ff8342');
                iconName = Platform.OS === 'ios' ? 'ios-options-outline' : 'star';
                break;
              case 'settings' :
              
              iconName = Platform.OS === 'ios' ? 'ion-md-star-outline' : 'cog';
            }
            return (
              <Icon
                name={iconName}
                size={Platform.OS === 'ios' ? 30 : 27}
                style={{ marginBottom: -3 }}
                color={focused ? '#0d47a1' : '#A9A9A9'}
                //color={focused ? '#0d47a1' : '#fff'}  //default white select blue
                //color={focused ? '#fff' : '#A9A9A9'} default grey select white
                //color='#fff'                    //tab icon color

              />
            );
          },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: '#fff',
        borderTopColor: '#fff',
        //backgroundColor: '#E6E6E6', grey
        //borderTopColor: '#E6E6E6',
        height:60,
        padding: 8
      },
     
    },
  }
);

const signedOut = TabNavigator(
    {
        SignUp: {
            screen: SignUp,
        },
        SignIn: {
            screen: SignIn,
        }
    },
    {
        navigationOptions: ({ navigation }) => ({

            tabBarLabel: () => {
                const { routeName } = navigation.state;
                let label = routeName;
                if (label === 'SignUp') {
                    return 'Sign Up';
                } if (label === 'SignIn') {
                    return 'Sign In';
                }
                return (
                    <Text
                        name={label}
                        size={Platform.OS === 'ios' ? 30 : 27}
                        style={{ marginBottom: -3 }}
                        color={focused ? '#0d47a1' : '#A9A9A9'}
                    //color={focused ? '#0d47a1' : '#fff'}  //default white select blue
                    //color={focused ? '#fff' : '#A9A9A9'} default grey select white
                    //color='#fff'                    //tab icon color

                    />
                );
            }
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        tabBarOptions: {
            style: {
                backgroundColor: '#fff',
                borderTopColor: '#fff',
                //backgroundColor: '#E6E6E6', grey
                //borderTopColor: '#E6E6E6',
                height: 60,
                padding: 8
            },

        },
    }
);

    const SignedIn = StackNavigator(
        {
            signed: {
                screen : signed,
            }
        },
        {
            headerMode: 'none',         //to remove a top title bar
            // cardStyle: {
            //     //to fix the status/notification bar and avoid overlapping with coomponents
            //     paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
                
            //   }
            
        }
    );

export  const SignedOut = StackNavigator(
    {
        signedOut: {
            screen: signedOut,
        }
    },
    {
        headerMode: 'none',         //to remove a top title bar
    }
);


export const createRootNavigator = (signedIn = false) => {
    console.log('signedIn------------', signedIn);
    return SwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};