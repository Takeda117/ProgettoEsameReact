import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import characterReducer from './characterSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        character: characterReducer
    }
})
