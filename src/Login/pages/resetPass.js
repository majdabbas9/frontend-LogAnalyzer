import React, { useEffect, useState } from 'react';
import axios from "../api/axios";

function ResetPass() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");

    const checkPasswordStrength = (password) => {
        const minLength = 6;
        const minUpperCase = 1;
        const minLowerCase = 1;
        const minNumbers = 1;

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }

        if (password.replace(/[^A-Z]/g, "").length < minUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }

        if (password.replace(/[^a-z]/g, "").length < minLowerCase) {
            return "Password must contain at least one lowercase letter.";
        }

        if (password.replace(/[^0-9]/g, "").length < minNumbers) {
            return "Password must contain at least one number.";
        }

        return "Password is strong!"; // Password meets all criteria
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (password != "" && confirmPassword != "") {
                if (password === confirmPassword) {
                    if (checkPasswordStrength(password) === "Password is strong!") {
                        const currentURL = window.location.pathname
                        console.log(currentURL)
                        const response = await axios.post(
                            currentURL,
                            JSON.stringify({ password: password }),
                            {
                                headers: { "Content-Type": "application/json" },
                                withCredentials: true,
                            }
                        );
                        setStatus(response?.data.status)
                        setConfirmPassword("")
                        setPassword("")
                        if (response?.data.status == "your password has been changed") {
                            if (window.confirm("your password has been changed,Do you want to login?")) {
                                window.location.href = "http://localhost:3000/admin/login";
                            }
                        }
                    }
                    else{
                        setStatus(checkPasswordStrength(password))
                    }
                }
                else {
                    setStatus("not same passsword")
                }
            }
            else {
                setStatus("please fill in all the data!!")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1></h1>

            <form>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                /><br />
                <input
                    type="password"
                    name="confirmpassword"
                    id="confirm-password"
                    placeholder="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                /><br />
                <input type='submit' value="submit" onClick={submit} />
                {status && <div style={{ color: "red" }}>{status}</div>}

            </form>
        </div>

    )
}
export default ResetPass