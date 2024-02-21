import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import "./loginform.css"; // Import the CSS file
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Loginform() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

   

    setState({
      ...state,
      emailError: email === "" ? "Please enter your email" : "",
      passwordError: password === "" ? "Please enter your password" : "",
    });

    
      axios({
        method: 'post',
        url: 'http://localhost:4000/user/login',
        data: {
          email: email,
          password: password
        }
      })
      .then(function (response) {
        // handle success
        console.log({data: response.data[0].token, data2:response.data[0].first_name,});
        localStorage.setItem("token", response.data[0].token);   //storing the token in localstorage
        navigate('/employee')
      // console.log(userData.data[0].title);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  };

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleSubmit} className="form-container">
        <h1>Signin</h1>
        <TextField
          id="email"
          name="email"
          label="Email"
          defaultValue=""
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <span className="error-message">{state.emailError}</span>

        <TextField
          id="password"
          name="password"
          label="Password"
          defaultValue=""
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <span className="error-message">{state.passwordError}</span>

        <Button variant="outlined" color="secondary" type="submit">
          Login

        </Button>
      </form>

      <small>
        Need an account? <Link to="/home">Register here</Link>
      </small>
    </React.Fragment>
  );
}

export default Loginform;
