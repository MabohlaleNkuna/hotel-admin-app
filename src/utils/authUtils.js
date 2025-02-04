import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

export const checkAdminStatus = async (user) => {
  if (!user) return false;

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === 'admin'; 
    } else {
      console.warn('User document not found in Firestore.');
      return false;
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
