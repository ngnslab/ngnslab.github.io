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
  const phdMembers = members.filter(member => member.position.includes("PhD Student"));
  const masterMembers = members.filter(member => member.position.includes("Master Student"));
  const undergraduateMembers = members.filter(member => member.position.includes("Undergraduate Student"));
  const internshipStudents = members.filter(member => member.position.includes("Internship Student"));
  const currentUndergraduateMembers = undergraduateMembers.filter(member => member.isCurrent !== false);
  const formerUndergraduateMembers = undergraduateMembers.filter(member => member.isCurrent === false);
  const currentInternshipStudents = internshipStudents.filter(member => member.isCurrent !== false);
  const formerInternshipStudents = internshipStudents.filter(member => member.isCurrent === false);

  // Name에 포함된 "(Part-time)" 태그를 추출해 메타 정보로 사용한다.
  const isPartTimeMember = (member) => member.name?.includes('(Part-time)');

  // 카드 제목에는 이름만 표시하고 "(Part-time)" 태그는 제거한다.
  const getDisplayName = (member) => member.name?.replace(' (Part-time)', '') || member.name;

  // Position 옆에 Part-time/period를 함께 붙여 표시한다.
  const getPositionWithMeta = (member) => {
    const badges = [];
    if (isPartTimeMember(member)) badges.push('Part-time');
    if (member.period) badges.push(member.period);
    return badges.length > 0 ? `${member.position} (${badges.join(', ')})` : member.position;
  };

  return (
    <div className="member-container">
      <h1 className="member-title">Members</h1>
      
      {/* 교수님 */}
      <h2 className="member-role-title">Professor</h2>
      <Professor></Professor>
      
      <h2 className="member-role-title">Students</h2>
      {/* PhD 학생들 */}
      <section className="member-section">
        <h2 className="member-role-title">PhD Students</h2>
        <div className="student-grid">
          {phdMembers.map((member, index) => (
            <StudentCard 
              key={`phd-${index}`} 
              name={getDisplayName(member)}
              image={member.image}
              position={getPositionWithMeta(member)}
              interests={member.interests}
            />
          ))}
        </div>
        <hr className="member-divider" />
      </section>
      
      {/* Master 학생들 */}
      <section className="member-section">
        <h2 className="member-role-title">Master Students</h2>
        <div className="student-grid">
          {masterMembers.map((member, index) => (
            <StudentCard 
              key={`master-${index}`} 
              name={getDisplayName(member)}
              image={member.image}
              position={getPositionWithMeta(member)}
              interests={member.interests}
            />
          ))}
        </div>
        <hr className="member-divider" />
      </section>

      {/* Undergraduate 학생들 */}
      <section className="member-section">
        <h2 className="member-role-title">B.S. Students</h2>
        <div className="student-grid">
          {currentUndergraduateMembers.map((member, index) => (
            <StudentCard 
              key={`bachelor-${index}`} 
              name={getDisplayName(member)}
              image={member.image}
              position={getPositionWithMeta(member)}
              interests={member.interests}
            />
          ))}
        </div>
        {formerUndergraduateMembers.length > 0 && (
          <div className="former-internship-list">
            <h3 className="former-internship-title">Former B.S. Students</h3>
            <ul>
              {formerUndergraduateMembers.map((member, index) => (
                <li key={`bachelor-former-${index}`}>
                  {getDisplayName(member)}
                  {member.period ? ` (${member.period})` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      {/* 인턴 학생들 */}
      <section className="member-section">
        <h2 className="member-role-title">Student Interns</h2>
        <div className="student-grid">
          {currentInternshipStudents.map((member, index) => (
            <StudentCard 
              key={`intern-current-${index}`}
              name={getDisplayName(member)}
              image={member.image}
              position={getPositionWithMeta(member)}
              interests={member.interests}
            />
          ))}
        </div>
        {formerInternshipStudents.length > 0 && (
          <div className="former-internship-list">
            <h3 className="former-internship-title">Former Student Interns</h3>
            <ul>
              {formerInternshipStudents.map((member, index) => (
                <li key={`intern-former-${index}`}>
                  {getDisplayName(member)}
                  {member.period ? ` (${member.period})` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
