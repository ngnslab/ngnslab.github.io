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
        <div className="member-grid">
          <div className="member-card">
            <img src="../../public/prof.jpg" alt="김종현" className="professor-photo" />
            <div className="member-info">
              <h2>김종현 (Jonghyun Kim)</h2>
              <p>E-mail : kjh@sejong.ac.kr</p>
              <h3>Education</h3>

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
