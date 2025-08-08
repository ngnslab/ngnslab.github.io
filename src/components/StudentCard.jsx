// src/components/StudentCard.jsx
import './StudentCard.css'; // 선택 사항

export default function StudentCard({ name, email }) {
  return (
    <div className="member-card">
      <h3 className="student-name">{name}</h3>
      <p className="student-email">
        <a href={`mailto:${email}`} className="email-link">
          {email}
        </a>
      </p>
    </div>
  );
}
