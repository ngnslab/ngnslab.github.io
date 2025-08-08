import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-content">
        <section className="contact-section">
          <h2 className="contact-section-title">연구실 정보</h2>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">🏛️</div>
              <div className="contact-details">
                <h3>NGNS Lab</h3>
                <p>세종대학교 정보보호학과</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>위치</h3>
                <p>세종대학교 대양AI센터</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>이메일</h3>
                <p><a href="mailto:kjh@sejong.ac.kr" className="contact-link">kjh@sejong.ac.kr</a></p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <h3>전화번호</h3>
                <p>02-3408-XXXX</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2 className="contact-section-title">연구 분야</h2>
          <div className="research-areas">
            <div className="research-area">
              <h3>🔒 네트워크 보안</h3>
              <p>5G 네트워크 보안, Fake Base Station 탐지</p>
            </div>
            <div className="research-area">
              <h3>🤖 인공지능</h3>
              <p>AI 기반 악성코드 탐지, 딥러닝 응용</p>
            </div>
            <div className="research-area">
              <h3>🚁 UAV/드론</h3>
              <p>드론 위치 무결성 검증, Flying Base Station</p>
            </div>
            <div className="research-area">
              <h3>📡 이동통신</h3>
              <p>이동통신 보안, 채널 용량 연구</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
