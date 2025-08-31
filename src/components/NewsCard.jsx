import './NewsCard.css';

export default function NewsCard({ news }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="news-card">
      <div className="news-image">
        <img 
          src={news.image || '/lab/lab.png'} 
          alt={news.title}
          className="news-thumbnail"
        />
      </div>
      <div className="news-content">
        <div className="news-meta">
          <span className="news-category">{news.category}</span>
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
          >
            자세히 보기 →
          </a>
        )}
      </div>
    </div>
  );
}
