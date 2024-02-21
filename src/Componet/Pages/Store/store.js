import { configureStore } from "@reduxjs/toolkit";
import EmplyoeeReducer from './EmployeeSlice'
import SignUpReducer from './SignUpSlice'

                                              
export default configureStore( {                  
    reducer : {
        EmpR : EmplyoeeReducer,
        SignR : SignUpReducer
    }
})