import * as firebase from "firebase";

export const createFirebaseUser = (email: string, password: string) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
};

export const signInFirebaseUser = (email: string, password: string) => {
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  });
};

export const signOutFirebaseUser = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed out successfully!");
    })
    .catch(error => {
      console.log("Failed to sign out!");
    });
};