/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux'
import { ToastAndroid } from 'react-native'
import { NavigationActions } from 'react-navigation'

import OneSignal from 'react-native-onesignal';
import AppWithNavigationState from './src/navigator'


class App extends Component<Props> {

  constructor(){
    super()
    // OneSignal.setSubscription(true);
  }

  componentWillMount() {
        OneSignal.inFocusDisplaying(2);
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
  }

  componentDidMount(){
    // OneSignal.getPermissionSubscriptionState((status) => {
    //   console.log(status);
    // });
  }

  onReceived(notification) {
      console.log("Notification received: ", notification);
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    ToastAndroid.show('navigate to ....', ToastAndroid.SHORT);
    this.props.redirect()
  }

  onIds = (device) => {
	   console.log('Device info: ', device);
     if (device.pushToken != null) {
       device.isSubscribe = true
       this.props.onGetDeviceInfo(device)
     }else{
       device.isSubscribe = false
       this.props.onGetDeviceInfo(device)
     }

  }

  render() {
    return (
        <AppWithNavigationState />
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDeviceInfo : (payload) => dispatch({type:'ON_GET_DEVICE_INFO', payload}),
    redirect : () => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      dispatch(resetAction);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
});
