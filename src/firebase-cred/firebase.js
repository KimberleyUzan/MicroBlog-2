import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBof51U68nLB-JrtmRxPDR2PlcAAHl6DEY",
  authDomain: "microblog-app-kimberley.firebaseapp.com",
  projectId: "microblog-app-kimberley",
  storageBucket: "microblog-app-kimberley.appspot.com",
  messagingSenderId: "81446669590",
  appId: "1:81446669590:web:068b702c0ab913c5469437"
  };

firebase.initializeApp(firebaseConfig)

export default firebase