import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
    session: string

}

const initialState: SessionState = {
    session: ''

}

export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession(state, action: PayloadAction<string>) {
            state.session = action.payload
        }
    },
})

export const { setSession } = SessionSlice.actions

export default SessionSlice.reducer