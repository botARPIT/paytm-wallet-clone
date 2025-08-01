import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SignUp from './pages/Signup'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
function App() {

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/signup' element = {<SignUp />}></Route>
    <Route path='/signin' element = {<SignIn />}></Route>
    <Route path='/dashboard' element = {<Dashboard />}></Route>
    <Route path='/send' element = {<SendMoney />}></Route>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
