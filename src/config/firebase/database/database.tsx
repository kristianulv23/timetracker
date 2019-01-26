import { getDatabase } from '../firebase';
import taskModel from '../models/task';
import * as firebase from 'firebase';

export default function database() {
    const database = getDatabase();
    const functions = {
        getTasks: () => {
            return database.ref('tasks').once('value');
        },

        addTask: (task, time, description) => {
            let id = database.ref('tasks').push().key;
            let model = taskModel(id, task, time, description, firebase.database.ServerValue.TIMESTAMP.toString());
            return database.ref('tasks/' + id).set(model);
        },
        updateTask: (taskId, time) => {
            database.ref(`tasks/${taskId}`).update({
                time: time
            }, function (error) {
                if (error) {
                    console.log('Writing to database failed: ', error);
                } else {
                    console.log('Data saved successfully!');
                }
            });
        },
        deleteTask: (taskId) => {
            database.ref(`tasks/${taskId}`).remove();
        }
    }

    return functions;
}
