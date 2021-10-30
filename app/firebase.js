import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCq02l2fb2uxL8plLneP-s1Dat2v7oIpBw',
  authDomain: 'ait-2do.firebaseapp.com',
  projectId: 'ait-2do',
  storageBucket: 'ait-2do.appspot.com',
  messagingSenderId: '185691549689',
  appId: '1:185691549689:web:0121665dcfdf43188bd728',
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const fbAuth = firebase.auth();
const fbFirestore = firebase.firestore();

export { fbAuth, fbFirestore };
