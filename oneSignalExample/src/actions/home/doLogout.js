import { ToastAndroid } from 'react-native'
import { NavigationActions } from 'react-navigation'
import axios from 'axios'

export default doLogout = (payload, dispatch) => {
  
  return new Promise((resolved, rejected) => {
    const { email, pushToken } = payload

    axios({
      method: 'post',
      url: 'http://192.168.43.158:3000/users/logout',
      data: {
        email,
        pushToken,
      }
    }).then(res => {
      console.log(res);
      if (!res.data.succes) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        resolved(true)
      }else{
        resolved(true)
        dispatch({type:"REMOVE_USER_DATA"})
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
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
