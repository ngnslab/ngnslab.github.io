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
                <p>세종대학교 광개토관 4xx호</p>
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
                <p>02-3408-XXXX</p>
              </div>
            </div>
          </div>
        </section>

        

        <section className="contact-section">
          <h2 className="contact-section-title">Location</h2>
          <div style={{ marginTop: "2.5rem", width: "100%" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.1376618761283!2d127.07213557619265!3d37.551820324971345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4d054f9b19b%3A0xf9d4d6a6582adce7!2z7ISc7Jq47Yq567OE7IucIOq1sOyekOuPmSDshLjsooXrjIDtlZnqtZAg7Jqw7KCV64u5!5e0!3m2!1sko!2skr!4v1755787326716!5m2!1sko!2skr"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "16px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="연구실 위치"
          ></iframe>
        </div>
        </section>
      </div>
    </div>
  );
}
