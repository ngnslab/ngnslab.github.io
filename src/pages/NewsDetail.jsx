import './NewsDetail.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 보고 있는 이미지 인덱스
  
  useEffect(() => {
    // 데이터 불러오기
    fetch('/data/news.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        // ID에 해당하는 뉴스 찾기
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
  // // 이미지 배열 처리
  // const images = news ? (
  //   Array.isArray(news.image)
  //     ? news.images
  //     : news.image
  //       ? [news.image]
  //       : []  
  // ) : [];

    // 이전 이미지로 이동
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? news.image.length - 1 : prev - 1
    );
  };

  // 다음 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === news.image.length - 1 ? 0 : prev + 1
    );
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

  // 이미지가 여러 개인지 확인
  const hasMultipleImages = news.image && news.image.length > 1;

  return (
    <div className="news-detail-container">
      <div className="news-detail-content">
        <button onClick={() => navigate('/news')} className="back-button">
          ←
        </button>
        
        <article className="news-detail-article">
          <header className="news-detail-header">
            <div className="news-detail-meta">
              <span className="news-detail-date">{formatDate(news.date)}</span>
            </div>
            <h1 className="news-detail-title">{news.title}</h1>
          </header>
          {/* 이미지 슬라이더 */}
          {news.image && news.image.length > 0 && (
            <div className="news-detail-image-slider">
              {/* 현재 선택된 이미지만 표시 */}
              <img 
                src={news.image[currentImageIndex]} 
                alt={`${news.title} - ${currentImageIndex + 1}`}
                className="news-detail-thumbnail"
              />
              
              {/* 이미지가 2개 이상일 때만 슬라이드 컨트롤 표시 */}
              {hasMultipleImages && (
                <>
                  {/* 이전 버튼 */}
                  <button 
                    className="slider-nav prev" 
                    onClick={handlePrevImage}
                    aria-label="이전 이미지"
                  >
                    ‹
                  </button>
                  
                  {/* 다음 버튼 */}
                  <button 
                    className="slider-nav next" 
                    onClick={handleNextImage}
                    aria-label="다음 이미지"
                  >
                    ›
                  </button>
                  
                  {/* 하단 인디케이터 (동그라미) */}
                  <div className="slider-indicators">
                    {news.image.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`${index + 1}번째 이미지`}
                      />
                    ))}
                  </div>
                  
                  {/* 이미지 카운터 (1/3) */}
                  <div className="slider-counter">
                    {currentImageIndex + 1} / {news.image.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* {news.image && (
            <div className="news-detail-image">
              {news.image.map((imgSrc, index) => (
                <img 
                  key={index}
                  src={imgSrc} 
                  alt={`${news.title} 이미지 ${index + 1}`}
                  className="news-detail-thumbnail"
                />  
              ))}
            </div>
          )} */}

          <div className="news-detail-body">
            <p className="news-detail-description">{news.description}</p>

            {news.content && (
              <div className="news-detail-full-content">
                {news.content}
              </div>
            )}
            {news.link && (
              <a 
                href={news.link} 
                className="news-detail-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                관련 링크 보기
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
