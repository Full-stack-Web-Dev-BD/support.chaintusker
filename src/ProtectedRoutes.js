import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { magicMumbai } from "./web3/magic";
import { loginSuccess } from "./features/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { Loading } from "./components/Loading";

export const ProtectedRoutes = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const { Component } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkLogin = async () => {
      try {
        const _loginStatus = await magicMumbai.user.isLoggedIn();
        if (_loginStatus) {
          setLoginStatus(_loginStatus);
          const metadata = await magicMumbai.user.getMetadata();
          await dispatch(loginSuccess(metadata));
          console.log("User is logged in");
        } else {
          navigate("/login");
          setLoginStatus(_loginStatus);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);

  return (
    <div style={{minHeight:"80vh"}}>
      {loginStatus ? <Component /> : <Loading/>}
    </div>
  );
};
