import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDqGBNqWH4THa1nzmG_6qwJBwDkmwCVvfI',
  authDomain: 'react-hooks-blog-9984e.firebaseapp.com',
  projectId: 'react-hooks-blog-9984e',
  storageBucket: 'react-hooks-blog-9984e.appspot.com',
  messagingSenderId: '1044693948600',
  appId: '1:1044693948600:web:bf7949242ca62408677c4d',
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
