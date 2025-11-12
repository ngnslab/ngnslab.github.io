import './Home.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 배경 이미지 배열
  const heroImages = [
    '/images/home/6G_1.png', 
    '/images/home/6G_2.png'

  ];

  useEffect(() => {
    // News와 Notice 데이터를 병렬로 가져오기
    Promise.all([
      fetch('/data/news.json').then(res => res.json()),
      fetch('/data/notice.json').then(res => res.json())
    ])
    .then(([newsData, noticeData]) => {
      setNews(newsData.slice(0, 5));
      setNotices(noticeData.slice(0, 5));
      setLoading(false);
    })
    .catch(err => {
      console.error('데이터 로딩 실패:', err);
      setLoading(false);
    });
  }, []);

  // 배경 이미지 자동 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="home-container">
      {/* 전체 화면 히어로 섹션 */}
      <section className="fullscreen-hero">
        {/* 배경 이미지들 */}
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hero Background ${index + 1}`}
            className={`hero-background-img ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
        
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to NGNS Lab</h1>
            <p className="hero-subtitle">
              Next Generation Network Security Lab
            </p>
            <p className="hero-description">
              본 연구실은 급변하는 디지털 환경 속에서 발생하는 다양한 사이버 위협에 대응하고, 안전한 네트워크 환경 구축을 위한 핵심 보안 기술(사이버 공격대응, 클라우드 보안, 이동통신 보안 등)을 연구하고 있습니다. 연구와 더불어 다양한 국제표준화 활동에 참여하고 있습니다.
            </p>
            <Link to="/contact" className="hero-contact-btn">
              Contact Us
            </Link>
          </div>

          {/* 인디케이터 */}
          <div className="hero-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`hero-indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`${index + 1}번째 이미지로 이동`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Main Research Fields</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>5G/6G Mobile Comm. Security</h3>
            <p>Secure architectures for 5G/6G, Open RAN, and NTN with ITU-T, ITU-R standardization</p>
          </div>
          <div className="feature-card">
            <h3>System Security using AI</h3>
            <p>AI-based malware, Anomaly detection, Anti-Vaccine system development</p>
          </div>
          <div className="feature-card">
            <h3>Cloud/Network Security</h3>
            <p>Security for NW threat analysis and countermeasure development</p>
          </div>
          <div className="feature-card">
            <h3>UAV/Drones Security</h3>
            <p>Security for UAVs, V2X, and D2D, Detection of UxNB anomalies</p>
          </div>
        </div>
      </section>

      {/* Board Section */}
      <h2 className="features-title">News & Notice</h2>
      <section className="board-section">
        <div className="board-grid">
          {/* News 게시판 */}
          <div className="board-card">
            <div className="board-header">
              <h2 className="board-title">News</h2>
              <Link to="/news" className="board-more">더보기 →</Link>
            </div>
            <div className="board-list">
              {loading ? (
                <div className="board-loading">로딩 중...</div>
              ) : (
                news.map((item, index) => (
                  <div 
                    key={index} 
                    className="board-item"
                    onClick={() => item.id && navigate(`/news/${item.id}`)}
                    style={{ cursor: item.id ? 'pointer' : 'default' }}
                  >
                    <h3 className="board-item-title">{item.title}</h3>
                    <span className="board-date">{formatDate(item.date)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Notice 게시판 */}
          <div className="board-card">
            <div className="board-header">
              <h2 className="board-title">Notice</h2>
              <Link to="/notice" className="board-more">더보기 →</Link>
            </div>
            <div className="board-list">
              {loading ? (
                <div className="board-loading">로딩 중...</div>
              ) : (
                notices.map((item, index) => (
                  <div 
                    key={index} 
                    className="board-item"
                    onClick={() => item.id && navigate(`/notice/${item.id}`)}
                    style={{ cursor: item.id ? 'pointer' : 'default' }}
                  >
                    <h3 className="board-item-title">{item.title}</h3>
                    <span className="board-date">{formatDate(item.date)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}