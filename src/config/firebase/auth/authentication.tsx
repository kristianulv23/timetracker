import * as firebase from 'firebase';

export const createFirebaseUser = (email: string, password: string) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

    });
}

export const signInFirebaseUser = (email: string, password: string) => {
    console.log("email", email);
    console.log("password", password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorCode: ", errorCode);
        console.log("errorMessage: ", errorMessage);
        // ...
    });
}

export const signOutFirebaseUser = () => {
    firebase.auth().signOut().then(() => {
        console.log("Signed out successfully!")
    }).catch(() => {
        console.log("Failed to sign out!");
    });
}

export const onAuthStateChanged = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
        }
    });
}
