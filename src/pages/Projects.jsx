import './Projects.css';

export default function Projects() {
  const ongoingProjects = [
    {
      title: "UAV 위치 무결성 검증을 위한 궤적 기반 딥러닝 연구",
      description: "드론의 궤적 데이터를 활용한 위치 무결성 검증 시스템 개발",
      period: "2024 - 현재",
      role: "주요 연구원",
      status: "진행중"
    },
    {
      title: "5G 네트워크 보안 연구",
      description: "5G 코어 네트워크의 컨테이너 보안 위협 분석 및 대응 방안 연구",
      period: "2024 - 현재", 
      role: "연구원",
      status: "진행중"
    }
  ];

  const completedProjects = [
    {
      title: "Flying Base Station 채널 용량 한계 연구",
      description: "정지 기지국에 의존적이고 위치에 독립적인 Flying Base Station 채널 용량 연구",
      period: "2023 - 2024",
      role: "연구원",
      status: "완료"
    },
    {
      title: "AI 기반 악성코드 탐지 메커니즘 연구",
      description: "인공지능을 활용한 악성코드 탐지 메커니즘의 관계성 연구",
      period: "2023 - 2024",
      role: "연구원", 
      status: "완료"
    }
  ];

  return (
    <div className="projects-container">
      <h1 className="projects-title">Projects</h1>
      
      {/* 진행중인 프로젝트 */}
      <section className="project-section">
        <h2 className="project-section-title">진행중인 프로젝트</h2>
        <div className="project-grid">
          {ongoingProjects.map((project, index) => (
            <div key={index} className="project-card ongoing">
              <div className="project-status ongoing">진행중</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-details">
                <span className="project-period">기간: {project.period}</span>
                <span className="project-role">역할: {project.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 완료된 프로젝트 */}
      <section className="project-section">
        <h2 className="project-section-title">완료된 프로젝트</h2>
        <div className="project-grid">
          {completedProjects.map((project, index) => (
            <div key={index} className="project-card completed">
              <div className="project-status completed">완료</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-details">
                <span className="project-period">기간: {project.period}</span>
                <span className="project-role">역할: {project.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
