import React, {Component} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Pusher from 'pusher-js/react-native';

import Config from 'react-native-config';

import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import axios from 'axios';

const CHANNELS_APP_KEY = Config.CHANNELS_APP_KEY;
const CHANNELS_APP_CLUSTER = Config.CHANNELS_APP_CLUSTER;
const BASE_URL = Config.NGROK_HTTPS_URL;

const GOOGLE_API_KEY = Config.GOOGLE_API_KEY;

import {AppContext} from '../../GlobalContext';

const orderSteps = [
  'Processing your order',
  'Preparing your order',
  'Your order is ready',
];

RNPusherPushNotifications.setInstanceId(Config.BEAMS_INSTANCE_ID);

const subscribeToRoom = room_id => {
  RNPusherPushNotifications.subscribe(
    room_id,
    (statusCode, response) => {
      console.error(statusCode, response);
    },
    () => {
      console.log('Success');
    },
  );
};

class TrackOrder extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Track Order',
    };
  };

  static contextType = AppContext;

  state = {
    isSearching: true,
    isProcessed: false,
    isPrepared: false,
    orderStatusText: orderSteps[0],
  };

  constructor(props) {
    super(props);
  }


  render() {
    const {orderStatusText} = this.state;

    return (
      <View style={styles.wrapper}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{orderStatusText}</Text>

          
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            zoomControlEnabled={true}
            initialRegion={this.customer_location}>

            <MapView.Marker
              coordinate={{
                latitude: this.customer_location.latitude,
                longitude: this.customer_location.longitude,
              }}
              title={'Your location'}
            />

            <MapView.Marker
              coordinate={{
                latitude: this.restaurant_location[0],
                longitude: this.restaurant_location[1],
              }}
              title={'Restaurant location'}
              pinColor={'#4CDB00'}
            />

          </MapView>
        </View>
      </View>
    );
  }
}
//

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
  },
  infoText: {
    marginBottom: 10,
  },
  mapContainer: {
    flex: 9,
  },
  
});

export default TrackOrder;
