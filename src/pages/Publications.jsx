
import './Publications.css';
import { useEffect, useState } from 'react';

export default function Publications() {
  const [internationalPapers, setInternationalPapers] = useState([]);
  const [domesticPapers, setDomesticPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/publications.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        setInternationalPapers(data.internationalPapers || []);
        setDomesticPapers(data.domesticPapers || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="professor-container"><h1 className="professor-title">Publications</h1><div style={{color:'#fff'}}>로딩 중...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">Publications</h1><div style={{color:'red'}}>에러: {error}</div></div>;
  }

  return (
    <div className="professor-container">
      <h1 className="professor-title">Publications</h1>
      {/* 국외 논문 */}
      <section className="biography-section">
        <h2 className="section-title">International Journel</h2>
        
        <ul style={{color:'#fff', paddingLeft: '1.5rem'}}>
          {internationalPapers.map((paper, idx) => (
            <li key={idx} style={{marginBottom: '1.2em', lineHeight: 1.6}}>
              <span style={{fontWeight:'bold', color:'#fff'}}>[{idx+1}]</span> {paper.title}
              {paper.authors && <> / <span style={{color:'#b5e0ff'}}>{paper.authors}</span></>}
              {paper.journal && <> / <span style={{color:'#b5e0ff'}}>{paper.journal}</span></>}
              {paper.volume && <> / Vol.{paper.volume}</>}
              {paper.pages && <> / pp.{paper.pages}</>}
              {paper.year && <> / {paper.year}</>}
            </li>
          ))}
        </ul>
      </section>
      {/* 국내 논문 */}
      <section className="experience-section">
        <h2 className="section-title">Domestic Journel</h2>
        <ol style={{color:'#fff', paddingLeft: '1.5rem'}}>
          {domesticPapers.map((paper, idx) => (
            <li key={idx} style={{marginBottom: '1.2em', lineHeight: 1.6}}>
              <span style={{fontWeight:'bold', color:'#fff'}}>[{idx+1}]</span> {paper.title}
              {paper.authors && <> / <span style={{color:'#b5e0ff'}}>{paper.authors}</span></>}
              {paper.journal && <> / <span style={{color:'#b5e0ff'}}>{paper.journal}</span></>}
              {paper.volume && <> / Vol.{paper.volume}</>}
              {paper.pages && <> / pp.{paper.pages}</>}
              {paper.year && <> / {paper.year}</>}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
