import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import LoginNavBar from "../comp/loginNavBar";
import {useSignIn} from "react-auth-kit";


const ResetPassFirstLogin = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { username } = useParams();
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
  const handleSubmit = async (e) => {
    console.log(username)

    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Replace this URL with your backend endpoint
      if (checkPasswordStrength(newPassword) === "Password is strong!") {
        const response = await axios.post('/changePassword',
            JSON.stringify({
              "oldPassword": oldPassword,
              "newPassword": newPassword,
              "username": username
            }),
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true

            }
        );
        console.log(response?.data.success)
        if (response?.data.status === 'success') {
          setSuccess('Password changed successfully');
          navigate('/home')
        } else if (response?.data.status === 'incorrect old password') {
          setError('incorrect old password');

        }
      }else{
        setError(checkPasswordStrength(newPassword) )
      }
    } catch (err) {
      setError(err.message);
    }
  };
const auth = useSignIn()
  return (
      <div>
        <LoginNavBar user = {auth} />
        <h1>Change Password</h1>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Old Password:</label>
            <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>

      </div>
  );
};

export default ResetPassFirstLogin;
