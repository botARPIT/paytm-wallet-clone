import axios from "axios"
import { useEffect, useState } from "react"

export const Appbar = () => {
  const [user, setUser] = useState('Bot')
  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get("http://localhost:3001/api/v1/user/me", {
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      if(result.data && result.data.firstname){
        setUser(result.data.firstname)
      } else {
        throw new Error('User not found')
      }
    }
    fetchUser()
  }, [])
  return (
    <div className='shadow h-14 flex justify-between'>
      <div className='flex flex-col justify-center h-full ml-4'>PayTM App</div>
      <div className='flex'>
        <div className='flex flex-col justify-center h-full mr-4'>Hello, {user}</div>
        <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-4'>
          <div className='flex flex-col justify-center h-full text-xl'>{user[0].toUpperCase()}</div>
        </div>
      </div>
    </div>
  )
}
