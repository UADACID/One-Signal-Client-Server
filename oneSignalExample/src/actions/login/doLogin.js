import { ToastAndroid } from 'react-native'
import { NavigationActions } from 'react-navigation'
import axios from 'axios'

export default doLogin = (payload, dispatch) => {
  console.log('sadsa');
  return new Promise((resolved, rejected) => {
    const { email, password, pushToken, userId } = payload
    console.log({email, password, pushToken, userId});

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

  // return Promise

}
