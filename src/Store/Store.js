// Store.js
import { configureStore } from "@reduxjs/toolkit";
import DepartmentReducer from "./DepartmentSlice";
import EmployeeReducer from "./EmployeeSlice";

const store = configureStore({
  reducer: {
    DepartmentR: DepartmentReducer,
    EmployeeR:EmployeeReducer,
  },
});

export default store;
