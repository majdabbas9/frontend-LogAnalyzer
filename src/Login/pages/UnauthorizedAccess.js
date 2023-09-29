import React from "react";
import {useAuthUser} from "react-auth-kit";
import LoginNavBar from "../comp/loginNavBar";

const unauthorizedAccessStyle = {
    backgroundColor: "#ffcccc",
    padding: "20px",
    border: "1px solid #ff0000",
    borderRadius: "5px",
    textAlign: "center",
    margin: "20px auto",
    maxWidth: "500px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
};

const headerStyle = {
    color: "#ff0000",
    fontSize: "24px",
};

const paragraphStyle = {
    fontSize: "16px",
};
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const UnauthorizedAccess = () => {
    const auth = useAuthUser()

    return (
        <div>

            <LoginNavBar user = {auth()} />
        <div style={unauthorizedAccessStyle}>
            <h2 style={headerStyle}>Unauthorized Access</h2>
            <p style={paragraphStyle}>
                You do not have permission to access this page. Please contact your company's
                <b>{" " + capitalizeFirstLetter(auth().company )
                    + " "} </b>
                administrator for access.
            </p>
        </div>
        </div>
    );
};

export default UnauthorizedAccess;
