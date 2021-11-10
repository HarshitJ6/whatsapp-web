import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOIS2VLdHjaKzSx4GZLI8KGD-WhMzPVBE",
  authDomain: "whatsapp-web-81e28.firebaseapp.com",
  projectId: "whatsapp-web-81e28",
  storageBucket: "whatsapp-web-81e28.appspot.com",
  messagingSenderId: "335867442364",
  appId: "1:335867442364:web:239f1b8a34ed3fa55c4cb9",
  measurementId: "G-LFHLJXD3WJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const Fprovider = new firebase.auth.FacebookAuthProvider();

export { auth, provider, Fprovider };
export default db;
