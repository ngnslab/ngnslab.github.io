
import './Publications.css';
import { useEffect, useState } from 'react';

export default function Publications() {
  const [internationalPapers, setInternationalPapers] = useState([]);
  const [domesticPapers, setDomesticPapers] = useState([]);
  const [internationalConferences, setInternationalConferences] = useState([]);
  const [domesticConferences, setDomesticConferences] = useState([]);
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
        setInternationalConferences(data.internationalConferences || []);
        setDomesticConferences(data.domesticConferences || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="professor-container"><h1 className="professor-title">Publications</h1><div style={{color:'#4a5568'}}>로딩 중...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">Publications</h1><div style={{color:'red'}}>에러: {error}</div></div>;
  }

  // 표준 학술 논문 인용 형식으로 렌더링하는 함수
  const renderPaper = (paper) => {
    return (
      <>
        {/* 저자 */}
        {paper.authors && <span>{paper.authors}. </span>}
        
        {/* 제목 */}
        {paper.title && <span>"{paper.title}." </span>}
        
        {/* 저널명 (이탤릭) */}
        {paper.journal && (
          <span style={{
            fontStyle: 'italic', 
            color: '#2b6cb0', 
            fontWeight: 'normal',
            fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
          }}>
            {paper.journal}
          </span>
        )}
        
        {/* 볼륨/호수 정보가 저널명에 포함되어 있지 않은 경우 */}
        {paper.volume && <span> {paper.volume}</span>}
        {paper.issue && <span>, no.{paper.issue}</span>}
        
        {/* 페이지 */}
        {paper.pages && <span> ({paper.year}): {paper.pages}.</span>}
        {!paper.pages && paper.year && <span> ({paper.year}).</span>}
      </>
    );
  };

  // 학회 논문 인용 형식으로 렌더링하는 함수
  const renderConference = (conference) => {
    return (
      <>
        {/* 저자 */}
        {conference.authors && <span>{conference.authors}, </span>}
        
        {/* 제목 */}
        {conference.title && <span>"{conference.title}", </span>}
        
        {/* 학회명 */}
        {conference.conference && <span>{conference.conference}</span>}
        
        {/* 볼륨 */}
        {conference.volume && <span>, {conference.volume}</span>}
        
        {/* 페이지 */}
        {conference.pages && <span>, {conference.pages}</span>}
        
        {/* 날짜 */}
        {conference.date && <span>, {conference.date}</span>}
      </>
    );
  };

  return (
    <div className="professor-container">
      <h1 className="professor-title">Publications</h1>
      {/* 국외 논문 */}
      <section className="biography-section">
        <h2 className="section-title">International Journal</h2>
        
        <ul className="publication-list">
          {internationalPapers.map((paper, idx) => (
            <li key={idx} className="publication-item">
              <span className="publication-content">
                {renderPaper(paper)}
              </span>
            </li>
          ))}
        </ul>
      </section>
      {/* 국내 논문 */}
      <section className="biography-section">
        <h2 className="section-title">Domestic Journal</h2>
        <ul className="publication-list">
          {domesticPapers.map((paper, idx) => (
            <li key={idx} className="publication-item">
              <span className="publication-content">
                {renderPaper(paper)}
              </span>
            </li>
          ))}
        </ul>
      </section>
      {/* 국제 학회 */}
      <section className="biography-section">
        <h2 className="section-title">International Conference</h2>
        <ul className="publication-list">
          {internationalConferences.map((conference, idx) => (
            <li key={idx} className="publication-item">
              <span className="publication-content">
                {renderConference(conference)}
              </span>
            </li>
          ))}
        </ul>
      </section>
      {/* 국내 학회 */}
      <section className="biography-section">
        <h2 className="section-title">Domestic Conference</h2>
        <ul className="publication-list">
          {domesticConferences.map((conference, idx) => (
            <li key={idx} className="publication-item">
              <span className="publication-content">
                {renderConference(conference)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
