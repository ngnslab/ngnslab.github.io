import './Notice.css';
import { useEffect, useState } from 'react';

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/notice.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        setNotices(data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="professor-container"><h1 className="professor-title">Notice</h1><div style={{color:'#4a5568'}}>로딩 중...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">Notice</h1><div style={{color:'red'}}>에러: {error}</div></div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="professor-container">
      <h1 className="professor-title">Notice</h1>
      
      <section className="biography-section">
        <h2 className="section-title">공지사항</h2>
        <div className="notice-list">
          {notices.map((notice, index) => (
            <div key={index} className="notice-item">
              <div className="notice-header">
                <div className="notice-meta">
                  <span className="notice-type">{notice.type}</span>
                  <span className="notice-date">{formatDate(notice.date)}</span>
                </div>
                {notice.important && <span className="notice-badge">중요</span>}
              </div>
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-content">{notice.content}</p>
              {notice.attachment && (
                <div className="notice-attachment">
                  <span className="attachment-icon">📎</span>
                  <a 
                    href={notice.attachment.url} 
                    className="attachment-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {notice.attachment.name}
                  </a>
                </div>
              )}
              {notice.link && (
                <a 
                  href={notice.link} 
                  className="notice-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  자세히 보기 →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
