import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import { postUserSignIn } from '../actions/user.action';
import { User } from '../data/Records';

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            < ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Login
                </Text>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Username"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this._handleUsername} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this._handlePassword} />

                <View style={{ margin: 7 }} />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this._login(this.state.username, this.state.password)
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </ScrollView >
        );
    }

    _handleUsername = (text) => {
        console.log(text, 'text--------')
        this.setState({ username: text })
        console.log(this.state.username);
    }

    _handlePassword = (text) => {
        this.setState({ password: text })
        console.log(this.state.password);
    }

    _login = (username, password) => {
        console.log("login clicked-------");
        console.log('username----', username, 'password------', this.state.password);
        this.props.dispatch(postUserSignIn(
            new User({
                email: this.state.username,
                password: this.state.password
            })
        )).then(res => {
            console.log('res------', res)
            if (res.token) {
                //console.log(this.props.user, 'user')
                this.props.navigation.navigate('home');
            } else {
                alert(res.error);
            }
        }).catch(err => {
            alert(err)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
});

const mapStateToProps = (state) => ({
    user: state.user.user,
    loading: state.user.loading,
    error: state.user.error
});
export default connect(mapStateToProps)(SignInScreen);