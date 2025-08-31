import './NewsDetail.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/news.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        const foundNews = data.find(item => item.id === parseInt(id));
        if (foundNews) {
          setNews(foundNews);
        } else {
          setError('해당 뉴스를 찾을 수 없습니다');
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
      <div className="news-detail-container">
        <div className="news-detail-content">
          <div style={{color:'#4a5568'}}>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="news-detail-container">
        <div className="news-detail-content">
          <div style={{color:'red'}}>에러: {error || '뉴스를 찾을 수 없습니다'}</div>
          <button onClick={() => navigate('/news')} className="back-button">
            뉴스 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail-container">
      <div className="news-detail-content">
        <button onClick={() => navigate('/news')} className="back-button">
          ←
        </button>
        
        <article className="news-detail-article">
          <header className="news-detail-header">
            <div className="news-detail-meta">
              <span className="news-detail-category">{news.category}</span>
              <span className="news-detail-date">{formatDate(news.date)}</span>
            </div>
            <h1 className="news-detail-title">{news.title}</h1>
          </header>

          {news.image && (
            <div className="news-detail-image">
              <img 
                src={news.image} 
                alt={news.title}
                className="news-detail-thumbnail"
              />
            </div>
          )}

          <div className="news-detail-body">
            <p className="news-detail-description">{news.description}</p>
            
            {news.content && (
              <div className="news-detail-full-content">
                {news.content}
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
