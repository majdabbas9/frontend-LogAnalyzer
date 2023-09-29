import { useEffect, useState, useRef } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuthUser, useSignOut} from "react-auth-kit";
const LoginNavBar = ({ user }) => {
    const signOut = useSignOut()
    const navigate = useNavigate()
    const auth = useAuthUser()

    const logout = async () => {
        // const res = await axios.get("/logout",);
        window.open("http://localhost:5000/logout", "_self");
        signOut()
        navigate("/");


    };
    return (
        <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Log Analayzer
        </Link>
      </span>
            {auth() ? (
                <ul className="list">
                    {/* <li className="listItem">{user.displayName}</li> */}
                    <li className="listItem" onClick={logout}>
                        Logout
                    </li>
                </ul>
            ) : (
                <Link className="link" to="/admin/login">
                    Login
                </Link>
            )}
        </div>
    );
};


export default LoginNavBar;
