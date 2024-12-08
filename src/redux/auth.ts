import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    id: string;
    nickname: string;
    email: string;
    token: string

}

const initialState: AuthState = {
    id: '',
    email: '',
    nickname: '',
    token: ''

}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthentication: (state, action: PayloadAction<AuthState>) => {
            const { email, id, nickname, token } = action.payload;
            state.email = email;
            state.id = id;
            state.nickname = nickname;
            state.token = token

        },
        logout: (state) => {
            state = initialState;
        },
    },
})

export const { setAuthentication, logout } = AuthSlice.actions

export default AuthSlice.reducer