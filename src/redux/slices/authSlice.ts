import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
 import { BASE_URL } from '../../theme/variables/config'
 console.log('====================================BASE_URL',BASE_URL);
interface AuthState {
  phoneNumber: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  phoneNumber: '',
  isLoading: false,
  error: null,
};

// Async thunk for phone authentication
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      console.log('Sending OTP to:', phoneNumber);
      const response = await axios.get(`${BASE_URL}/login/customer/getOtp`, {
        params: { userId: phoneNumber },
      });
      console.log('OTP Sent Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('sendOtp API error:', error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ phoneNumber, otp }: { phoneNumber: string; otp: string }, { rejectWithValue }) => {
    try {
      console.log('Verifying OTP:', phoneNumber, otp);
      const response = await axios.get(`${BASE_URL}/login/customer/verifyOtp`, {
        params: { userId: phoneNumber, otp: otp },
      });

      console.log('OTP Verified Response:', response.data);

      if (response.data.sessionId) {
        await AsyncStorage.setItem('sessionId', response.data.sessionId);
      }

      return response.data;
    } catch (error: any) {
      console.error('OTP Verification Failed:', error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || 'Network error');
    }
  }
);

  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
  
});

export const { setPhoneNumber } = authSlice.actions;
export default authSlice.reducer;
