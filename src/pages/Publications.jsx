
import './Publications.css';
import { useEffect, useState } from 'react';

function debugLog({ runId, hypothesisId, location, message, data }) {
  // #region agent log
  fetch('http://127.0.0.1:7246/ingest/8b7f06c0-5883-445f-beb0-30c38188b1ef', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': 'b8a8df',
    },
    body: JSON.stringify({
      sessionId: 'b8a8df',
      runId,
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

function parseBibtexFields(bibtex) {
  if (!bibtex || typeof bibtex !== 'string') return {};

  const parsed = {};
  const source = bibtex.replace(/\r?\n/g, ' ');
  const fieldRegex = /([A-Za-z-]+)\s*=\s*(\{[^{}]*\}|"[^"]*"|[^,]+)\s*,?/g;
  let match = fieldRegex.exec(source);

  while (match) {
    const key = match[1].trim().toLowerCase();
    let value = match[2].trim();

    if (
      (value.startsWith('{') && value.endsWith('}')) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1).trim();
    }

    parsed[key] = value;
    match = fieldRegex.exec(source);
  }

  return parsed;
}

function normalizePaperEntry(paper) {
  const bib = parseBibtexFields(paper?.bibtex);

  return {
    ...paper,
    authors: paper?.authors || bib.author || '',
    title: paper?.title || bib.title || '',
    journal: paper?.journal || bib.journal || '',
    volume: paper?.volume || bib.volume || '',
    issue: paper?.issue || bib.number || '',
    pages: paper?.pages || bib.pages || bib['article-number'] || '',
    month: paper?.month || bib.month || '',
    year: paper?.year || bib.year || '',
    doi: paper?.doi || bib.doi || '',
  };
}

function hasText(value) {
  return typeof value === 'string' ? value.trim() !== '' : value !== null && value !== undefined;
}

function safeText(value) {
  return typeof value === 'string' ? value.trim() : value;
}

export default function Publications() {
  const [internationalPapers, setInternationalPapers] = useState([]);
  const [domesticPapers, setDomesticPapers] = useState([]);
  const [internationalConferences, setInternationalConferences] = useState([]);
  const [domesticConferences, setDomesticConferences] = useState([]);
  const [internationalStandardization, setInternationalStandardization] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/researchAchievements.json')
      .then(res => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then(data => {
        setInternationalPapers((data.internationalPapers || []).map(normalizePaperEntry));
        setDomesticPapers((data.domesticPapers || []).map(normalizePaperEntry));
        setInternationalConferences(data.internationalConferences || []);
        setDomesticConferences(data.domesticConferences || []);
        setInternationalStandardization(data.internationalStandardization || []);
        // #region agent log
        debugLog({
          runId: 'pre-fix',
          hypothesisId: 'H4',
          location: 'src/pages/Publications.jsx:95',
          message: 'Loaded achievements data counts',
          data: {
            internationalPapers: (data.internationalPapers || []).length,
            domesticPapers: (data.domesticPapers || []).length,
            internationalConferences: (data.internationalConferences || []).length,
            domesticConferences: (data.domesticConferences || []).length,
            internationalStandardization: (data.internationalStandardization || []).length,
            linkedPdfEntries:
              [
                ...(data.internationalPapers || []),
                ...(data.domesticPapers || []),
                ...(data.internationalConferences || []),
                ...(data.domesticConferences || []),
                ...(data.internationalStandardization || []),
              ].filter(item => Boolean(item?.filePath)).length,
          },
        });
        // #endregion
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="professor-container"><h1 className="professor-title">Research Achievements</h1><div style={{color:'#4a5568'}}>로딩 중...</div></div>;
  }
  if (error) {
    return <div className="professor-container"><h1 className="professor-title">Research Achievements</h1><div style={{color:'red'}}>에러: {error}</div></div>;
  }

  const renderPdfButton = (filePath) => {
    if (!filePath) return null;
    const encodedPath = encodeURI(filePath);
    return (
      <a
        className="pdf-button"
        href={encodedPath}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          // #region agent log
          debugLog({
            runId: 'pre-fix',
            hypothesisId: 'H2',
            location: 'src/pages/Publications.jsx:130',
            message: 'PDF button clicked with raw and encoded path',
            data: { filePath, encodedPath },
          });
          // #endregion

          // #region agent log
          fetch(encodedPath, { method: 'HEAD' })
            .then(res => {
              debugLog({
                runId: 'pre-fix',
                hypothesisId: 'H1',
                location: 'src/pages/Publications.jsx:142',
                message: 'PDF HEAD request result',
                data: {
                  filePath,
                  encodedPath,
                  ok: res.ok,
                  status: res.status,
                  redirected: res.redirected,
                  finalUrl: res.url,
                },
              });
            })
            .catch(err => {
              debugLog({
                runId: 'pre-fix',
                hypothesisId: 'H3',
                location: 'src/pages/Publications.jsx:157',
                message: 'PDF HEAD request failed',
                data: {
                  filePath,
                  encodedPath,
                  errorMessage: err?.message || 'unknown error',
                },
              });
            });
          // #endregion
        }}
      >
        PDF
      </a>
    );
  };

  // 표준 학술 논문 인용 형식으로 렌더링하는 함수
  const renderPaper = (paper) => {
    const authors = safeText(paper.authors);
    const title = safeText(paper.title);
    const journal = safeText(paper.journal);
    const volume = safeText(paper.volume);
    const issue = safeText(paper.issue);
    const pages = safeText(paper.pages);
    const month = safeText(paper.month);
    const year = safeText(paper.year);
    const doi = safeText(paper.doi);
    const doiHref = hasText(doi)
      ? (doi.startsWith('http://') || doi.startsWith('https://') ? doi : `https://doi.org/${doi}`)
      : '';

    return (
      <>
        {renderPdfButton(paper.filePath)}
        {/* 저자 */}
        {hasText(authors) && <span>{authors}, </span>}
        
        {/* 제목 */}
        {hasText(title) && <span>{title}, </span>}
        
        {/* 저널명 (이탤릭) */}
        {hasText(journal) && (
          <span style={{
            fontStyle: 'italic', 
            color: '#4a5568', 
            fontWeight: 'normal',
            fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
          }}>
            {journal}
          </span>
        )}
        
        {/* 볼륨/호수 정보가 저널명에 포함되어 있지 않은 경우 */}
        {hasText(volume) && <span>, v.{volume}</span>}
        {hasText(issue) && <span>, no.{issue}</span>}
        
        {/* 페이지 */}
        {hasText(pages) && <span>, pp.{pages}</span>}
        
        {/* 날짜 */}
        {hasText(month) && hasText(year) && <span>, {month} {year}</span>}
        {!hasText(month) && hasText(year) && <span>, {year}</span>}
        {hasText(doiHref) && (
          <>
            {' '}
            <a className="doi-link" href={doiHref} target="_blank" rel="noreferrer">[DOI]</a>
          </>
        )}
      </>
    );
  };

  // 학회 논문 인용 형식으로 렌더링하는 함수
  const renderConference = (conference) => {
    const authors = safeText(conference.authors);
    const title = safeText(conference.title);
    const confName = safeText(conference.conference);
    const volume = safeText(conference.volume);
    const pages = safeText(conference.pages);
    const date = safeText(conference.date);

    return (
      <>
        {renderPdfButton(conference.filePath)}
        {/* 저자 */}
        {hasText(authors) && <span>{authors}, </span>}
        
        {/* 제목 */}
        {hasText(title) && <span>"{title}", </span>}
        
        {/* 학회명 */}
        {hasText(confName) && <span>{confName}</span>}
        
        {/* 볼륨 */}
        {hasText(volume) && <span>, v.{volume}</span>}
        
        {/* 페이지 */}
        {hasText(pages) && <span>, {pages}</span>}
        
        {/* 날짜 */}
        {hasText(date) && <span>, {date}</span>}
      </>
    );
  };

  const renderStandard = (standard) => {
    const title = safeText(standard.title);
    const status = safeText(standard.status);
    const date = safeText(standard.date);
    const standardScope = [
      safeText(standard.organization),
      safeText(standard.studyGroup),
      safeText(standard.workingParty),
      safeText(standard.question),
    ].filter(hasText).join(' ');

    return (
      <>
        {hasText(title) && <span>{title}</span>}
        {hasText(standardScope) && <span>, {standardScope}</span>}
        {hasText(status) && <span> ({status})</span>}
        {hasText(date) && <span>, {date}</span>}
      </>
    );
  };

  return (
    <div className="professor-container">
      <h1 className="professor-title">Research Achievements</h1>
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
      <section className="biography-section">
        <h2 className="section-title">International Standardization</h2>
        <ul className="publication-list">
          {internationalStandardization.map((standard, idx) => (
            <li key={idx} className="publication-item">
              <span className="publication-content">
                {renderStandard(standard)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
