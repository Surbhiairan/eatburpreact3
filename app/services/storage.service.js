import { AsyncStorage } from 'react-native';

export const currentUser_Token = "currentUser_Token";

const deviceStorage = {

    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            console.log('saved----', value)
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    loadJWT() {
        console.log("inside load jwt=================")
         return new Promise((resolve, reject) => {
             AsyncStorage.getItem(currentUser_Token)
                 .then(res => {
                     console.log('res=============================', res)
                     if (res !== null) {
                         resolve(res);
                     } else {
                         resolve(false);
                     }
                 })
                 .catch(err => reject(err));
         });
    },

     isSignedIn() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(currentUser_Token)
                .then(res => {
                    console.log(res)
                    if (res !== null) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => reject(err));
        });
    },

    async deleteJWT() {
        try {
            await AsyncStorage.removeItem('currentUser_Token')
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }

};
export default deviceStorage;
