import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-content">
        <section className="contact-section">
          <h2 className="contact-section-title">Information</h2>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-details">
                <h3>위치</h3>
                <p>세종대학교 대양AI센터 308호</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-details">
                <h3>이메일</h3>
                <p>Professor: <a href="mailto:kjh@sejong.ac.kr" className="contact-link">kjh@sejong.ac.kr</a></p>
                <p>Lab: <a href="mailto:kjh@sejong.ac.kr" className="contact-link">ngnslab@gmail.com</a></p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-details">
                <h3>전화번호</h3>
                <p>02) 3408-3712 </p>
              </div>
            </div>
          </div>
        </section>

        

        <section className="contact-section">
          <h2 className="contact-section-title">Location</h2>
          <div style={{ marginTop: "2.5rem", width: "100%" }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d790.7921750251086!2d127.07511366963116!3d37.551088998252695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca54f4e5dc7ab%3A0xafd9d9f79e77d003!2z7IS47KKF64yA7ZWZ6rWQIOuMgOyWkSBBSeyEvO2EsA!5e0!3m2!1sko!2skr!4v1777257733633!5m2!1sko!2skr" 
            width="600" 
            height="400" 
            style={{border:0}} 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        </section>
      </div>
    </div>
  );
}
