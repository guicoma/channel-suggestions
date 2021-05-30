import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDUE5OL2wY3F0_A9GQL3xUZTzdrzfyTuRk",
    authDomain: "survey-channels.web.app",
    databaseURL: "https://survey-channels-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "survey-channels",
    storageBucket: "gs://survey-channels.appspot.com",
    messagingSenderId: "1033174044443",
    appId: "1:1033174044443:web:fc6e4a50239c1aad2fcdbe"
});

const db = firebaseApp.firestore();

export { db };