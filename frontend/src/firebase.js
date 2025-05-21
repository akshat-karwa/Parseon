import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAAKfN1veimFw_pBECi3lyoDlEXcIPZuV4",
  authDomain: "parseon-4b5a2.firebaseapp.com",
  projectId: "parseon-4b5a2",
  storageBucket: "parseon-4b5a2.firebasestorage.app",
  messagingSenderId: "1090601209804",
  appId: "1:1090601209804:web:c2d6c40df2f1b1a13e5769",
  measurementId: "G-5TDZPF5811"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');
const appleProvider = new OAuthProvider('apple.com');

export { auth, analytics, googleProvider, microsoftProvider, appleProvider };