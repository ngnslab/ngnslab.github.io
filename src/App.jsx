import { useEffect, useState } from 'react'
import './App.css'

// Component import
import NavBar from './components/Navbar'

// page import 
import Home from './pages/Home'
import Member from './pages/Member'
import Projects from './pages/Projects'
import Activities from './pages/Activities'
import Publications from './pages/Publications'
import Lecture from './pages/Lecture'
import Contact from './pages/Contact'

// package import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/member.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch members');
        }
        return res.json();
      })
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("😢 오류 발생:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/member' element={<Member members={members} />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/activities' element={<Activities />} />
          <Route path='/publications' element={<Publications />} />
          <Route path='/lecture' element={<Lecture />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
