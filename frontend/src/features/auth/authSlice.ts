import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    role: string | null;
}

const initialState: AuthState = {
    token: sessionStorage.getItem('token') || null,
    role: sessionStorage.getItem('role') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ token: string; role: string }>) {
            state.token = action.payload.token;
            state.role = action.payload.role;
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('role', action.payload.role);
        },
        logout(state) {
            state.token = null;
            state.role = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
