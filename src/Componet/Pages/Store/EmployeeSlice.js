import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const GetEmp = createAsyncThunk(
    'getEmp',
    async (getEmpdetail, { rejectWithValue }) => {
        console.log('------ inside employee data---------')
        console.log(getEmpdetail)
       
        try {
            const response = await axios.get('http://localhost:4000/employee/readEmpDetail', getEmpdetail, {
                // headers: {
                //     token: localStorage.getItem('token'),
                // },
            });
            console.log(response)
            getEmpdetail.id = response.data.insertId;
            console.log('------addother id-----' , getEmpdetail.id )
            return getEmpdetail;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const empSlice = createSlice({
    name: 'EmpR',
    initialState: {
        
        EmpData: [],
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
        builder.addCase(GetEmp.fulfilled, (state, action) => {
          state.loading = false;
          state.EmpData = action.payload;
          console.log(state.EmpData)
        });
    
        // builder.addCase(AddDepartment.fulfilled, (state, action) => {
        //   state.DepartmentData.push(action.payload);
        //   state.IsAdding = false;
        // });
    
        // builder.addCase(UpdateDepartment.fulfilled, (state, action) => {
        //   state.DepartmentData = state.DepartmentData.map((department) =>
        //     department.id === action.payload.id ? action.payload : department
        //   );
        //   state.IsEditing = false;
        // });
    
        // builder.addCase(DeleteDepartment.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.DepartmentData = state.DepartmentData.filter((department) => department.id !== action.meta.arg);
        // });
      },
    

})

export const { IsAddingOpen, IsAddingClose, IsEditingOpen, IsEditingClose } = empSlice.actions
export default empSlice.reducer;
