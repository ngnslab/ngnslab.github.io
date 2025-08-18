import './Member.css';
import StudentCard from '../components/StudentCard';

export default function Member({ members }) {
  // members가 없을 때의 처리
  if (!members || members.length === 0) {
    return (
      <div className="member-container">
        <h1 className="member-title">Member</h1>
        <p>Loading members...</p>
      </div>
    );
  }

  // 각 position별로 멤버 필터링
  const phdMembers = members.filter(member => member.position.includes("PhD"));
  const masterMembers = members.filter(member => member.position.includes("Master"));
  const bachelorMembers = members.filter(member => member.position.includes("Bachelor"));

  return (
    <div className="member-container">
      <h1 className="member-title">Member</h1>
      
      {/* 교수님 */}
      <section className="member-section">
        <h2 className="member-role-title">Professor</h2>
        <div className="prof-grid">
          <div className="prof-card">
            <img src="/images/members/prof.jpg" alt="김종현 교수님" className="professor-photo" />
            <div className="prof-info">
              <h2 className="prof-name">김종현 (Jonghyun Kim)</h2>
              <h3 className="prof-contact-title">Contact</h3>
              <p className="prof-email">
                Email: <a href="mailto:kjh@sejong.ac.kr" className="member-email-link">kjh@sejong.ac.kr</a>
              </p>
              <h3 className="member-education-title">Education</h3>
            </div>
          </div>
        </div>
        <hr className="member-divider" />
      </section>

      {/* PhD 학생들 */}
      <section className="member-section">
        <h2 className="member-role-title">PhD</h2>
        <div className="student-grid">
          {phdMembers.map((member, index) => (
            <StudentCard 
              key={`phd-${index}`} 
              name={member.name} 
              email={member.email}
              image={member.image}
              position={member.position}
              interests={member.interests}
            />
          ))}
        </div>
        <hr className="member-divider" />
      </section>

      {/* Master 학생들 */}
      <section className="member-section">
        <h2 className="member-role-title">Master</h2>
        <div className="student-grid">
          {masterMembers.map((member, index) => (
            <StudentCard 
              key={`master-${index}`} 
              name={member.name} 
              email={member.email}
              image={member.image}
              position={member.position}
              interests={member.interests}
            />
          ))}
        </div>
        <hr className="member-divider" />
      </section>

      {/* Undergraduate 학생들 */}
      <section className="member-section">
        <h2 className="member-role-title">Undergraduate</h2>
        <div className="student-grid">
          {bachelorMembers.map((member, index) => (
            <StudentCard 
              key={`bachelor-${index}`} 
              name={member.name} 
              email={member.email}
              image={member.image}
              position={member.position}
              interests={member.interests}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
