import React from 'react';
import '../styles/verifyEmail.css';

function VerifyEmail() {
    return (
        <div className="verify-container">
            <h1>Email Verification</h1>
            <p>We've sent a verification link to your email address. Please check your inbox and click on the link to verify your email.</p>
            <p>If you didn't receive the email, make sure to check your spam folder </p>
        </div>
    );
}

export default VerifyEmail;