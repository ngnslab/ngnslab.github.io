import './Member.css';
import StudentCard from '../components/StudentCard';

export default function Member() {
  const members = {
    professor: [
      { name: "김종현", email: "prof@example.com" },
    ],
    phd: [
      { name: "김민규", email: "phd1@example.com" }
    ],
    master: [
      { name: "서예린", email: "ms1@example.com" }
    ],
    undergrad: [
      { name: "김준식", email: "junshik@example.com" }
    ]
  };

  return (
    <div className="member-container">
      <h1 className="member-title">Member</h1>
      {/* 지도교수 */}
      <section className="member-section">
        <h2 className="member-role-title">Professor</h2>
        <div className="prof-grid">
          <div className="prof-card">
            <img src="/prof.jpg" alt="김종현" className="professor-photo" />
            <div className="prof-info">
              <h2 className="prof-name">김종현 (Jonghyun Kim)</h2>
              <h3 className="prof-contact-title">Contact</h3>
              <p className="prof-email">
                Email : <a href="mailto:kjh@sejong.ac.kr" className="member-email-link"> kjh@sejong.ac.kr</a>
              </p>
              <h3 className="member-education-title">Education</h3>

            </div>
          </div>

        </div>
      <hr className="member-divider" /> {/* 가로선 추가 */}
      </section>
      <section className="member-section">
        <h2 className="member-role-title">PhD</h2>
        <StudentCard name="김민규" email="test" />
      </section>
      <hr className="member-divider" /> {/* 가로선 추가 */}
      <section className="member-section">
        <h2 className="member-role-title">Master</h2>
        <StudentCard name="서예린" email="test" />
      </section>

      <hr className="member-divider" /> {/* 가로선 추가 */}
      <section className="member-section">
        <h2 className="member-role-title">Ungraduated</h2>
        <StudentCard name="김준식" email="test" />
        
      </section>
      
    </div>
  );
}
