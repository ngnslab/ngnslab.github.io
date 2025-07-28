import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Component import
import NavBar from './components/Navbar'

// page import 
import Home from './pages/Home'
import Member from './pages/Member'

// package import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/member' element={<Member />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
