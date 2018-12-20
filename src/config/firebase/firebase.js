import * as firebase from 'firebase';
import taskModel from './models/task';

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

export const getTasks = () => {
    return database.ref('tasks').once('value');
}

export const addTask = (task, time, description) => {
    let id = database.ref('tasks').push().key;
    let model = taskModel(id, task, time, description, firebase.database.ServerValue.TIMESTAMP);
    return database.ref('tasks/' + id).set(model);
}

export const updateTask = (taskId, time) => {
    console.log('time: ', time);
    database.ref(`tasks/${taskId}`).update({
        time: time
    }, function (error) {
        if (error) {
            console.log('Writing to database failed: ', error);
        } else {
            console.log('Data saved successfully!');
        }
    });
}