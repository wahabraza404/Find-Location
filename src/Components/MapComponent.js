import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, AnimatedRegion} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      mapRegion: {
        latitude: 30.0,
        longitude: 70.0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      lastPosition: 'unknown',
    };
  }
  watchID: ?number = null;
  componentDidMount() {
    this.requestLocationPermission().then(r => {});
  }
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This App needs access to your location ' +
            'so we can know where you are.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use locations ' + granted);
        Geolocation.getCurrentPosition(
          position => {
            let lat = parseFloat(position.coords.latitude);
            let long = parseFloat(position.coords.longitude);

            let initialRegion = {
              latitude: lat,
              longitude: long,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            };
            console.log(initialRegion);
            this.setState(
              {
                initialPosition: initialRegion,
                latitude: lat,
                longitude: long,
              },
              () => {
                this.goToInitialLocation(initialRegion);
              },
            );

            this.watchID = Geolocation.watchPosition(position => {
              const lastPosition = JSON.stringify(position);
              this.setState({lastPosition});
            });
          },
          error => alert(JSON.stringify(error.message)),
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          },
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
  goToInitialLocation(initialPosition) {
    this.mapView.animateToRegion(initialPosition, 2000);
  }
  renderScreen = () => {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          ref={ref => (this.mapView = ref)}
          zoomEnabled={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.initialPosition}>
          {!!this.state.latitude && !!this.state.longitude && (
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              title={'Your Location'}
            />
          )}
        </MapView>
      </View>
    );
  };

  render() {
    return this.renderScreen();
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapComponent;
