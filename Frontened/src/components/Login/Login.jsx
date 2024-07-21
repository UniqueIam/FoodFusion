import React, { useState } from 'react'
import './Login.css'

const Login = () => {
    const [currState,setcurrState] = useState("Sign Up")
  return (
    <div className='login'>
      <form className='login-container'>
        <div className='login-title'>
            <h2>{currState}</h2>
        </div>
      </form>
    </div>
  )
}

export default Login
