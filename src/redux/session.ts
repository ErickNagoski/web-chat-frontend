import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
    session: string
    room: string
}

const initialState: SessionState = {
    session: '',
    room: 'general',

}

export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession(state, action: PayloadAction<string>) {
            state.session = action.payload
        },
        setRoom (state, action: PayloadAction<string>) {
            state.room = action.payload
        }
    },
})

export const { setSession,setRoom } = SessionSlice.actions

export default SessionSlice.reducer