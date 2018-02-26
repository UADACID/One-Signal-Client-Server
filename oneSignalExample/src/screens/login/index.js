/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
// import firebase from 'react-native-firebase';
import OneSignal from 'react-native-onesignal';

import { doLogin } from '../../actions'
import CustomAnimatedTransition from '../../components/customAnimatedTransition'

const { width, height } = Dimensions.get('window')

class Login extends Component {

  static navigationOptions = { title: 'Register', header: null };

  state = {
    email : 'pratama99@gmail.com',
    password : '1qaz2wsx',
    loading : false
  }

  onLoginPress = async() => {
    this.setState({loading:true})
    // OneSignal.setSubscription(true);
    try {
      await this.props.doLogin({email:this.state.email, password:this.state.password, pushToken:this.props.DeviceInfo.pushToken, userId: this.props.DeviceInfo.userId})
      this.setState({loading:false})
    } catch (e) {
      this.setState({loading:false})
    }

  }

  onRegisterPress = () => {
    this.props.navigation.navigate('Register')
  }

  onChangeEmail = (email) => {
    this.setState({email})
  }

  onChangePassword = (password) => {
    this.setState({password})
  }

  render() {
    return (
      <CustomAnimatedTransition duration={200} type='modal'>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputName}
          onChangeText={this.onChangeEmail}
          value={this.state.email}
          placeholder='Email Address'
        />
        <TextInput
          style={styles.textInputName}
          onChangeText={this.onChangePassword}
          value={this.state.password}
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={this.onLoginPress}>
          <Text style={styles.textLogin}>LOGIN</Text>
          {this.state.loading ?<ActivityIndicator color='#ffffff'/> : false }
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={this.onRegisterPress}>
          <Text style={styles.textRegister}>Register Here</Text>
        </TouchableOpacity>
      </View>
      </CustomAnimatedTransition>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doLogin : (payload) => doLogin(payload, dispatch)
})

const mapStateToProps = state => {
  console.log(state);
  return {
    DeviceInfo : state.DeviceInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#e34c51',
    padding: 10,
    justifyContent: 'center',
    width: width / 1.5
  },
  textLogin : {
    color: '#ffffff',
    padding: 2
  },
  buttonRegister : {
    position: 'absolute',
    bottom : 20,
  },
  textRegister : {
    color: '#0073b2'
  }
});
