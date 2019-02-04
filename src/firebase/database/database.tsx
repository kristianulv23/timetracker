import { getDatabase } from '../firebase';
import taskModel from '../models/task';
import * as firebase from 'firebase';

export default function database() {
    const database = getDatabase();
    const functions = {
        getTasks: (userId) => {
            return database.ref(`users/${userId}/tasks`).once('value');
        },
        addTask: (userId, task, time, description) => {
            let id = database.ref(`users/${userId}/tasks/`).push().key;
            let model = taskModel(id, task, time, description, firebase.database.ServerValue.TIMESTAMP.toString());
            return database.ref(`users/${userId}/tasks/` + id).set(model);
        },
        updateTask: (userId, taskId, time) => {
            database.ref(`users/${userId}/tasks/${taskId}`).update({
                time: time
            }, function (error) {
                if (error) {
                    console.log('Writing to database failed: ', error);
                } else {
                    console.log('Data saved successfully!');
                }
            });
        },
        deleteTask: (userId, taskId) => {
            database.ref(`users/${userId}/tasks/${taskId}`).remove();
        }
    }

    return functions;
}
