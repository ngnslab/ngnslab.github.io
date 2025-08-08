import './Activities.css';

export default function Activities() {
  const activities = [
    {
      title: "학술대회 참여",
      description: "국내외 주요 학술대회에서 연구 결과 발표",
      period: "2024 - 현재",
      type: "ongoing"
    },
    {
      title: "연구 협력",
      description: "산업계 및 학계와의 연구 협력 활동",
      period: "2024 - 현재",
      type: "ongoing"
    }
  ];

  const presentations = [
    {
      title: "Fake Base Station Detection and Blacklisting",
      conference: "2024 33rd International Conference on Computer Communications and Networks (ICCCN)",
      organization: "IEEE",
      date: "2024-07",
      type: "international"
    },
    {
      title: "Wireless Link Routing to Secure Against Fake Base Station in 5G",
      conference: "2024 Silicon Valley Cybersecurity Conference (SVCC)",
      organization: "Silicon Valley Cybersecurity Institute",
      date: "2024-06",
      type: "international"
    },
    {
      title: "Analyzing the container security threat on the 5G Core Network",
      conference: "2024 Silicon Valley Cybersecurity Conference (SVCC)",
      organization: "Silicon Valley Cybersecurity Institute", 
      date: "2024-06",
      type: "international"
    },
    {
      title: "Flying Base Station Channel Capacity",
      conference: "SNTA '24: Seventh International Workshop on Systems and Network Telemetry and Analytics",
      organization: "ACM HPDC",
      date: "2024-06",
      type: "international"
    }
  ];

  return (
    <div className="activities-container">
      <h1 className="activities-title">Activities</h1>
      
      {/* 현재 활동 */}
      <section className="activity-section">
        <h2 className="activity-section-title">현재 활동</h2>
        <div className="activity-grid">
          {activities.map((activity, index) => (
            <div key={index} className="activity-card ongoing">
              <div className="activity-status ongoing">진행중</div>
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-details">
                <span className="activity-period">기간: {activity.period}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 학술발표 */}
      <section className="activity-section">
        <h2 className="activity-section-title">학술발표</h2>
        <div className="presentation-list">
          {presentations.map((presentation, index) => (
            <div key={index} className="presentation-card">
              <div className="presentation-type international">국제</div>
              <h3 className="presentation-title">{presentation.title}</h3>
              <p className="presentation-conference">{presentation.conference}</p>
              <div className="presentation-details">
                <span className="presentation-organization">{presentation.organization}</span>
                <span className="presentation-date">{presentation.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
