import React from 'react'
import './login.css'

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;

    // Login to firestore

    // if login successful then form.reset() and redirect the user
  }
  
  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login