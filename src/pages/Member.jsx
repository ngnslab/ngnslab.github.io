import './Member.css';
import StudentCard from '../components/StudentCard';
import Professor from '../components/Professor';
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
  const internshipMembers = members.filter(member => member.position.includes("Internship"));

  return (
    <div className="member-container">
      <h1 className="member-title">Members</h1>
      
      {/* 교수님 */}
      <h2 className="member-role-title">Professor</h2>
      <Professor></Professor>
      
      <h2 className="member-role-title">Students</h2>
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
        <h2 className="member-role-title">Bachelor</h2>
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
      {/* 인턴 학생들 */}
      <section className="member-section">
        <h2 className="member-role-title">Internship(1st)</h2>
        <div className="student-grid">
          {internshipMembers.map((member, index) => (
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
