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
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

// generating user documnet.....

export const generateUserDocument = async (user, formData) => {
  if (!user) return;
  // const userRef = db.doc(`users/${user.uid}`);
  const userRef = db.collection("users").doc(user.uid);
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
  return getUserDocument(user.uid);
};

// getting the user document....

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
