import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Profile } from './pages/Profile';
import { RecoilRoot } from "recoil";

function App() {
  

  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
         <Routes>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/profile" element={<Profile />}/>
         </Routes>
      </BrowserRouter>
    </RecoilRoot>  
    </>
  )
}

export default App
