
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
        <ul style={{ color: '#4a5568', paddingLeft: '1.5rem' }}>
          {majorActivities.map((item, i) => (
            <li key={i} style={{ marginBottom: '1em', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 'bold', color: '#2d3748' }}>{`[${i + 1}]`}</span> {item}
            </li>
          ))}
        </ul>
      </section>
      {/* 수상 */}
      <section className="experience-section">
        <h2 className="section-title">Awards</h2>
        <ul style={{ color: '#4a5568', paddingLeft: '1.5rem' }}>
          {awards.map((item, i) => (
            <li key={i} style={{ marginBottom: '1em', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 'bold', color: '#2d3748' }}>{`[${i + 1}]`}</span> {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
