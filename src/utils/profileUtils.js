// src/utils/profileUtils.js
import { db } from '../firebaseConfig.js'; 

export const getUserProfile = async (uid) => {
  // Fetch user profile from Firestore database
  const userDoc = await db.collection('users').doc(uid).get();
  return userDoc.exists ? userDoc.data() : null;
};

export const updateProfile = async (uid, profileData) => {
  // Update user profile in Firestore database
  await db.collection('users').doc(uid).update(profileData);
};
