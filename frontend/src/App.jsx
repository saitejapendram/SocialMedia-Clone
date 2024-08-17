import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Profile } from './pages/Profile';
import { RecoilRoot } from "recoil";
import { Dashboard } from './pages/Dashboard';
import { Header } from './components/Header';
import { FriendsPage } from './pages/FriendsPage';
import { Users } from './pages/Users';

function App() {
  

  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
         <Header />
         <Routes>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/users" element={<Users />}/>
            <Route path="/friendsPage" element={<FriendsPage />}/>
         </Routes>
      </BrowserRouter>
    </RecoilRoot>  
    </>
  )
}

export default App
