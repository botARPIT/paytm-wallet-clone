import { useEffect, useState } from 'react'
import { Button } from './Button'
import { InputBox } from './InputBox'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('0')
 

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      const token = localStorage.getItem('token')
     
      if (!token) {
        throw new Error('No token found')
      }
      const response = await axios
        .get(`http://localhost:3001/api/v1/user/bulk?filter=` + filter ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        })
        if(response.data && response.data.user){
          setUsers(response.data.user)
        } else {
          setUsers([])
        }
        
    }
    fetchData()
  }, [filter])

  return (
    <>
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='my-2'>
        <input
          onChange={e => setFilter(e.target.value)}
          type='text'
          placeholder='Search users...'
          className='w-full px-2 py-1 border rounded border-slate-500'
        ></input>
      </div>
      <div>
        {users.map(user => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  )
}
const User = ({ user }) => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-between '>
      <div className='flex'>
        <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 ml-2'>
          <div className='flex flex-col justify-center h-full text-xl'>
            {user.firstname[0]}
          </div>
        </div>
        <div className='flex flex-col justify-center h-full'>
          <div>
            {user.firstname} {user.lastname}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center h-ful'>
        <Button onClick={() => {
          navigate('/send?id=' + user._id + "&name=" + user.firstname)  
        }} label={'Send Money'} />
      </div>
    </div>
  )
}
