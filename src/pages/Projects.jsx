
import './Projects.css';
import { useEffect, useState } from 'react';

export default function Research() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/research.json')
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
    return <div className="professor-container"><h1 className="professor-title">Research</h1><div style={{color:'#fff'}}>로딩 중...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">Research</h1><div style={{color:'red'}}>에러: {error}</div></div>;
  }
  if (!data) return null;

  return (
    <div className="professor-container">
      <h1 className="professor-title">Research</h1>
      {/* Project */}
      <section className="biography-section">
        <h2 className="section-title">Project</h2>
        <hr style={{border: '1px solid #fff', marginBottom: '1.5rem'}} />
        <details open>
          <summary style={{fontWeight:'bold',color:'#b5e0ff',fontSize:'1.1rem'}}>진행 중인 프로젝트</summary>
          <ol style={{color:'#fff',paddingLeft:'1.5rem'}}>
            {data.ongoingProjects && data.ongoingProjects.map((p,i) => (
              <li key={i} style={{marginBottom:'1em',lineHeight:1.6}}>
                <span style={{fontWeight:'bold',color:'#fff'}}>[{i+1}]</span> {p.title} / {p.description} / {p.period} / {p.role}
              </li>
            ))}
          </ol>
        </details>
        <details>
          <summary style={{fontWeight:'bold',color:'#b5e0ff',fontSize:'1.1rem'}}>완료된 프로젝트</summary>
          <ol style={{color:'#fff',paddingLeft:'1.5rem'}}>
            {data.completedProjects && data.completedProjects.map((p,i) => (
              <li key={i} style={{marginBottom:'1em',lineHeight:1.6}}>
                <span style={{fontWeight:'bold',color:'#fff'}}>[{i+1}]</span> {p.title} / {p.description} / {p.period} / {p.role}
              </li>
            ))}
          </ol>
        </details>
      </section>
      {/* Patent */}
      <section className="experience-section">
        <h2 className="section-title">Patent</h2>
        <hr style={{border: '1px solid #fff', marginBottom: '1.5rem'}} />
        <details open>
          <summary style={{fontWeight:'bold',color:'#b5e0ff',fontSize:'1.1rem'}}>국제 특허</summary>
          <ol style={{color:'#fff',paddingLeft:'1.5rem'}}>
            {data.internationalPatents && data.internationalPatents.map((p,i) => (
              <li key={i} style={{marginBottom:'1em',lineHeight:1.6}}>
                <span style={{fontWeight:'bold',color:'#fff'}}>[{i+1}]</span> {p.title} / {p.number} / {p.year}
              </li>
            ))}
          </ol>
        </details>
        <details>
          <summary style={{fontWeight:'bold',color:'#b5e0ff',fontSize:'1.1rem'}}>국내 특허</summary>
          <ol style={{color:'#fff',paddingLeft:'1.5rem'}}>
            {data.domesticPatents && data.domesticPatents.map((p,i) => (
              <li key={i} style={{marginBottom:'1em',lineHeight:1.6}}>
                <span style={{fontWeight:'bold',color:'#fff'}}>[{i+1}]</span> {p.title} / {p.number} / {p.year}
              </li>
            ))}
          </ol>
        </details>
      </section>
      {/* 기술이전 */}
      <section className="experience-section">
        <h2 className="section-title">기술 이전</h2>
        <hr style={{border: '1px solid #fff', marginBottom: '1.5rem'}} />
        <ol style={{color:'#fff',paddingLeft:'1.5rem'}}>
          {data.technologyTransfers && data.technologyTransfers.map((t,i) => (
            <li key={i} style={{marginBottom:'1em',lineHeight:1.6}}>
              <span style={{fontWeight:'bold',color:'#fff'}}>[{i+1}]</span> {t.title} / {t.organization} / {t.year}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
