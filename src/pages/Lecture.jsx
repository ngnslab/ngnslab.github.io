import './Lecture.css';

export default function Lecture() {
  const lectures = [
    {
      year: '2026',
      semester: '1학기',
      courses: [
        {
          courseCode: '010111',
          section: '002',
          courseName: '졸업연구및진로1',
          language: '한글',
          creditsAndGrade: '1학점/4학년',
          type: 'undergraduate',
        },
        {
          courseCode: '011973',
          section: '001',
          courseName: '정보보호연구입문',
          language: '한글',
          creditsAndGrade: '3학점/3학년',
          type: 'undergraduate',
        },
        {
          courseCode: '012008',
          section: '001',
          courseName: 'AI기반악성코드분석 (영어강의)',
          language: '영어',
          creditsAndGrade: '3학점/4학년',
          type: 'undergraduate',
        },
        {
          courseCode: '009912',
          section: '001',
          courseName: 'C프로그래밍및실습',
          language: '한글',
          creditsAndGrade: '3학점/1학년',
          type: 'undergraduate',
        },
        {
          courseCode: '300005',
          section: '001',
          courseName: '박사논문연구1',
          language: '한글',
          creditsAndGrade: '3학점',
          type: 'graduate',
        },
      ],
    },
    {
      year: '2025',
      semester: '2학기',
      courses: [
        {
          courseCode: '010112',
          section: '002',
          courseName: '졸업연구및진로2',
          language: '한글',
          creditsAndGrade: '1학점/4학년',
          type: 'undergraduate',
        },
        {
          courseCode: '011972',
          section: '001',
          courseName: '정보보호심화연구',
          language: '한글',
          creditsAndGrade: '3학점/3학년',
          type: 'undergraduate',
        },
        {
          courseCode: '009913',
          section: '001',
          courseName: '고급C프로그래밍및실습',
          language: '한글',
          creditsAndGrade: '3학점/1학년',
          type: 'undergraduate',
        },
        {
          courseCode: '200204',
          section: '003',
          courseName: '석사논문연구2',
          language: '한글',
          creditsAndGrade: '3학점',
          type: 'graduate',
        },
        {
          courseCode: '300058',
          section: '003',
          courseName: '박사논문연구2',
          language: '한글',
          creditsAndGrade: '3학점',
          type: 'graduate',
        },
        {
          courseCode: '417622',
          section: '001',
          courseName: '이동통신보안특론',
          language: '한글',
          creditsAndGrade: '3학점',
          type: 'graduate',
        },
      ],
    },
  ];

  return (
    <div className="lecture-container">
      <h1 className="lecture-title">Lecture</h1>
      {lectures.map((yearData) => (
        <section key={`${yearData.year}-${yearData.semester}`} className="lecture-section">
          <h2 className="lecture-year-title">
            {yearData.year}년 {yearData.semester} 강의
          </h2>
          <div className="lecture-table-wrapper">
            <table className="lecture-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>과목명</th>
                  <th>학수번호</th>
                  <th>학점/학년</th>
                  <th>강의언어</th>
                  <th>분반</th>
                </tr>
              </thead>
              <tbody>
                {yearData.courses.map((course) => (
                  <tr key={`${course.courseCode}-${course.section}`} className={course.type}>
                    <td>{course.type === 'undergraduate' ? '학부' : '대학원'}</td>
                    <td className="course-name-cell">{course.courseName}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.creditsAndGrade}</td>
                    <td>{course.language}</td>
                    <td>{course.section}</td>
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
