// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJPW3borgHzcbx9whky1FvrjI4qrnEvgU",
  authDomain: "expense-tracker-web-app-6563c.firebaseapp.com",
  projectId: "expense-tracker-web-app-6563c",
  storageBucket: "expense-tracker-web-app-6563c.firebasestorage.app",
  messagingSenderId: "162029716472",
  appId: "1:162029716472:web:57e9e80fcc1355cc244c0d",
  measurementId: "G-HT5Y21R55K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
