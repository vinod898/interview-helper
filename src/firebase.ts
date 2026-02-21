import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCcy_0EeTEEiw3F9MWdPDaQtSRQG__b4p0",
  authDomain: "eliteinterviewhelper.firebaseapp.com",
  projectId: "eliteinterviewhelper",
  storageBucket: "eliteinterviewhelper.firebasestorage.app",
  messagingSenderId: "317368940983",
  appId: "1:317368940983:web:3dc16c4d44cb0e2df45032",
  measurementId: "G-6BB0N9YX57"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);