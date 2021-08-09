import React from 'react'

import LoginForm from "./reusable/login"

const handleSubmit = () => {
    console.log('Company Login Form Submit Clicked')
}

const CompanyLogin = props => {
    return (
        <div className="admin-login-form">
            <h1>Company Login</h1>
            <LoginForm onClick={handleSubmit}/>
            
        </div>
    )
}

export default CompanyLogin;