import './NewsCard.css';

export default function NewsCard({ news }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('ko-KR', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  const { day, month, year } = formatDate(news.date);

  return (
    <div className="news-card">
      <div className="news-date">
        <div className="date-day">{day}</div>
        <div className="date-month">{month}</div>
        <div className="date-year">{year}</div>
      </div>
      <div className="news-content">
        <div className="news-category">{news.category}</div>
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
