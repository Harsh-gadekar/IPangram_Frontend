// DepartmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDepartment = createAsyncThunk(
  'getDepartment',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/department/readDepartment', {
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

export const AddDepartment = createAsyncThunk(
  'AddDepartment',
  async (addDepartmentInputData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/department/addDepartment', addDepartmentInputData, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      addDepartmentInputData.id = response.data.insertId;
      return addDepartmentInputData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const UpdateDepartment = createAsyncThunk(
  'UpdateDepartment',
  async ({ ID, DepartmentData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/department/updateDepartment/${ID}`, DepartmentData, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      DepartmentData.id = ID;
      return DepartmentData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DeleteDepartment = createAsyncThunk(
  'DeleteDepartment',
  async (ID, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:4000/department/deleteDepartment/${ID}`, {
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

const initialState = {
  DepartmentData: [],
  IsAdding: false,
  IsEditing: false,
  loading: false,
  error: null,
};

const DepartmentSlice = createSlice({
  name: 'DepartmentR',
  initialState,
  reducers: {
    IsAddingOpen: (state, action) => {
      state.IsAdding = true;
    },
    IsAddingClose: (state, action) => {
      state.IsAdding = false;
    },
    IsEditingOpen: (state, action) => {
      state.IsEditing = true;
    },
    IsEditingClose: (state, action) => {
      state.IsEditing = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.DepartmentData = action.payload;
    });

    builder.addCase(AddDepartment.fulfilled, (state, action) => {
      state.DepartmentData.push(action.payload);
      state.IsAdding = false;
    });

    builder.addCase(UpdateDepartment.fulfilled, (state, action) => {
      state.DepartmentData = state.DepartmentData.map((department) =>
        department.id === action.payload.id ? action.payload : department
      );
      state.IsEditing = false;
    });

    builder.addCase(DeleteDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.DepartmentData = state.DepartmentData.filter((department) => department.id !== action.meta.arg);
    });
  },
});

export const { IsAddingOpen, IsAddingClose, IsEditingOpen, IsEditingClose } = DepartmentSlice.actions;
export default DepartmentSlice.reducer;
