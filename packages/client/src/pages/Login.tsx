import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='max-w-lg mx-auto flex flex-col'>
      <h2 className='text-center py-5 text-2xl font-semibold'>Login</h2>
      <label className='block text-sm' htmlFor='username'>Username</label>
      <input className='block mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50' id="username" type="text" placeholder="enter your username"/>
      <label className='block text-sm' htmlFor="password">Password</label>
      <input className='block mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50' id="password" type="password" placeholder="****" />
      <button className='self-end border border-green-700 px-2 py-1 rounded bg-green-200 hover:bg-green-300 font-semibold'>Submit</button>
      <p className='text-sm self-end mt-3'>New here? <Link className='font-semibold text-blue-600 hover:text-blue-800' to="/signup">signup</Link>. Forgot password? <Link className='font-semibold text-blue-600 hover:text-blue-800' to="/password-reset">reset password</Link>.</p>
    </div>
  )
}

export default Login