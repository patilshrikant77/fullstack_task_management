import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import boardsReducer from '../features/board/boardsSlice';



export const store = configureStore({
    reducer: {
        auth: authReducer,
        boards: boardsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
