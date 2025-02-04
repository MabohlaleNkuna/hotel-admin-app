import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImage } from '../../src/utils/uploadImage.js'; // Import the correct function

// Create a thunk to handle updating the user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      // If profileData includes a file to upload
      if (profileData.file) {
        const url = await uploadImage(profileData.file, 'profileImages');
        return { ...profileData, profileImageUrl: url };
      }
      // If no file, just return profileData
      return profileData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define initial state and createSlice as usual
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = {
        uid: payload.uid,
        email: payload.email,
        role: payload.role,
        favorites: payload.favorites || [],
      };
    },
    loginFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = {
        uid: payload.uid,
        email: payload.email,
        role: payload.role,
        favorites: payload.favorites || [],
      };
    },
    registerFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    updateFavorites: (state, { payload }) => {
      if (state.user) {
        state.user.favorites = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { ...state.user, ...payload };
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  updateFavorites,
} = userSlice.actions;

export default userSlice.reducer;
