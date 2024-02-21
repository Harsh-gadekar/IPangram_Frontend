import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const AddSignUp= createAsyncThunk(
    'AddSignUp',
    async (addsignup, { rejectWithValue }) => {
        console.log('------ inside addsignup---------')
        console.log(addsignup)
       
        try {
            const response = await axios.post('http://localhost:4000/user/signup', addsignup, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            console.log(response)
            addsignup.id = response.data.insertId;
            return addsignup;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const SignUpSlice = createSlice({
    name: 'signR',
    initialState: {
        Signupdata: [],
        IsAdding: false,
        IsEditing: false,
        loading: false,
        error: null,
    },
    reducers: {
        IsAddingOpen: (state, action) => {
            state.IsAdding = true
        },
        IsAddingClose: (state, action) => {
            state.IsAdding = false
        },
        IsEditingOpen: (state, action) => {
            state.IsEditing = true
        },
        IsEditingClose: (state, action) => {
            state.IsEditing = false
        },
    },
    
    extraReducers: (builder) => {
    
        builder.addCase(AddSignUp.fulfilled, (state, action) => {
            console.log(action.payload);
            console.log('-------state book trip-------');
            console.log(state.Signupdata);
        })
      },
   

})

export const { IsAddingOpen, IsAddingClose, IsEditingOpen, IsEditingClose } = SignUpSlice.actions
export default SignUpSlice.reducer;
