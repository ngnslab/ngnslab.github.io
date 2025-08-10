// src/components/StudentCard.jsx
import './StudentCard.css';

export default function StudentCard({ name, email, image, interests, position }) {
  return (
    <div className="member-card">
      <div className="student-photo">
        <img 
          src={image || "/images/members/prof.jpg"} 
          alt={`${name} 프로필`} 
          className="student-image"
        />
      </div>
      <div className="student-info">
        <h3 className="student-name">{name}</h3>
        <p className="student-position">{position}</p>
        <p className="student-email">
          <a href={`mailto:${email}`} className="email-link">
            {email}
          </a>
        </p>
        {interests && (
          <div className="student-interests">
            <h4>관심 분야</h4>
            <ul className="interests-list">
              {interests.map((interest, index) => (
                <li key={index} className="interest-item">{interest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
