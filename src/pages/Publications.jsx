
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
    return <div className="professor-container"><h1 className="professor-title">Publications</h1><div style={{color:'#4a5568'}}>로딩 중...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">Publications</h1><div style={{color:'red'}}>에러: {error}</div></div>;
  }

  // 표준 학술 논문 형식으로 포맷팅하는 함수
  const formatPaper = (paper) => {
    let formatted = "";
    
    // 저자
    if (paper.authors) {
      formatted += paper.authors + ", ";
    }
    
    // 제목
    if (paper.title) {
      formatted += paper.title + ", ";
    }
    
    // 저널 (이탤릭)
    if (paper.journal) {
      formatted += "*" + paper.journal + "*";
    }
    
    // 페이지
    if (paper.pages) {
      formatted += ", pp." + paper.pages;
    }
    
    // 월과 연도
    if (paper.month && paper.year) {
      formatted += ", " + paper.month + " " + paper.year;
    } else if (paper.year) {
      formatted += ", " + paper.year;
    }
    
    return formatted;
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
              {formatPaper(paper).split('*').map((part, index) => {
                if (index % 2 === 1) {
                  // 홀수 인덱스는 이탤릭 (저널명)
                  return <em key={index} className="journal-name">{part}</em>;
                } else {
                  return <span key={index}>{part}</span>;
                }
              })}
            </li>
          ))}
        </ul>
      </section>
      {/* 국내 논문 */}
      <section className="experience-section">
        <h2 className="section-title">Domestic Journal</h2>
        <ul className="publication-list">
          {domesticPapers.map((paper, idx) => (
            <li key={idx} className="publication-item">
              {formatPaper(paper).split('*').map((part, index) => {
                if (index % 2 === 1) {
                  // 홀수 인덱스는 이탤릭 (저널명)
                  return <em key={index} className="journal-name">{part}</em>;
                } else {
                  return <span key={index}>{part}</span>;
                }
              })}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
