// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAH8A9LVnignJxDHzRxkKJhydzvoxaWkcY",
	authDomain: "netflixgpt-f33e4.firebaseapp.com",
	projectId: "netflixgpt-f33e4",
	storageBucket: "netflixgpt-f33e4.appspot.com",
	messagingSenderId: "970341964623",
	appId: "1:970341964623:web:f64534f9544249d912833a",
	measurementId: "G-7F6D42DDQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
