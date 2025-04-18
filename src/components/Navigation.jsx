import { authContext } from '@/lib/Store/auth-context';
import React, { useContext } from 'react'
import { ImStatsBars } from "react-icons/im";

const Navigation = () => {
  const {user ,loading,logout}=useContext(authContext);
  return (
    <div>
      <div className="flex items-center justify-between">
      {/* //user Section  */}
      {user && !loading && (
        <div className="flex items-center gap-2">
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
          {/* img */}
          <img src={user.photoURL} className="w-full h-full object-cover" alt={user.displayName} referrerPolicy='no-referrer' />
        </div>

        {/* name */}
        <small>Hi ,{user.displayName}</small>
      </div>
      )}
      

      {/* Right Side */}

     {user && !loading && (
       <div className="flex gap-4"> 
       <div>
         <ImStatsBars className="text-2xl" />
       </div>
       <div>
         <button onClick={logout} className="btn btn-danger">Sign In</button>
       </div>

     </div>
     )}

    </div>
    </div>
  )
}

export default Navigation
