
import './Research.css';
import { useEffect, useState } from 'react';
import ResearchList from '../components/ResearchList';

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
      {/* Patent */}
      <section className="experience-section">
        <h2 className="section-title">International Patents</h2>
        <ResearchList
          items={data.internationalPatents}
          renderItem={p => (
            <>
              {p.title}
              {p.country ? ` (${p.country})` : ''}
              {p.applicationNumber ? `, Application No. ${p.applicationNumber}` : ''}
              {p.applicationDate ? `, ${p.applicationDate}` : ''}
              {p.patentNumber ? `, Patent No. ${p.patentNumber}` : ''}
              {p.patentDate ? `, ${p.patentDate}` : ''}
            </>
          )}
        />
      </section>
      <section className="experience-section">
        <h2 className="section-title">Domestic Patents</h2>
        <ResearchList
          items={data.domesticPatents}
          renderItem={p => (
            <>
              {p.title}
              {p.applicationNumber ? `, 출원번호 ${p.applicationNumber}` : ''}
              {p.applicationDate ? `, ${p.applicationDate}` : ''}
              {p.patentNumber ? `, 등록번호 ${p.patentNumber}` : ''}
              {p.patentDate ? `, ${p.patentDate}` : ''}
            </>
          )}
        />
      </section>
      {/* 기술이전 */}
      <section className="experience-section">
        <h2 className="section-title">Technology Transfers</h2>
        <ResearchList
          items={data.technologyTransfers}
          renderItem={t => <>{t.title} ({t.year})</>}
        />
      </section>
    </div>
  );
}
