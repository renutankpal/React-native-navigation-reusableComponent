import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { BASE_URL } from "@env";

export const validateSession = createAsyncThunk(
  "session/validateSession",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/login/session?sessionId=${sessionId}`);

      return response.data; // Assuming API returns { valid: true/false }
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);

interface SessionState {
  sessionId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessionId: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logout: (state) => {
      state.sessionId = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload; // True if valid, false if invalid
      })
      .addCase(validateSession.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = sessionSlice.actions;
export const selectSession = (state: RootState) => state.session;
export default sessionSlice.reducer;
