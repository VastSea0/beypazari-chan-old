// firebase.js
import firebase from 'firebase/compat/app'; // Doğru Firebase modülünü içe aktarın
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

 
  
  
// Firebase'i başlatın
firebase.initializeApp(firebaseConfig);

// Diğer Firebase hizmetlerini de içe aktarın
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

// firebase nesnesini de dışa aktarın
export { auth, firestore, storage, firebase };
