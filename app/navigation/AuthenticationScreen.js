import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, TouchableOpacity } from 'react-navigation';
import { Platform, StatusBar, View, Text } from 'react-native';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';


const TabLayout = TabNavigator(
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
                    case 'settings':

                        iconName = Platform.OS === 'ios' ? 'ion-md-star-outline' : 'cog';
                }
                
            },
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

export default StackNavigator(
    {
        tabs: {
            screen: TabLayout,
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
