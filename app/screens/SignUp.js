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

import { postUserSignUp } from '../actions/user.action';
import { User } from '../data/Records';

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
        }
    }

    render() {
        return (
            < ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Sign Up
                </Text>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="email"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this._handleEmail} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this._handlePassword} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Confirm Password"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this._handleConfirmPassword} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="First Name"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this._handleFirstName} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Last Name"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this._handleLastName} />

                <View style={{ margin: 7 }} />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this._login(
                            this.state.emil, 
                            this.state.password,
                            this.state.confirmPassword,
                            this.state.firstName,
                            this.state.lastName
                         )
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </ScrollView >
        );
    }

    _handleEmail = (text) => {
        console.log(text, 'text--------')
        this.setState({ email: text })
        console.log(this.state.email);
    }

    _handlePassword = (text) => {
        this.setState({ password: text })
        console.log(this.state.password);
    }

    _handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
        console.log(this.state.confirmPassword);
    }

    _handleFirstName = (text) => {
        this.setState({ firstName: text })
        console.log(this.state.firstName);
    }

    _handleLastName = (text) => {
        this.setState({ lastName: text })
        console.log(this.state.lastName);
    }

    _login = (email, password, confirmPassword, firstName, lastName) => {
        console.log("login clicked-------");
        console.log('username----', email, 'password------', this.state.password);
        this.props.dispatch(postUserSignUp(
            new User({
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
        )).then(res => {
            console.log('res------', res)
            if (res.success) {
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

export default connect()(SignUpScreen);