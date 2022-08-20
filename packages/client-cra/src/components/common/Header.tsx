import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-orange-100 px-3 py-2'>
        <div className='flex items-center  max-w-3xl w-full mx-auto'>
            <Link to="/" className='flex-1 font-bold'>The Book Shelf</Link>

            <div className='justify-self-end'>
                <Link className='hover:text-cyan-600 font-semibold px-1 mx-2 hover:underline underline-offset-8' to="/login">Login</Link>
                <Link className='hover:text-cyan-600 font-semibold px-1 mx-2 hover:underline underline-offset-8' to="/signup">Signup</Link>
                <button className='font-semibold border border-red-500 px-3 py-1 rounded hover:bg-red-100'>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Header