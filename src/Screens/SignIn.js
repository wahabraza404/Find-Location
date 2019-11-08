import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import style from './style';
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSignUp = () => {
    AsyncStorage.multiGet(['email' + this.state.email]).then(response => {
      let value = JSON.parse(response[0][1]);
      if (value !== null) {
        if (value === this.state.password) {
          AsyncStorage.setItem('Login', JSON.stringify(true)).then(() => {
            this.props.navigation.navigate('Location_stack');
          });
        } else {
          alert('Invalid email or password');
        }
      } else {
        alert('Invalid email or password');
      }
    });
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.Title_text}>Sign In</Text>

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
          <Text style={style.button_text}>Sign In</Text>
        </TouchableOpacity>
        <View style={{marginVertical: 15}}>
          <Text>
            {' '}
            Don't have an account?{' '}
            <Text
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={{color: '#395FED', fontSize: 15}}>
              {' '}
              Sign Up{' '}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
