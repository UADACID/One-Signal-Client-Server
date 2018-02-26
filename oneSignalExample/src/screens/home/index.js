/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
// import firebase from 'react-native-firebase'
import { NavigationActions } from 'react-navigation'
import { doLogout } from '../../actions'
import CustomAnimatedTransition from '../../components/customAnimatedTransition'

const { width, height } = Dimensions.get('window')


class Home extends Component {

  // static navigationOptions = navigationOption(this.onLogoutPress);
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const func = () => alert('not yet');
    const onLogoutPress = params.onLogoutPress || func

    return {
      headerTitle: 'Home',
      headerRight: (
        <Button onPress={onLogoutPress} title="logout" color="gray" />
      ),
    };
  };

  state = {
    loading : false
  }

  componentWillMount() {
    this.props.navigation.setParams({ onLogoutPress: this.onLogoutPress });
  }

  onLogoutPress = async() => {
    this.setState({loading:true})
    try {
      await this.props.doLogout({email:this.props.user.email, pushToken:this.props.DeviceInfo.pushToken, })
      this.setState({loading:false})
    } catch (e) {
      this.setState({loading:false})
    }

  }

  render() {
    return (
      <CustomAnimatedTransition duration={200}>
        <View style={styles.container}>
          <Text>Hello {this.props.user.email}</Text>
          {this.state.loading ? <ActivityIndicator /> : false}
        </View>
      </CustomAnimatedTransition>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doLogout : (payload) => doLogout(payload, dispatch)
})

const mapStateToProps = state => {
  console.log(state);
  return {
    DeviceInfo : state.DeviceInfo,
    user: state.UserReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


// "metadata":{
//   "lastSignInTime":1519533722000,
//   "creationTime":1519490884000},
//   "providerData":[
//       {
//         "email":"pratama@gmail.com",
//         "photoURL":null,
//         "phoneNumber":null,
//         "displayName":null,
//         "uid":"pratama@gmail.com",
//         "providerId":"password"
//       }
//     ],
//   "photoURL":null,
//   "phoneNumber":null,
//   "displayName":null,
//   "email":"pratama@gmail.com",
//   "isAnonymous":false,
//   "emailVerified":false,
//   "providerId":"firebase",
//   "uid":"Rr7znpvy9zUmGWCBAEKMej60Tjk1"
// }
