import { createSlice } from '@reduxjs/toolkit';

const initialState = { date: new Date() }

export const datesSlice = createSlice({
    name: 'dates',
    initialState,
    reducers: {
        setDate: (state, { payload: date=new Date() }) => {
            state.date = date;
        }
    }
});