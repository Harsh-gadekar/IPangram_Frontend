import React from 'react';
import { TextField, Button } from '@mui/material';
import { AddEmployee, IsAddingClose} from '../../../Store/EmployeeSlice';
import './Employee.css';
import { useDispatch, useSelector } from 'react-redux';

const Employee = () => {
    const dispatch = useDispatch();
    const [EmployeeInput, setEmployeeInput] = React.useState({

        emp_name: '',
        emp_desc: '',
        emp_email: '',
        emp_phone:'',
        emp_address:'',
     
    });

    const cancleHandler = () => {
        dispatch(IsAddingClose(false));
        console.log(dispatch)
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(AddEmployee(EmployeeInput));         //passing authInput's data into AddAuthorData 
        
      };

  return (
    <div className='form-container'>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h3 className='form-title'>Add Department</h3>
        <TextField
                    id="emp_name"
                    label="Employee Name"
                    fullWidth
                    className='form-field'
                    value={EmployeeInput.emp_name}
                    onChange={event => setEmployeeInput({...EmployeeInput, emp_name: event.target.value})}
                />
                <TextField
                    id="emp_dept"
                    label="department"
                    fullWidth
                    className='form-field'
                    value={EmployeeInput.emp_dept}
                    onChange={event => setEmployeeInput({...EmployeeInput, emp_dept: event.target.value})}
                />

                <TextField
                    id="emp_email"
                    label="Email"
                    fullWidth
                    className='form-field'
                    value={EmployeeInput.emp_email}
                    onChange={event => setEmployeeInput({...EmployeeInput, emp_email: event.target.value})}
                />

                <TextField
                    id="emp_phone"
                    label="Phone"
                    fullWidth
                    className='form-field'
                    value={EmployeeInput.emp_phone}
                    onChange={event => setEmployeeInput({...EmployeeInput, emp_phone: event.target.value})}
                />

                <TextField
                    id="emp_address"
                    label="address"
                    fullWidth
                    className='form-field'
                    value={EmployeeInput.emp_address}
                    onChange={event => setEmployeeInput({...EmployeeInput, emp_address: event.target.value})}
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
}

export default Employee;
