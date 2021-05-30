import React from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "./action/authaction";

const Navbar = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  return (
    <div>
      <Link to="/">Home</Link>
    { auth.isAuth ? ( <>
       <Link to="/profile">profile</Link>
        <Link onClick={()=>dispatch(logoutUser())}>logout</Link> </> 
    ) : (
      <>
     <Link to="/login"> Login </Link>
      <Link to="/register">Register</Link>
      </>
    )}
    </div>
  );
};

export default Navbar;
