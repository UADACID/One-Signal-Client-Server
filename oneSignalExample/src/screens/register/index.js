/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'

const { width, height } = Dimensions.get('window')

class Register extends Component {

  static navigationOptions = { title: "Registration Page"};

  state = {
    email : '',
    password : ''
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  onRegisterPress = () => {
    axios({
      method: 'post',
      url: 'http://192.168.43.158:3000/users/login',
      data: {
        email,
        password,
        pushToken,
        userId
      }
    }).then(res => {
      console.log(res);
      if (!res.data.succes) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        resolved(true)
      }else{
        resolved(true)
        dispatch({type:"SET_USER_DATA", payload:email})
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        dispatch(resetAction);
      }
    }).catch(err => {
      console.log(err);
      rejected(true)
      ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
    })
  })
  }

  onChangeEmail = (email) => {
    this.setState({email})
  }

  onChangePassword = (password) => {
    this.setState({password})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputName}
          onChangeText={this.onChangeEmail}
          placeholder='Email Address'
        />
        <TextInput
          style={styles.textInputName}
          placeholder='Password'
          onChangeText={this.onChangePassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={this.onLoginPress}>
          <Text style={styles.textLogin}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={this.onBackPress}>
          <Text style={styles.onBackPress}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    nav : state.nav,
    DeviceInfo : state.DeviceInfo
  }
}

export default connect(mapStateToProps)(Register)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  textInputName : {
    width: width / 1.5
  },
  buttonLogin : {
    margin: 20,
    backgroundColor: '#0073b2',
    padding: 10,
    alignItems: 'center',
    width: width / 1.5
  },
  textLogin : {
    color: '#ffffff'
  },
  buttonBack : {
    position: 'absolute',
    bottom : 20,
    padding: 20
  },
  textRegister : {
    color: '#0073b2'
  }
});
