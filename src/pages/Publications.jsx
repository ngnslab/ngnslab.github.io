import './Publications.css';

export default function Publications() {
  const internationalPapers = [
    {
      title: "Trajectory-Driven Deep Learning for UAV Location Integrity Checks",
      journal: "IEEE ACCESS",
      volume: "12",
      year: "2024",
      type: "international"
    },
    {
      title: "Flying Base Station Channel Capacity Limits: Dependent on Stationary Base Station and Independent of Positioning",
      journal: "ELECTRONICS",
      volume: "13",
      year: "2024",
      type: "international"
    }
  ];

  const domesticPapers = [
    {
      title: "A study of the relationship of malware detection mechanisms using Artificial Intelligence",
      journal: "ICT Express",
      volume: "10",
      year: "2024",
      type: "domestic"
    },
    {
      title: "Base station gateway to secure user channel access at the first hop edge",
      journal: "Computer Networks",
      volume: "240",
      year: "2024",
      type: "domestic"
    }
  ];

  return (
    <div className="publications-container">
      <h1 className="publications-title">Publications</h1>
      
      {/* 국외 논문 */}
      <section className="publication-section">
        <h2 className="publication-section-title">국외 논문</h2>
        <div className="publication-list">
          {internationalPapers.map((paper, index) => (
            <div key={index} className="publication-card international">
              <div className="publication-type international">국외</div>
              <h3 className="publication-title">{paper.title}</h3>
              <div className="publication-details">
                <span className="publication-journal">{paper.journal}</span>
                <span className="publication-volume">Vol. {paper.volume}</span>
                <span className="publication-year">{paper.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 국내 논문 */}
      <section className="publication-section">
        <h2 className="publication-section-title">국내 논문</h2>
        <div className="publication-list">
          {domesticPapers.map((paper, index) => (
            <div key={index} className="publication-card domestic">
              <div className="publication-type domestic">국내</div>
              <h3 className="publication-title">{paper.title}</h3>
              <div className="publication-details">
                <span className="publication-journal">{paper.journal}</span>
                <span className="publication-volume">Vol. {paper.volume}</span>
                <span className="publication-year">{paper.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
