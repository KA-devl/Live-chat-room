import firebase from 'firebase/app'
import 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyB_t8YRbTtPUGsO96dD6EEy1fvUzceb5JM",
  authDomain: "vuex4-fb-auth-1dfaa.firebaseapp.com",
  projectId: "vuex4-fb-auth-1dfaa",
  storageBucket: "vuex4-fb-auth-1dfaa.appspot.com",
  messagingSenderId: "673138227650",
  appId: "1:673138227650:web:587483af4f5241247cfe5b",
  measurementId: "G-HW4Z3KN6PP"
};

//init firebase
firebase.intializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp}