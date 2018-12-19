// import * as React from 'react';
// import { Component, createContext } from 'react';
// import { getTasks, addTask } from '../config/firebase/firebase';

// export interface IFirebaseState {
//     tasks: ITasks[]
// }

// export interface ITasks {
//     id: number;
//     task: string;
//     description: string;
//     time: number;
// }

// export interface IFirebaseContext {
//     state: ITasks[];
//     getTasks: () => void;
// }

// const FirebaseContext = createContext<IFirebaseContext>({
//     state: {tasks:[]},
//     getTasks: () => null
// });

// export const FirebaseConsumer = FirebaseContext.Consumer;

// class FirebaseContextProvider extends Component<any, IFirebaseState> {

//     constructor(props: any) {
//         super(props);

//         this.state = {
//             tasks: []
//         };
//     }

//     private getTasks = () => {
//         getTasks().then((snapshot) => {
//             this.setState(prevState => ({
//                 tasks: [...prevState.tasks, snapshot.val()]
//             }))
//         })
//     };


//     public render() {
//         const { state } = this;
//         const firebaseContext = {
//             state,
//             getTasks: this.getTasks
//         };

//         return (
//             <FirebaseContext.Provider value={firebaseContext}>
//                 {this.props.children}
//             </FirebaseContext.Provider>
//         );
//     }
// }

// export default FirebaseContextProvider;
