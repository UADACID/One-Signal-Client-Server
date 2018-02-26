import * as firebase from "firebase";

class Firebase {

  static initialise(){
    firebase.initializeApp({
      apiKey: "AIzaSyB8JDLL_hXjRxMKjAnP4g3QTWxDCIUDLRU",
      authDomain: "crud-1e50d.firebaseapp.com",
      databaseURL: "https://crud-1e50d.firebaseio.com",
      projectId: "crud-1e50d",
      storageBucket: "crud-1e50d.appspot.com",
      messagingSenderId: "323452459662"
    });
  }
}



export default Firebase
