// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/auth';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyBiDu9k0IgbqyNv_gOhWwPsYrVf9qkIkao',
//   authDomain: 'projeto-teste-agr-vai.firebaseapp.com',
//   databaseURL: 'https://projeto-teste-agr-vai.firebaseio.com',
//   projectId: 'projeto-teste-agr-vai',
//   storageBucket: 'projeto-teste-agr-vai.appspot.com',
//   messagingSenderId: '74721658872',
//   appId: '1:74721658872:web:89970c250693193eecf80d',
// };
// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();
// const firestore = firebase.firestore();
// const auth = firebase.auth();

// export { firebase, storage, firestore, auth, app };

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/auth';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();
// const firestore = firebase.firestore();
// const auth = firebase.auth();

// export { firebase, storage, firestore, auth, app };

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();

export { firebase, storage, firestore, auth, app };
