// src/utils/uploadImage.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig.js';

export const uploadImage = async (file, folderPath) => {
  const storageRef = ref(storage, `${folderPath}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
