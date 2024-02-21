import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { useState } from 'react';
import EditEmployee from './EditEmployee';
import Employee from './Employee';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee, DeleteEmployee, IsAddingOpen, IsEditingOpen} from '../../../Store/EmployeeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const EmployeeList = () => {
  //const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const dispatch = useDispatch();
  const EmployeeData = useSelector((state) => state.EmployeeR.EmployeeData);
  const IsAdding = useSelector((state) => state.EmployeeR.IsAdding);
  const IsEditing = useSelector((state) => state.EmployeeR.IsEditing);
  const loading = useSelector((state) => state.EmployeeR.loading);


  useEffect(() => {
     
    dispatch(fetchEmployee());

  }, []);

const onDeleteHandler = (event, rowData) => {
  const Id = rowData.id;
  Swal.fire({
    icon: 'warning',
    title: 'Are you sure you want to delete?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.value) {
      dispatch(DeleteEmployee(Id));
    }
    Swal.fire({
      icon: 'Delete',
      title: 'Employee is deleted',
    });
  });
};

  const onUpdateHandler = (event, rowData) => {

    console.log(rowData)
    setSelectedEmployee(rowData)
    dispatch(IsEditingOpen(true));
  };
  
  const onAddHandler = () => {
    dispatch(IsAddingOpen(true));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'emp_name', headerName: 'Name', width: 200 },
    { field: 'emp_dept', headerName: 'Description', width: 150 },
    { field: 'emp_email', headerName: 'Email', width: 150 },
    { field: 'emp_phone', headerName: 'Phone', width: 150 },
    { field: 'emp_address', headerName: 'Address', width: 150 },
    {field: 'actions',headerName: 'Actions',width: 200,
    renderCell: (params) => (
      <div>
            <Tooltip title="Edit"  
                onClick={(e) => onUpdateHandler(e, params.row)}
                sx={{ marginRight: '8px' }}
                variant="contained">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Delete"
              onClick={(e) => onDeleteHandler(e, params.row)}  
              sx={{ marginRight: '8px' }}
                variant="contained">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
              </Tooltip>
            </div>
    ),
  },
  ];

  return (
    <React.Fragment>
      <Box sx={{ height: 400, width: '100%' }}>
        <h2 className='spacing '>EmployeeList</h2>
        {loading && <div>Loading...</div>}
        {!IsAdding && !IsEditing && (
          <div>
            <div style={{ margin: '40px', cellspacing: '30px' }}>
              <Button onClick={onAddHandler} variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
                Add
              </Button>
            </div>
            <DataGrid rows={EmployeeData} columns={columns} pageSize={5} checkboxSelection disableSelectionOnClick />
          </div>
        )}

        {IsAdding && <Employee />}
        {IsEditing && <EditEmployee selectedEmployee={selectedEmployee}/>}
      </Box>
    </React.Fragment>
  );
};

export default EmployeeList;
