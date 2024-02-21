import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import "./signup.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import {AddSignUp} from '../../../Store/SignUpSlice'

function Signupform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    setFormData({
      ...formData,
      emailError: email === "" ? "Please enter your email" : "",
      passwordError: password === "" ? "Please enter your password" : "",
    });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    dispatch(AddSignUp(formData));         
   
  };


  return (
    <React.Fragment>
      <div className="form-body">
        <form autoComplete="off" onSubmit={handleSubmit} className="form-container">
          <h1>SignUp</h1>
          <TextField
            id="first_name"
            name="first_name"
            label="First Name"
            onChange={(event) =>
              setFormData({...formData, first_name : event.target.value })
             }
            defaultValue=""
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            id="last_name"
            name="last_name"
            label="Last Name"
            onChange={(event) =>
              setFormData({...formData, last_name : event.target.value })
             }
            defaultValue=""
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            onChange={(event) =>
              setFormData({...formData, email : event.target.value })
             }
            defaultValue=""
            fullWidth
            sx={{ mb: 3 }}
          />
          <span className="error-message">{formData.emailError}</span>

          <TextField
            id="password"
            name="password"
            label="Password"
            onChange={(event) =>
              setFormData({...formData, password : event.target.value })
             }
            defaultValue=""
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            id="phone"
            name="phone"
            label="Phone"
            onChange={(event) =>
              setFormData({...formData, phone : event.target.value })
             }
            defaultValue=""
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            id="addresss"
            name="addresss"
            label="Address"
            onChange={(event) =>
              setFormData({...formData, address : event.target.value })
             }
            defaultValue=""
            fullWidth
            sx={{ mb: 3 }}
          />
          <span className="error-message">{formData.passwordError}</span>

          <Button onClick = {handlesubmit} variant="outlined" color="secondary" type="submit">
            Login
          </Button>
        </form>

        <small>
          Need an account? <Link to="/home">Register here</Link>
        </small>
      </div>
    </React.Fragment>
  );
}

export default Signupform;