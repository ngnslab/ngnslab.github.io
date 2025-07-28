// src/components/StudentCard.jsx
import './StudentCard.css'; // 선택 사항

export default function StudentCard({ name, email }) {
  return (
    <div className="member-card">
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
