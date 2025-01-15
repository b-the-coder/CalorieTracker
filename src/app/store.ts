import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';




//store has a dispatch function, when you use it in react component and pass in action creator, it will dispatch the action object 
//returned by action creator.
//store will use the action object type field to look for which reducer function to use and locate the piece of state need to pass
//to the reducer function according to store setup(state are given different keys and values are the associate reducer)
export const store = configureStore(
    {reducer: {auth: authReducer}}
)

export type Appstore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
