import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import sessionReducer from './session'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        session: sessionReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch