import React, {Component} from 'react';
import {View, Text, Alert, BackHandler} from 'react-native';
import style from './style';
import AsyncStorage from '@react-native-community/async-storage';
export default class Main extends Component {
  static navigationOptions = {header: null};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.Title_text}>Welcome, You are logged in </Text>
        <Text
          onPress={() => this.props.navigation.navigate('Location')}
          style={{color: '#395FED', fontSize: 15, marginVertical: 8}}>
          {' '}
          Find your location{' '}
        </Text>
        <Text
          onPress={() => {
            AsyncStorage.setItem('Login', JSON.stringify(false)).then(() => {
              this.props.navigation.navigate('Login');
            });
          }}
          style={{color: '#395FED', fontSize: 15, marginTop: 80}}>
          {' '}
          Log out{' '}
        </Text>
      </View>
    );
  }
}
