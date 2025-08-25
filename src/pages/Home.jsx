import './Home.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [news, setNews] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // News와 Notice 데이터를 병렬로 가져오기
    Promise.all([
      fetch('/data/news.json').then(res => res.json()),
      fetch('/data/notice.json').then(res => res.json())
    ])
    .then(([newsData, noticeData]) => {
      // 최신 5개만 가져오기
      setNews(newsData.slice(0, 5));
      setNotices(noticeData.slice(0, 5));
      setLoading(false);
    })
    .catch(err => {
      console.error('데이터 로딩 실패:', err);
      setLoading(false);
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to NGNS Lab</h1>
          <p className="hero-subtitle">
            Next Generation Network Security Lab
          </p>
          <p className="hero-description">
          본 연구실은 급변하는 디지털 환경 속에서 발생하는 다양한 사이버 위협에 대응하고, 안전한 네트워크 환경 구축을 위한 핵심 보안 기술(사이버 공격대응, 클라우드 보안, 이동통신 보안 등)을 연구하고 있습니다. 연구와 더불어 다양한 국제표준화 활동에 참여하고 있습니다.
          </p>
        </div>
        <div className="hero-image">
          <img src="/lab/lab.png" alt="NGNS Lab" className="lab-image" />
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">주요 연구 분야</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>네트워크 보안</h3>
            <p>5G 네트워크 보안, Fake Base Station 탐지 및 방어 기술</p>
          </div>
          <div className="feature-card">
            <h3>인공지능</h3>
            <p>AI 기반 악성코드 탐지, 딥러닝을 활용한 보안 시스템</p>
          </div>
          <div className="feature-card">
            <h3>UAV/드론</h3>
            <p>드론 위치 무결성 검증, Flying Base Station 기술</p>
          </div>
          <div className="feature-card">
            <h3>이동통신</h3>
            <p>이동통신 보안, 채널 용량 및 성능 최적화</p>
          </div>
        </div>
      </section>

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
                  <div key={index} className="board-item">
                    <span className="board-category">{item.category}</span>
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
                  <div key={index} className="board-item">
                    <span className="board-category">{item.type}</span>
                    <h3 className="board-item-title">
                      {item.important && <span className="important-badge">중요</span>}
                      {item.title}
                    </h3>
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