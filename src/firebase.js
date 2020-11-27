import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyBz7hUudsUEzpjD9lbVAM5v8uvwioFV6wA",
  authDomain: "hamsterism-bdf70.firebaseapp.com",
  databaseURL: "https://hamsterism-bdf70.firebaseio.com",
  projectId: "hamsterism-bdf70",
  storageBucket: "hamsterism-bdf70.appspot.com",
  messagingSenderId: "69373049784",
  appId: "1:69373049784:web:b52708facf8da808882d4d",
  measurementId: "G-TGCT6JSPD6",
};
// utils
const fb = firebase.initializeApp(firebaseConfig);
// const db = firebase.initializeApp(firebaseConfig).database();
// const auth = firebase.auth();

//不知為啥平常的export、import在這裡會出bug
//"export 'default' (imported as 'db') was not found in '../../firebase.js'
// export utils/refs
export default fb;
