import * as firebase from "firebase";

export const createFirebaseUser = (email: string, password: string) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
};

export const signInFirebaseUser = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
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