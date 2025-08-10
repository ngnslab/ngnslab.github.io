import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to NGNS Lab 👋</h1>
          <p className="hero-subtitle">
            세종대학교 정보보호학과 Next Generation Network Security 연구실
          </p>
          <p className="hero-description">
            네트워크 보안, 인공지능, UAV/드론 기술을 융합하여 
            차세대 보안 솔루션을 연구하는 연구실입니다.
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
            <div className="feature-icon">🔒</div>
            <h3>네트워크 보안</h3>
            <p>5G 네트워크 보안, Fake Base Station 탐지 및 방어 기술</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>인공지능</h3>
            <p>AI 기반 악성코드 탐지, 딥러닝을 활용한 보안 시스템</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚁</div>
            <h3>UAV/드론</h3>
            <p>드론 위치 무결성 검증, Flying Base Station 기술</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📡</div>
            <h3>이동통신</h3>
            <p>이동통신 보안, 채널 용량 및 성능 최적화</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="stats-title">연구실 현황</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">4+</div>
            <div className="stat-label">연구원</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">논문</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">학술발표</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">강의</div>
          </div>
        </div>
      </section>
    </div>
  );
}