
import './Research.css';
import { useEffect, useState } from 'react';
import ResearchList from '../components/ResearchList';

export default function Research() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/researchProjects.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="professor-container"><h1 className="professor-title">Research Projects</h1><div style={{color:'#4a5568'}}>로딩 중...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">Research Projects</h1><div style={{color:'red'}}>에러: {error}</div></div>;
  }
  if (!data) return null;

  return (
    <div className="professor-container">
      <h1 className="professor-title">Research Projects</h1>
      <section className="biography-section">
        <h2 className="section-title">Ongoing Projects</h2>
        <ResearchList
          items={data.ongoingProjects}
          renderItem={p => <>{p.title}, {p.description}, {p.period}</>}
        />
      </section>
      <section className="biography-section">
        <h2 className="section-title">Completed Projects</h2>
        <ResearchList
          items={data.completedProjects}
          renderItem={p => <>{p.title}, {p.description}, {p.period}</>}
        />
      </section>
    </div>
  );
}
