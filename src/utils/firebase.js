// src/utils/firestore.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// AUTH
// AUTH
export const registerUser = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: res.user };
  } catch (error) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: getFriendlyAuthMessage(error.code),
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: res.user };
  } catch (error) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: getFriendlyAuthMessage(error.code),
    };
  }
};

// Helper function for friendly messages
function getFriendlyAuthMessage(code) {
  switch (code) {
    case "auth/user-not-found":
      return "המשתמש לא נמצא";
    case "auth/wrong-password":
      return "סיסמה שגויה";
    case "auth/email-already-in-use":
      return "האימייל כבר קיים במערכת";
    case "auth/invalid-email":
      return "אימייל לא תקין";
    case "auth/weak-password":
      return "סיסמה חלשה מדי";
    default:
      return "שגיאה לא צפויה. נסה שוב.";
  }
}

export const logoutUser = async () => {
  try {
    const res = await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: getFriendlyAuthMessage(error.code),
    };
  }
};
// USER DOC
export const createUserDoc = async (email, name, birthDate) => {
  try {
    await setDoc(doc(db, "users", email), {
      email,
      name,
      birth_date: birthDate,
    });
    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

// INJURY INFO
export const updateInjuryInfo = async (email, injuryData) => {
  try {
    const docRef = doc(db, "users", email, "info", "injury_info");
    await setDoc(docRef, injuryData, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

// PREFERENCES
export const updatePreferences = async (email, preferences) => {
  try {
    const docRef = doc(db, "users", email, "info", "prefrences");
    await setDoc(docRef, preferences, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

// GET USER INFO
export const getUserInfo = async (email) => {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, errorMessage: "המשתמש לא נמצא" };
    }
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

// GET INJURY INFO
export const getInjuryInfo = async (email) => {
  try {
    const docRef = doc(db, "users", email, "info", "injury_info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, errorMessage: "מידע על הפציעה לא נמצא" };
    }
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

// GET PREFERENCES
export const getPreferences = async (email) => {
  try {
    const docRef = doc(db, "users", email, "info", "prefrences");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, errorMessage: "העדפות לא נמצאו" };
    }
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

// STORAGE - UPLOAD FILE
export const uploadFileForUser = async (email, file) => {
  try {
    const fileRef = ref(storage, `${email}/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(fileRef);
    return { success: true, url: downloadUrl };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

// STORAGE - LIST FILES
export const listUserFiles = async (email) => {
  try {
    const folderRef = ref(storage, email);
    const res = await listAll(folderRef);
    const urls = await Promise.all(
      res.items.map((item) => getDownloadURL(item))
    );
    return { success: true, urls };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};
