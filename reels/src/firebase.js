import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
firebase.initializeApp({
  apiKey: "AIzaSyCto7ciwWPLXTKZQZTmWWfEPK9j8wE_iNs",
  authDomain: "hallowed-pager-244303.firebaseapp.com",
  databaseURL: "https://hallowed-pager-244303-default-rtdb.firebaseio.com",
  projectId: "hallowed-pager-244303",
  storageBucket: "hallowed-pager-244303.appspot.com",
  messagingSenderId: "384342625329",
  appId: "1:384342625329:web:8c43bfb4c13e50250d9910",
  measurementId: "G-9T50MVDQQR"
})
export const auth = firebase.auth()
const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  comments: firestore.collection('comments'),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  }
}
export const storage = firebase.storage();
export default firebase