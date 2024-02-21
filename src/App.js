import { Routes, Route, BrowserRouter } from "react-router-dom"
import Toolbar from '@mui/material/Toolbar';
import './App.css';
import Box from '@mui/material/Box';
import Sidebar from './Componet/Dashboard/Sidebar';
import DepartmentList from "./Componet/Pages/Department/DepartmentList";
import EmployeeList from "./Componet/Pages/employee/EmployeeList";
import Loginform from "./Componet/Pages/loginform/loginform"
import Signupform from "./Componet/Pages/SignUp/singnup"

function App() {
  return (
    <div>
    <BrowserRouter>  
        <Sidebar />
        <Box
          component="main"
          sx={{
            p: 3,
            backgroundColor: '#f0f0f0', // Set a background color for the main content
            flexGrow: 1,
          }}
        >
          <Toolbar />
          <Routes>
           <Route path="department" element={<DepartmentList />} />
           <Route path="employee" element={<EmployeeList />} />
           <Route path="login" element={<Loginform />} />
           <Route path="signup" element={<Signupform />} />
          </Routes>
        </Box>
      
        </BrowserRouter>
    </div >
  );
}

export default App;
