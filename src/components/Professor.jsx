import { useEffect, useState } from 'react';
import './Professor.css';

export default function Professor() {
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/professor.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch professor data');
        }
        return res.json();
      })
      .then(data => {
        setProfessorData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("😢 Error fetching professor data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="professor-container">Loading...</div>;
  }

  if (error) {
    return <div className="professor-container">Error: {error}</div>;
  }
  
  return (
    <div className="professor-container">
      <div className="professor-main-content">
        <div className="professor-photo-container">
          <img 
            src="/images/members/prof.jpg" 
            alt={professorData.name} 
            className="professor-photo" 
          />
        </div>
        <div className="professor-info-details">
          <h2 className="prof-name">{professorData.name}</h2>
          <p className="prof-position">{professorData.position}</p>
          <p className="prof-department">{professorData.department}</p>
          <p className="prof-address">{professorData.address}</p>
          <p className="prof-contact">
            Tel {professorData.contact.tel} 
          </p>
          <p className="prof-contact">
            Fax {professorData.contact.fax}
          </p>
          <p className="prof-email">
            E-mail <a href={`mailto:${professorData.contact.email}`}>{professorData.contact.email}</a>
          </p>
        </div>
      </div>
      
      <section className="biography-section">
        <h2 className="section-title">Biography</h2>
        <p>{professorData.biography}</p>
      </section>
      
      <section className="experience-section">
        <h2 className="section-title">Professional Experience</h2>
        <ul>
            {professorData.professionalExperience.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
      </section>
    </div>
  );
}