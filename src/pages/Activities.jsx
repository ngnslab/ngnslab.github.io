
import './Activities.css';
import { useEffect, useState } from 'react';

export default function Activities() {
  const [seminars, setSeminars] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/activities.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        setSeminars(data.Seminars || {});
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="professor-container"><h1 className="professor-title">Activities</h1><div style={{color:'#4a5568'}}>Loading ...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">Activities</h1><div style={{color:'red'}}>Error</div></div>;
  }

  return (
    <div className="professor-container">
      <h1 className="professor-title">Activities</h1>
      {/* 세미나 */}
      <section className="biography-section">
        <h2 className="section-title">Seminars</h2>
        <ul className="activity-list">
          {Object.entries(seminars).map(([title, content], i) => (
            <li key={i} className="activity-item">
              <div className="activity-title">{title}</div>
              <div className="activity-content">{content}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
