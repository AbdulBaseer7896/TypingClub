import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 // Adjust this path as needed


// Initial state
const initialState = {
  email: localStorage.getItem("email") || null,
  password: localStorage.getItem("password") || null,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  status: 'idle',
  error: null,
};



// Async thunk
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://typingclub.onrender.com/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const info = await response.json();
      if (info['message'] === "Invalid credentials") {
        return rejectWithValue('Invalid credentials');
      }
      return info;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {

      state.email = null;
      state.password = null;
      state.isLoggedIn = false;

      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("isLoggedIn");

      fetch('https://typingclub.onrender.com/api/logout', { method: 'POST', credentials: 'include' , mode: "cors", headers: {
        "Content-Type": "application/json",
        }, })
        .then(response => response.json())
        .catch(error => console.error("Error during logout:", error));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.isLoggedIn = true;
        state.status = 'succeeded';
        localStorage.setItem("email", action.payload.payload.email);
        localStorage.setItem("name", action.payload.payload.name);
        localStorage.setItem("isLoggedIn", "true");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;