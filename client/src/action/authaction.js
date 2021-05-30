import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
} from "./type";
import axios from "axios";
import setToken from "../setToken";

// register User
export const registerUser = (info) => (dispatch) => {
  axios
    .post("/api", info)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch ({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    }));
};

//load User

export const loadUser = () => (dispatch) => {
  setToken();
  axios
    .get("/login")
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch ({
      type: LOAD_USER_FAIL,
      payload: err.response.data.msg,
    }));
};

// login user
export const loginUser = (data) => (dispatch) => {
  axios
    .post("/login", data)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    }));
};


 export const logoutUser = ()=>(dispatch)=>{
   dispatch({
     type:LOGOUT,
   })
 }