import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import firebase from 'react-native-firebase';
import style from './style';
import AsyncStorage from '@react-native-community/async-storage';
import Database from '../../Database';
const db = new Database();
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      errorMessage: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('Login').then(response => {
      console.log(response);
      if (JSON.parse(response) === true) {
        this.props.navigation.navigate('Location_stack');
      }
    });
  }
  validateEmail() {
    let re = /\S+@\S+\.\S+/;
    return re.test(this.state.email);
  }
  handleSignUp = () => {
    if (this.state.password !== '' && this.state.email !== '') {
      let response = this.validateEmail();
      if (response) {
        AsyncStorage.multiSet(
          [['email' + this.state.email, JSON.stringify(this.state.password)]],
          () => {
            this.props.navigation.navigate('Login');
          },
        );
      } else {
        alert('Invalid Email or password');
      }
    } else {
      alert('Please fill all requirments');
    }
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.Title_text}>Sign Up</Text>

        <TextInput
          style={style.textInput}
          underlineColorAndroid="transparent"
          placeholder="Full Name"
          placeholderTextColor="#222222"
          autoCapitalize="none"
          value={this.state.name}
          onChangeText={text => this.setState({name: text})}
        />
        <TextInput
          style={style.textInput}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#222222"
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={text => this.setState({email: text})}
        />

        <TextInput
          style={style.textInput}
          secureTextEntry
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#222222"
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={text => this.setState({password: text})}
        />
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            this.handleSignUp();
          }}>
          <Text style={style.button_text}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{marginVertical: 20}}>
          <Text>
            {' '}
            Already have a account?{' '}
            <Text
              onPress={() => this.props.navigation.navigate('Login')}
              style={{color: '#395FED', fontSize: 15}}>
              {' '}
              Sign In{' '}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
