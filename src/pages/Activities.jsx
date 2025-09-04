
import './Activities.css';
import { useEffect, useState } from 'react';

export default function Activities() {
  const [majorActivities, setMajorActivities] = useState([]);
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/activities.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        setMajorActivities(data.majorActivities || []);
        setAwards(data.awards || []);
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
      {/* 주요 활동 */}
      <section className="biography-section">
        <h2 className="section-title">Major Activities</h2>
        <ul className="activity-list">
          {majorActivities.map((item, i) => (
            <li key={i} className="activity-item">
              <span className="activity-content">{item}</span>
            </li>
          ))}
        </ul>
      </section>
      {/* 수상 */}
      <section className="biography-section">
        <h2 className="section-title">Awards</h2>
        <ul className="activity-list">
          {awards.map((item, i) => (
            <li key={i} className="activity-item">
              <span className="activity-content">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
