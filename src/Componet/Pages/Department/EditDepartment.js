import React from 'react';
import { TextField, Button } from '@mui/material';
import './Department.css';
import { useDispatch,useSelector } from 'react-redux';
import { UpdateDepartment, IsEditingClose } from '../../../Store/DepartmentSlice';


const EditDepartment = (props) => {
    const dispatch = useDispatch();

  let [DepartmentInput, setDepartmentInput] = React.useState({
    dept_name:props.selectedDepartment.dept_name,
    dept_desc:props.selectedDepartment.dept_desc
  });

   function handleSubmit(event) {
     event.preventDefault();
     const ID = props.selectedDepartment.id
     dispatch(UpdateDepartment({ID:ID,DepartmentData:DepartmentInput}))
     console.log(DepartmentInput);
   }
 
   const cancleHandler = () =>{
    dispatch(IsEditingClose(false))
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
                    label="Department Desc"
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

export default EditDepartment;