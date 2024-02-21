import React from 'react';
import { TextField, Button } from '@mui/material';
import './Employee.css';
import { useDispatch,useSelector } from 'react-redux';
import { UpdateEmployee, IsEditingClose } from '../../../Store/EmployeeSlice';

const EditEmployee = (props) => {
    const dispatch = useDispatch();

  let [EmpolyeeInput, setEmpolyeeInput] = React.useState({
    emp_name:props.selectedEmployee.emp_name,
    emp_dept:props.selectedEmployee.emp_dept,
    emp_email:props.selectedEmployee.emp_email,
    emp_phone:props.selectedEmployee.emp_phone,
    emp_address:props.selectedEmployee.emp_address,
  });

   function handleSubmit(event) {
     event.preventDefault();
     const ID = props.selectedEmployee.id
     dispatch(UpdateEmployee({ID:ID,EmployeeData:EmpolyeeInput}))
     console.log(EmpolyeeInput);
   }
 
   const cancleHandler = () =>{
    dispatch(IsEditingClose(false))
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
                    value={EmpolyeeInput.emp_name}
                onChange={event => setEmpolyeeInput({...EmpolyeeInput, emp_name: event.target.value})}
                />
                <TextField
                    id="emp_dept"
                    label="department"
                    fullWidth
                    className='form-field'
                    value={EmpolyeeInput.emp_dept}
                onChange={event => setEmpolyeeInput({...EmpolyeeInput, emp_dept: event.target.value})}
                />

                <TextField
                    id="emp_email"
                    label="Email"
                    fullWidth
                    className='form-field'
                    value={EmpolyeeInput.emp_email}
                onChange={event => setEmpolyeeInput({...EmpolyeeInput, emp_email: event.target.value})}
                />

                <TextField
                    id="emp_phone"
                    label="Phone"
                    fullWidth
                    className='form-field'
                    value={EmpolyeeInput.emp_phone}
                onChange={event => setEmpolyeeInput({...EmpolyeeInput, emp_phone: event.target.value})}
                />

                <TextField
                    id="emp_address"
                    label="address"
                    fullWidth
                    className='form-field'
                    value={EmpolyeeInput.emp_address}
                onChange={event => setEmpolyeeInput({...EmpolyeeInput, emp_address: event.target.value})}
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

export default EditEmployee;
