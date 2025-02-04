import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig.js'; 

const uploadImages = async (imageFiles, folder) => {
  const imageURLs = await Promise.all(imageFiles.map(async (file) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }));
  return imageURLs;
};

export const fetchAccommodations = createAsyncThunk('accommodations/fetchAccommodations', async () => {
  const snapshot = await getDocs(collection(db, 'accommodations'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addAccommodation = createAsyncThunk('accommodations/addAccommodation', async ({ newAccommodationData, imageFiles }) => {
  const imageURLs = await uploadImages(imageFiles, 'accommodations');
  const [mainImage, ...galleryImages] = imageURLs;

  const docRef = await addDoc(collection(db, 'accommodations'), {
    ...newAccommodationData,
    mainImage,
    galleryImages
  });
  return { id: docRef.id, ...newAccommodationData, mainImage, galleryImages };
});

export const editAccommodation = createAsyncThunk('accommodations/editAccommodation', async ({ id, updatedData, imageFiles }) => {
  const imageURLs = imageFiles.length ? await uploadImages(imageFiles, 'accommodations') : [];
  const [mainImage, ...galleryImages] = imageURLs;

  const docRef = doc(db, 'accommodations', id);
  await updateDoc(docRef, {
    ...updatedData,
    mainImage: mainImage || updatedData.mainImage,
    galleryImages: galleryImages.length ? galleryImages : updatedData.galleryImages
  });
  return { id, updatedData: { ...updatedData, mainImage, galleryImages } };
});

export const removeAccommodation = createAsyncThunk('accommodations/removeAccommodation', async (id) => {
  const docRef = doc(db, 'accommodations', id);
  await deleteDoc(docRef);
  return id;
});

const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAccommodation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editAccommodation.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(accommodation => accommodation.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload.updatedData;
        }
      })
      .addCase(editAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeAccommodation.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(accommodation => accommodation.id !== action.payload);
      })
      .addCase(removeAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default accommodationsSlice.reducer;
