// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCOvKWdfNmo0UxjB628Go-gndONcb4au3g",
    authDomain: "farmers-51872.firebaseapp.com",
    projectId: "farmers-51872",
    storageBucket: "farmers-51872.appspot.com",
    messagingSenderId: "792318949488",
    appId: "1:792318949488:web:a5849d3f16236da0b8dcb5",
    measurementId: "G-GR91YRYBQ8"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebaseApp.storage()


  export {db, auth, storage };
