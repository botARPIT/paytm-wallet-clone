import { useState } from 'react'
import { BottomWarning } from '../components/BottomWarning'
import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { SubHeading } from '../components/SubHeading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function SignIn () {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  function nav(token){
    if(token != null){
      navigate('/dashboard')
    }
  }
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={'Sign in'}></Heading>
          <SubHeading
            label={'Enter your credentials to login your account'}
          ></SubHeading>
          <InputBox label={'Email'} placeholder={'eyadav@gmail.com'} onChange={e => setUsername(e.target.value)}></InputBox>
          <InputBox label={'Password'} placeholder={'123456'} onChange={e => setPassword(e.target.value)}></InputBox>
        <div className='pt-4'>
            <Button onClick={async() => {
             const result = await axios.post("http://localhost:3001/api/v1/user/signin/",{
                username, 
                password,
              })
             
              const token = result.data.token
              localStorage.setItem("token","Bearer " + token)
              nav(token);
              
              
            }}label = {'Sign in'} />


        </div>
        <BottomWarning label ={`Don't have an account?`} buttonText= {"Sign up"}  to={'/signup'} ></BottomWarning>
        </div>
      </div>
    </div>
  )
}
