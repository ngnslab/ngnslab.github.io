import './Lecture.css';

export default function Lecture() {
  const lectures = [
    {
      year: "2024",
      courses: [
        {
          department: "정보보호학과",
          courseCode: "010112",
          section: "002",
          courseName: "졸업연구및진로2",
          language: "한글",
          credits: "1.0",
          grade: "4",
          type: "undergraduate"
        },
        {
          department: "일반대학원 정보보호학과",
          courseCode: "417622",
          section: "001",
          courseName: "이동통신보안특론",
          language: "한글",
          credits: "3.0",
          grade: "",
          type: "graduate"
        },
        {
          department: "일반대학원 정보보호학과",
          courseCode: "200204",
          section: "003",
          courseName: "석사논문연구2",
          language: "한글",
          credits: "3.0",
          grade: "",
          type: "graduate"
        },
        {
          department: "일반대학원 정보보호학과",
          courseCode: "300058",
          section: "003",
          courseName: "박사논문연구2",
          language: "한글",
          credits: "3.0",
          grade: "",
          type: "graduate"
        },
        {
          department: "정보보호학과",
          courseCode: "011972",
          section: "001",
          courseName: "정보보호심화연구",
          language: "한글",
          credits: "3.0",
          grade: "3",
          type: "undergraduate"
        },
        {
          department: "사이버국방학과",
          courseCode: "009913",
          section: "001",
          courseName: "고급C프로그래밍및실습",
          language: "한글",
          credits: "3.0",
          grade: "1",
          type: "undergraduate"
        }
      ]
    }
  ];

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Lecture</h1>
      
      {lectures.map((yearData, yearIndex) => (
        <section key={yearIndex} className="lecture-section">
          <h2 className="lecture-year-title">{yearData.year}년 강의</h2>
          <div className="lecture-grid">
            {yearData.courses.map((course, courseIndex) => (
              <div key={courseIndex} className={`lecture-card ${course.type}`}>
                <div className="lecture-type">
                  {course.type === 'undergraduate' ? '학부' : '대학원'}
                </div>
                <h3 className="course-name">{course.courseName}</h3>
                <div className="course-details">
                  <p className="course-department">{course.department}</p>
                  <p className="course-code">학수번호: {course.courseCode}-{course.section}</p>
                  <p className="course-credits">학점: {course.credits}</p>
                  {course.grade && <p className="course-grade">학년: {course.grade}</p>}
                  <p className="course-language">강의언어: {course.language}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
