import React, {Component} from 'react';
import MapComponent from '../Components/MapComponent';

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    title: 'Your Location',
    headerTitleStyle: {
      fontFamily: 'Roboto',
      fontSize: 15,
      marginHorizontal: 20,
    },
    headerStyle: {
      backgroundColor: '#395FED',
    },
    headerTintColor: '#fff',
  };
  render() {
    return <MapComponent />;
  }
}
