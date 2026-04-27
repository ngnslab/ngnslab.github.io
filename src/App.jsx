import { useEffect, useState } from 'react'
import './App.css'

// Component import
import NavBar from './components/Navbar'

// page import 
import Home from './pages/Home'
import Member from './pages/Member'
import Research from './pages/Research'
import Activities from './pages/Activities'
import Publications from './pages/Publications'
import Lecture from './pages/Lecture'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Notice from './pages/Notice'
import NoticeDetail from './pages/NoticeDetail'
import Contact from './pages/Contact'

// package import
import { HashRouter as Router, Routes, Route } from "react-router-dom";

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
        console.log("📦 멤버 데이터 로드 완료:", loading);
      })
      .catch(err => {
        console.error("😢 오류 발생:", err);
        setError(err.message);
        setLoading(false);
        console.log("📦 멤버 데이터 로드 실패:", error);
      });
  }, []);
  
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/member' element={<Member members={members} />} />
          <Route path='/research-projects' element={<Research />} />
          <Route path='/research-achievements' element={<Publications />} />
          <Route path='/activities' element={<Activities />} />
          <Route path='/lecture' element={<Lecture />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:id' element={<NewsDetail />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/notice/:id' element={<NoticeDetail />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
