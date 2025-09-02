import './NewsCard.css';
import { useNavigate } from 'react-router-dom';

export default function NewsCard({ news }) {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleCardClick = () => {
    if (news.id) {
      navigate(`/news/${news.id}`);
    }
  };

  return (
    <div className="news-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="news-image">
        <img 
          src={news.image || '/lab/lab.png'} 
          alt={news.title}
          className="news-thumbnail"
        />
      </div>
      <div className="news-content">
        <div className="news-meta">
          <span className="news-date">{formatDate(news.date)}</span>
        </div>
        <h3 className="news-title">{news.title}</h3>
        <p className="news-description">{news.description}</p>
        {news.link && (
          <a 
            href={news.link} 
            className="news-link" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            외부 링크 →
          </a>
        )}
      </div>
    </div>
  );
}
