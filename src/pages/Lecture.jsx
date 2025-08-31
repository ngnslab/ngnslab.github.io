import './Lecture.css';

export default function Lecture() {
  const lectures = [
    {
      year: "2025",
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
          <div className="lecture-table-wrapper">
            <table className="lecture-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>과목명</th>
                  
                </tr>
              </thead>
              <tbody>
                {yearData.courses.map((course, courseIndex) => (
                  <tr key={courseIndex} className={course.type}>
                    <td>{course.type === 'undergraduate' ? '학부' : '대학원'}</td>
                    <td>{course.courseName}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
