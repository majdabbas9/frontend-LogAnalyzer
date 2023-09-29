import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {useSignIn} from "react-auth-kit";

function Processing() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const signIn = useSignIn();
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          navigate("/unauthenticated");
        })
        .then((responseData) => {



          const {username, firstName, lastName, role,companyName,email} = responseData.user
          signIn({
            token:responseData.accessToken,
            expiresIn: 60* 15,//15 mins
            tokenType:"Bearer",
            authState: {username,firstName, lastName, email, companyName, role} //info about the user
          });

          navigate(`/admin/dashboard`);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);


  return (
    <div>
      <h1>Processing</h1>
    </div>
  );
}

export default Processing;
