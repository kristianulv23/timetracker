import firebase from 'firebase';

let database;

export const init = () => {
    let config = {
        apiKey: "AIzaSyC2OcqaVFhByoP1E0ICrMb8hPwlifA8LQo",
        authDomain: "timetracker-1832f.firebaseapp.com",
        databaseURL: "https://timetracker-1832f.firebaseio.com",
        projectId: "timetracker-1832f",
        storageBucket: "timetracker-1832f.appspot.com",
        messagingSenderId: "801772647046"
    };

    try {
        firebase.initializeApp(config);
        database = firebase.database();
    } catch (error) {
        console.log('An error occured while initializing the database: %s', error);
    }
}

export const getDatabase = () => {
    if(database) return database;
    return "Cant find firebase";
}