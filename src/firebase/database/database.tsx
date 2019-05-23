import { getDatabase } from '../firebase';
import taskModel from '../models/task';
import * as moment from 'moment';

export default function database() {
    moment.locale('nn');
    const database = getDatabase();
    const functions = {
        getTasks: (userId) => {
            return database.ref(`users/${userId}/tasks`).once('value');
        },
        addTask: (userId, task, time, description) => {
            const id = database.ref(`users/${userId}/tasks/`).push().key;
            const model = taskModel(id, task, time, description, moment().format('LLL'));
            return database.ref(`users/${userId}/tasks/` + id).set(model);
        },
        updateTask: (userId, taskId, time) => {
            database.ref(`users/${userId}/tasks/${taskId}`).update({
                time: time
            }, (error) => {
                if (error) {
                    console.log('Writing to database failed: ', error);
                } else {
                    console.log('Data saved successfully!');
                }
            });
        },
        deleteTask: (userId, taskId) => {
            database.ref(`users/${userId}/archive/${taskId}`).remove();
        },
        archiveTask: (userId, taskId) => {
            database.ref(`users/${userId}/tasks/${taskId}`).once('value').then((snapshot) => {
                const id = database.ref(`users/${userId}/archive/`).push().key;
                database.ref(`users/${userId}/archive/` + id).set({ ...snapshot.val(), archiveId: id, archiveDate: moment().format('LLL') });
                database.ref(`users/${userId}/tasks/${taskId}`).remove();
            })
        },
        getArchivedTasks: (userId) => {
            return database.ref(`users/${userId}/archive`).once('value');
        }
    }

    return functions;
}
