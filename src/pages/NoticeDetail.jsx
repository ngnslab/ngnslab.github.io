import './NoticeDetail.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/notice.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        const foundNotice = data.find(item => item.id === parseInt(id));
        if (foundNotice) {
          setNotice(foundNotice);
        } else {
          setError('해당 공지사항을 찾을 수 없습니다');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="notice-detail-container">
        <div className="notice-detail-content">
          <div style={{color:'#4a5568'}}>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="notice-detail-container">
        <div className="notice-detail-content">
          <div style={{color:'red'}}>에러: {error || '공지사항을 찾을 수 없습니다'}</div>
          <button onClick={() => navigate('/notice')} className="back-button">
            공지사항 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notice-detail-container">
      <div className="notice-detail-content">
        <button onClick={() => navigate('/notice')} className="back-button">
          ←
        </button>
        
        <article className="notice-detail-article">
          <header className="notice-detail-header">
            <div className="notice-detail-meta">
              <span className="notice-detail-date">{formatDate(notice.date)}</span>
            </div>
            <h1 className="notice-detail-title">{notice.title}</h1>
          </header>

          <div className="notice-detail-body">
            <div className="notice-detail-content-text">
              {notice.content}
            </div>

            {notice.link && (
              <div className="notice-detail-external-link">
                <a 
                  href={notice.link} 
                  className="external-link-button"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  →
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
