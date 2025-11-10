import './News.css';
import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/news.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        setNews(data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="professor-container"><h1 className="professor-title">News</h1><div style={{color:'#4a5568'}}>로딩 중...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">News</h1><div style={{color:'red'}}>에러: {error}</div></div>;
  }

  return (
    <div className="professor-container">
      <h1 className="professor-title">News & Announcements</h1>
      
      <section className="biography-section">
        <h2 className="section-title">최신 소식</h2>
        <div className="news-grid">
          {news.slice().reverse().map((item, index) => (
            <NewsCard key={index} news={item} />
          ))}
          {/* {news.map((item, index) => (
            <NewsCard key={index} news={item} />
          ))} */}
        </div>
      </section>
    </div>
  );
}
