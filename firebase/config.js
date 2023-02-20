// import * as firebase from "firebase/app";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCz3FWylGiSA7eSgzSRH1T3AMNuhR6bWPI",
//   authDomain: "reactnativeproject-83bb5.firebaseapp.com",
//   databaseURL: "https//reactnativeproject-83bb5.firebaseio.com",
//   projectId: "reactnativeproject-83bb5",
//   storageBucket: "reactnativeproject-83bb5.appspot.com",
//   messagingSenderId: "229877239810",
//   appId: "1:229877239810:web:25fa1186bec7288555171b",
//   measurementId: "G-MNQZQYKFQ2",
// };

// export default firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// export { auth };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
/////////////////////////////////////////////////////////////////////////////////////////

import * as firebase from "firebase/app";
// import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import "firebase/auth";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCz3FWylGiSA7eSgzSRH1T3AMNuhR6bWPI",
  authDomain: "reactnativeproject-83bb5.firebaseapp.com",
  projectId: "reactnativeproject-83bb5",
  storageBucket: "reactnativeproject-83bb5.appspot.com",
  messagingSenderId: "229877239810",
  appId: "1:229877239810:web:25fa1186bec7288555171b",
  measurementId: "G-MNQZQYKFQ2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
