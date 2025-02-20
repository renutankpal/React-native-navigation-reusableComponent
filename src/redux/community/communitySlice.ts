import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '@env';

// Fetch suggested communities based on location
export const fetchCommunitySuggestions = createAsyncThunk(
  'community/fetchSuggestions',
  async (_, { getState, rejectWithValue }) => {
    const { community } = getState();
    const { latitude, longitude } = community.userLocation;
console.log('====================================',latitude);
console.log();
console.log('====================================',longitude);
    if (!latitude || !longitude) {
      return rejectWithValue('Location not available');
    }

    try {
      const response = await axios.get(`${BASE_URL}/location/community/suggestions`, {
        params: { latlng: `${latitude},${longitude}` }
      });

      // Convert array of strings to array of objects
      const formattedData = response.data.map((title, index) => ({
        id: index,  // Assign a unique ID using index
        title: title // Keep title from response
      }));

      return formattedData;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch communities');
    }
  }
);


// Fetch all communities
export const fetchAllCommunities = createAsyncThunk(
  'community/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/community/all`);
      console.log('====================================all commmmm..',response?.data);
      console.log('====================================');
      return response?.data;
    } catch (error) {
console.log('====================================',error);
//      return rejectWithValue(error.response?.data || 'Failed to fetch all communities');
    }
  }
);

interface CommunityState {
  communities: { id: number; title: string }[];
  allCommunities: { id: number; title: string }[];
  isLoading: boolean;
  error: string | null;
  userLocation: { latitude: number | null; longitude: number | null };
}

const initialState: CommunityState = {
  communities: [],
  allCommunities: [],
  isLoading: false,
  error: null,
  userLocation: { latitude: null, longitude: null },
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunitySuggestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommunitySuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunitySuggestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllCommunities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCommunities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCommunities = action.payload;
      })
      .addCase(fetchAllCommunities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserLocation } = communitySlice.actions;
export default communitySlice.reducer;
