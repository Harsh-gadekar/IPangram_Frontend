import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchPost = createAsyncThunk(
    'getPost',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5001/post/getpost',{
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            console.log('---------inside createAsyncThunk response')
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const AddPostData = createAsyncThunk(
    'AddPost',
    async (addPostInputData, { rejectWithValue }) => {
        console.log('------ inside addPostInputData---------')
        console.log(addPostInputData)
        try {
            const response = await axios.post('http://localhost:5001/post/addpost', addPostInputData, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            addPostInputData.id = response.data.insertId;
            return addPostInputData;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const UpdatePost = createAsyncThunk(
    'UpdatePost',
    async ({ ID,PostData }, { rejectWithValue }) => {
        console.log(ID);
        console.log(PostData);
        try {
            const response = await axios.put(`http://localhost:5001/post/updatepost/${ID}`, PostData, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });

            PostData.id = ID
            console.log(response.data.insertId);
            return PostData;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const DeletePost = createAsyncThunk(
    'DeletePost',
    async (postID, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5001/post/deletePost/${postID}`, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
const Postslice = createSlice({
    name: 'PostR',
    initialState: {
        PostData: [],
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
    extraReducers: {
        [fetchPost.pending]: (state) => {
            console.log('--------inside pending-------')
            state.loading = true;
        },
        [fetchPost.fulfilled]: (state, action) => {
            console.log('--------inside fullfilled-------')
            console.log('-----action.payload-----',action.payload)
            state.loading = false;
            state.PostData = action.payload;
        },
        [fetchPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'An error occurred';
        },
        
        [AddPostData.pending]: (state) => {
            state.loading = true;
        },
        [AddPostData.fulfilled]: (state, action) => {

            console.log(action.payload);
            console.log('-------state authData-------');
            console.log(state.PostData);
            state.PostData.push(action.payload);
            state.IsAdding = false;
        },

        [AddPostData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'An error occurred';
        },
        [UpdatePost.pending]: (state) => {
            state.loading = true;
        },
        [UpdatePost.fulfilled]: (state, action) => {
            console.log(action);
            state.PostData = state.PostData.filter((post) => post.id !== action.payload.id);
            console.log('-------Filter-------', state.PostData);
            state.PostData.push(action.payload);
            state.IsEditing = false;
        },
        [UpdatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'An error occurred';
        },
        [DeletePost.pending]: (state) => {
            state.loading = true;
        },
        [DeletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.PostData = state.PostData.filter((post) => post.id !== action.meta.arg);
        },
        [DeletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'An error occurred';
        },
    },
});

export const { IsAddingOpen, IsAddingClose, IsEditingOpen, IsEditingClose } = Postslice.actions
export default Postslice.reducer;


