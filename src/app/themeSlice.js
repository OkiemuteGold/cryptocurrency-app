import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',

    initialState: {
        themeMode: "dark"
    },

    reducers: {
        changeTheme: (state, action) => {
            state.themeMode = action.payload
        }
    }
})

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;