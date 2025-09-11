import './Home.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
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
      {/* 전체 화면 배경 이미지 섹션 */}
      <section className="fullscreen-hero">
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
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">주요 연구 분야</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>차세대 이동통신 보안</h3>
            <p>5G/6G 및 O-RAN, NTN 환경에서의 무선 및 코어 네트워크 보안 구조 설계, 이동통신 표준화 참여(ITU-T, TTA), 인증 기술, RIS 기반 보상 시스템</p>
          </div>
          <div className="feature-card">
            <h3>인공지능</h3>
            <p>악성코드 탐지, 이상행위 탐지, Zero-day 공격 탐지, AODA 시스템 개발, 시계열 기반 분석(Chronicle)</p>
          </div>
          <div className="feature-card">
            <h3>네트워크 보안</h3>
            <p>고속 네트워크 환경에서의 포렌식 분석, 네트워크 플로우 기반 탐지, 증거 수집 및 공격 경로 추적 기술. 클라우드 기반 보안 관제, SIEM 시스템, Threat Visualization 및 자동화 대응 기술</p>
          </div>
          <div className="feature-card">
            <h3>UAV/드론</h3>
            <p>드론, 차량 간 통신(V2X), IoV 등에서의 물리계 기반 보안 연구. 드론 기지국의 위치 오차/전력 탐지, D2D 클러스터 내 위협 대응, V2V/V2I 통신 위협 분석</p>
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
                    <h3 className="board-item-title">
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