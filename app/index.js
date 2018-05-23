import React from 'react';
//import EStyleSheet from 'react-native-extended-stylesheet';

import Home from './screens/Home';
import HomeOne from './screens/HomeOne';
import HomeTwo from './screens/HomeTwo';

//import RootNavigation from './navigation/RootNavigation';
//import AuthenticationScreen from './navigation/AuthenticationScreen';
import {createRootNavigator} from './navigation/RootNavigation';
import {Drawer} from './navigator';
import { Font, AppLoading } from "expo";
import deviceStorage from "./services/storage.service";
//import './reducers';

//after creating store-> this hooks redux 
import { Provider } from 'react-redux';
import store from './store/store';

/* EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
});
 */
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      jwt: null,
      checkedSignIn: false

    };

    /* deviceStorage.loadJWT()
      .then(
        (token => {
          //console.log(token);
          console.log('token----------', token);
          this.setState({ jwt: token });
          console.log('state here------------', this.state);

        })
      ); */
    /* this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this); */
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
      'pacifico-regular' : require('./assets/fonts/Pacifico-Regular.ttf'),
      'open-sans-regular' : require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-semibold' : require('./assets/fonts/OpenSans-Semibold.ttf'),
    });
    this.setState({ loading: false });
    console.log('inside here---------')
    deviceStorage.isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert(err));
    
    //deviceStorage.deleteJWT();
  }

  render(){
    if (this.state.loading) {
      return(
        <AppLoading />
      );
    }
    const { checkedSignIn, signedIn } = this.state;
    console.log('here-------------', signedIn)
    const Layout = createRootNavigator(signedIn);
   
    return (
      <Provider store = { store } >
        <Layout />
      </Provider>
        //<Drawer />
      
    );
  }
}

//export default () => <RootNavigation />;