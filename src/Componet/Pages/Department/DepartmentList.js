import React from 'react';
import { Button } from '@mui/material';
import './Department.css';
import { useEffect,useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { fetchDepartment, DeleteDepartment, IsAddingOpen, IsEditingOpen, UpdateDepartment} from '../../../Store/DepartmentSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import EditDepartment from './EditDepartment';
import AddDepartment from './Department';
import { DataGrid } from '@mui/x-data-grid';

const Department = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const dispatch = useDispatch();
  const DepartmentData = useSelector((state) => state.DepartmentR.DepartmentData);
  const IsAdding = useSelector((state) => state.DepartmentR.IsAdding);
  const IsEditing = useSelector((state) => state.DepartmentR.IsEditing);
  const loading = useSelector((state) => state.DepartmentR.loading);

  useEffect(() => {
     
    dispatch(fetchDepartment());

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
      dispatch(DeleteDepartment(Id));
    }
    Swal.fire({
      icon: 'Delete',
      title: 'Department is deleted',
    });
  });
};

const onUpdateHandler = (event, rowData) => {

  console.log(rowData)
  setSelectedDepartment(rowData)
  dispatch(IsEditingOpen(true));
};

const onAddHandler = () => {
  dispatch(IsAddingOpen(true));
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'dept_name', headerName: 'dept_name', width: 150 },
  { field: 'dept_desc', headerName: 'dept_desc', width: 150 },
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
      <h2 className='spacing'>Department</h2>
      {loading && <div>Loading...</div>}
      {!IsAdding && !IsEditing && (
        <div>
          <div style={{ margin: '40px', cellspacing: '30px' }}>
            <Button className='spacing' onClick={onAddHandler} variant="outlined" color="secondary" sx={{ marginRight: '10%' }}>
              Add
            </Button>
          </div>
          <DataGrid rows={ DepartmentData } columns={columns} pageSize={5} checkboxSelection disableSelectionOnClick />
        </div>
      )}

      {IsAdding && <AddDepartment />}
      {IsEditing && <EditDepartment selectedDepartment={selectedDepartment} />}
    </Box>
  </React.Fragment>
);
};
export default Department;
