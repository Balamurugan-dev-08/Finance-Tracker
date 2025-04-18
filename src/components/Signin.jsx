import { authContext } from '@/lib/Store/auth-context'
import React, { useContext } from 'react'
import {FcGoogle} from 'react-icons/fc'

const Signin = () => {
    const {googleLoginHandler}=useContext(authContext)
  return (
    <div className='container max-w-2xl px-6 mx-auto '>
        <h1 className='mb-5 font-bold text-center text-5xl'>Welcome</h1>
        <div className='p-4'>
            <h2 className='text-center text-2xl text-red-600'>Please Signin To Continue</h2>
            <button onClick={googleLoginHandler} className='flex items-center gap-2 self-start align-middle mx-auto mt-4 p-3 bg-slate-700 rounded-2xl'><FcGoogle />Google</button>
        </div>
    </div>
  )
}

export default Signin;
