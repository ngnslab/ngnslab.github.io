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
                <p>세종대학교 광개토관 407A</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-details">
                <h3>이메일</h3>
                <p><a href="mailto:kjh@sejong.ac.kr" className="contact-link">kjh@sejong.ac.kr</a></p>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.2102393893542!2d127.07059607619276!3d37.55011022506931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4daa73c863f%3A0xd6bd626e0463b230!2z7IS47KKF64yA7ZWZ6rWQIOq0keqwnO2GoOq0gA!5e0!3m2!1sko!2skr!4v1758009932804!5m2!1sko!2skr" 
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
