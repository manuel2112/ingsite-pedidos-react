import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false
    },
    reducers: {
        onLoading: ( state ) => {
            state.isLoading = true;
        },
        onNotLoading: ( state ) => {
            state.isLoading = false;
        },
    }
});

export const { onLoading, onNotLoading } = uiSlice.actions;