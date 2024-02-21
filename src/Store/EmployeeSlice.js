import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployee = createAsyncThunk(
  'getEmployee',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/employee/readEmpDetail', {
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

export const AddEmployee = createAsyncThunk(
  'AddEmployee',
  async (addEmployeeInputData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/employee/addEmpDetail', addEmployeeInputData, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      console.log("---response-",response)
      addEmployeeInputData.id = response.data.insertId;
      return addEmployeeInputData.id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const UpdateEmployee = createAsyncThunk(
  'UpdateEmployee',
  async ({ ID, EmployeeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/employee/updateEmpDetail/${ID}`, EmployeeData, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      EmployeeData.id = ID;
      return EmployeeData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DeleteEmployee = createAsyncThunk(
  'DeleteEmployee',
  async (ID, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:4000/employee/deleteEmpDetail/${ID}`, {
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
  EmployeeData: [],
  IsAdding: false,
  IsEditing: false,
  loading: false,
  error: null,
};

const EmployeeSlice = createSlice({
  name: 'EmployeeR',
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
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.EmployeeData = action.payload;
    });

    builder.addCase(AddEmployee.fulfilled, (state, action) => {
      state.EmployeeData.push(action.payload);
      state.IsAdding = false;
    });

    builder.addCase(UpdateEmployee.fulfilled, (state, action) => {
      state.EmployeeData = state.EmployeeData.map((department) =>
        department.id === action.payload.id ? action.payload : department
      );
      state.IsEditing = false;
    });

    builder.addCase(DeleteEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.EmployeeData = state.EmployeeData.filter((Employee) => Employee.id !== action.meta.arg);
    });
  },
});

export const { IsAddingOpen, IsAddingClose, IsEditingOpen, IsEditingClose } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;