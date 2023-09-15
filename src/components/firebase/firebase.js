import firebase from "firebase/compat/app";
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyA1-XTL_GwSyDYE-Llj5oKnYV_BcZ91cRY",
    authDomain: "disneypluse-clone-17865.firebaseapp.com",
    projectId: "disneypluse-clone-17865",
    storageBucket: "disneypluse-clone-17865.appspot.com",
    messagingSenderId: "1076360312153",
    appId: "1:1076360312153:web:51fcd0c6c530ebb1ac4848",
    measurementId: "G-FF939DKDEV"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth , provider };

export default firebase;