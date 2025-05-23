import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/config";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch(); // useDispatch gives us the dispatch function to send actions to Redux
  const logoutHandler = () => {
    // Call the logout method from authService (which likely logs out the user from Appwrite)
    authService.logout().then(() => {
      // After logout is successful, dispatch the logout action to update Redux state
      dispatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
};



export default LogoutBtn;
