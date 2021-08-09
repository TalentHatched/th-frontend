import React from 'react'

import LoginForm from "./reusable/login"

const AdminLogin = props => {

    
    return (
        <div className="admin-login-form">
            <h1>Admin Login</h1>
            <LoginForm />
            
        </div>
    )
}

export default AdminLogin;