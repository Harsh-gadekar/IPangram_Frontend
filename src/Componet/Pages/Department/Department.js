import React from 'react';
import { TextField, Button, InputAdornment} from '@mui/material';
import './Department.css';
import { useDispatch, useSelector } from 'react-redux';
import { AddDepartment,IsAddingClose} from '../../../Store/DepartmentSlice';
import { useEffect } from 'react';

const Department = () => {
  const dispatch = useDispatch();
    const [DepartmentInput, setDepartmentInput] = React.useState({
      dept_name: '',
      dept_desc: ''
    });
    console.log(setDepartmentInput)

    const cancleHandler = () => {
      dispatch(IsAddingClose(false));
      console.log(dispatch)
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(AddDepartment(DepartmentInput));         //passing authInput's data into AddAuthorData 
      
    };

  return (
    <div className='form-container'>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h3 className='form-title'>Add Department</h3>
        <TextField
          id="dept_name"
          label="Department Name"
          fullWidth
          className='form-field'
          value={DepartmentInput.dept_name}
          onChange={event => setDepartmentInput({...DepartmentInput, dept_name: event.target.value})}
        />
        <TextField
          id="dept_desc"
          label="Description"
          fullWidth
          className='form-field'
          value={DepartmentInput.dept_desc}
          onChange={event => setDepartmentInput({...DepartmentInput, dept_desc: event.target.value})}
        />

        <div className='button-container'>
          <Button variant="outlined" color="secondary" onClick={cancleHandler}>
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Department;



