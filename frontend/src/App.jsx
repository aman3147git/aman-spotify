import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'

import Admin from './pages/Admin'
import Clickedsong from './pages/Clickedsong'
import RightSide from './pages/RightSide'
import Clickedalbum from './pages/Clickedalbum'
import Search from './components/Search'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Home />}>
         
          <Route index element={<RightSide />} />
          <Route path="song/:id" element={<Clickedsong />} />
          <Route path="album/:id" element={<Clickedalbum />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="search" element={<Search />} />
          <Route path="search/:query" element={<Search/>} />
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<Register/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App