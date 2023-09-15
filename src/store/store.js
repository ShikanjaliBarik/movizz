import { configureStore,  getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from '../components/features/user/userSlice';
import homeSlice from "./homeSlice";

export const store = configureStore({
    reducer: {
        home: homeSlice,
        user: userReducer,
    },
    middleware: getDefaultMiddleware ({
        serializableCheck: false,
      }),
});

