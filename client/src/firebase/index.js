import firebase from "firebase";
import Constants from "expo-constants";

var firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId,
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();

export const db = firebase.firestore();

// generating user documnet.....

export const generateUserDocument = async (user, formData) => {
  if (!user) return;
  // const userRef = db.doc(`users/${user.uid}`);
  const userRef = db.collection("users").doc(user.uid || user.id);

  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        fullName: formData.fullName,
        email,
        ...formData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

  return getUserDocument(user.uid, user.id);
};

// getting user document....

export const getUserDocument = async (uid, id) => {
  if (!uid && !id) return null;
  try {
    const userDocument = await db.doc(`users/${uid || id}`).get();
    let userId = null;
    uid ? (userId = uid) : (userId = id);
    return {
      userId: userId,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
