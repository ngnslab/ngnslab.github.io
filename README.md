# NGNS Lab 웹사이트 유지보수 가이드

NGNS Lab 공식 웹사이트([https://ngnslab.github.io](https://ngnslab.github.io)) 유지보수를 위한 문서입니다.
처음 참여하는 사람도 이 문서만 보고 **실행, 수정, 점검, 배포**까지 진행할 수 있도록 핵심 절차만 정리합니다.

## 1. 프로젝트 요약

- 프레임워크: `React 19` + `Vite 5`
- 라우팅: `react-router-dom v7` (`HashRouter`)
- 스타일: 페이지별 CSS 파일
- 배포: GitHub Pages (`gh-pages -d dist`)
- 주요 데이터: `public/data/*.json`
- 공식 문의: `ngnslab@gmail.com`

## 2. 빠른 시작

### 필수 도구

- Node.js 18 이상
- npm 9 이상
- Git

### 설치 및 실행

```bash
git clone https://github.com/ngnslab/ngnslab.github.io.git
cd ngnslab.github.io
npm install
npm run dev
```

개발 서버 기본 주소는 `http://localhost:5173`입니다.

### 자주 쓰는 명령

```bash
npm run dev       # 개발 서버 실행
npm run build     # 배포 전 빌드 확인
npm run preview   # 빌드 결과 미리보기
npm run deploy    # dist를 gh-pages 브랜치로 배포
```

## 3. 프로젝트 구조

```text
ngnslab.github.io/
├── public/
│   ├── data/                 # 페이지에서 읽는 JSON 데이터
│   ├── images/               # 정적 이미지
│   ├── docs/                 # PDF/문서 자산
│   └── lab/                  # 홈 화면 등에서 쓰는 연구실 이미지
├── src/
│   ├── components/           # 공통 UI
│   ├── pages/                # 페이지 단위 컴포넌트와 CSS
│   ├── App.jsx               # 라우팅 연결
│   └── main.jsx              # 앱 진입점
├── dist/                     # 빌드 결과물, 배포 대상
├── package.json              # 스크립트와 의존성
└── vite.config.js            # Vite 설정
```

## 4. 수정 작업 순서

1. 수정할 페이지와 연결 데이터를 먼저 확인합니다.
2. 페이지 컴포넌트 또는 CSS를 수정합니다. 예: `src/pages/Lecture.jsx`, `src/pages/Lecture.css`
3. 필요한 경우 JSON 데이터를 함께 수정합니다. 예: `public/data/member.json`
4. 이미지, PDF 등 정적 자산이 필요하면 `public/images`, `public/docs`, `public/lab` 아래에 추가합니다.
5. 로컬에서 화면을 확인합니다.
6. 배포 전 `npm run build`를 실행합니다.

## 5. 페이지별 주요 수정 위치

| 페이지 | 주요 파일 |
| --- | --- |
| Home | `src/pages/Home.jsx`, `src/pages/Home.css`, `public/images/home`, `public/lab` |
| Member | `src/pages/Member.jsx`, `src/pages/Member.css`, `public/data/member.json`, `public/images/members` |
| Research | `src/pages/Research.jsx`, `src/pages/Research.css`, `public/data/researchProjects.json` |
| Publications | `src/pages/Publications.jsx`, `src/pages/Publications.css`, `public/data/researchAchievements.json`, `public/docs` |
| Activities | `src/pages/Activities.jsx`, `src/pages/Activities.css`, `public/data/activities.json` |
| Lecture | `src/pages/Lecture.jsx`, `src/pages/Lecture.css` |
| News | `src/pages/News.jsx`, `src/pages/NewsDetail.jsx`, `public/data/news.json`, `public/images/news` |
| Notice | `src/pages/Notice.jsx`, `src/pages/NoticeDetail.jsx`, `public/data/notice.json` |
| Contact | `src/pages/Contact.jsx`, `src/pages/Contact.css` |
| 공통 메뉴 | `src/components/Navbar.jsx`, `src/components/Navbar.css` |

## 6. 데이터 파일 가이드

### `member.json`

멤버 페이지에서 주로 사용하는 필드입니다.

- `name`: 표시 이름
- `image`: 이미지 경로
- `position`: 예) `PhD Student`, `Master Student`, `Undergraduate Student`, `Internship Student`
- `interests`: 관심 분야 배열
- `period`: 활동 기간
- `isCurrent`: 현재 소속 여부 (`true` 또는 `false`)

예시:

```json
{
  "name": "홍길동 (Part-time)",
  "image": "/images/members/default.png",
  "position": "Master Student",
  "period": "2026.01 ~",
  "isCurrent": true,
  "interests": ["네트워크 보안", "AI 보안"]
}
```

### `researchAchievements.json`

연구실적 페이지의 주요 섹션 키입니다.

- `internationalPapers`
- `domesticPapers`
- `internationalConferences`
- `domesticConferences`
- `internationalStandardization`

논문과 학회 항목은 `title`, `authors`, `journal` 또는 `conference`, `year` 등을 사용합니다.
PDF 버튼이 필요하면 `filePath`를 함께 입력합니다.

### `researchProjects.json`

연구과제 페이지는 다음 섹션을 기준으로 표시됩니다.

- `ongoingProjects`
- `completedProjects`

각 항목은 보통 `title`, `description`, `period`를 사용합니다.

## 7. 커밋 기준

### 기본 원칙

- 한 커밋에는 한 페이지 또는 한 목적의 변경만 담습니다.
- 화면에 함께 반영되는 JSON, 이미지, PDF는 같은 커밋에 묶습니다.
- 관련 없는 페이지 변경을 한 커밋에 섞지 않습니다.
- 커밋 메시지는 내부 구현보다 사용자가 웹에서 보는 변화를 중심으로 작성합니다.

### 메시지 형식

```text
type(scope): 페이지에서 보이는 변경 요약
```

예시:

- `feat(member): 멤버 페이지 표시 구조 및 이력 구분 개선`
- `feat(publications): PDF와 DOI 접근 버튼 추가`
- `refactor(research): 연구 프로젝트 섹션 구조 단순화`

## 8. 배포 절차

이 저장소는 `dist` 폴더를 `gh-pages` 브랜치로 배포합니다.

```bash
npm run build
npm run deploy
```

중요 사항:

- `npm run build` 없이 `npm run deploy`만 실행하면 이전 빌드 결과가 배포될 수 있습니다.
- `npm run deploy`는 내부적으로 `gh-pages -d dist`를 실행합니다.
- 배포 후 GitHub의 `gh-pages` 브랜치 최신 커밋과 실제 웹사이트 반영 여부를 함께 확인합니다.

## 9. 배포 전 체크리스트

```bash
git status --short
git diff --staged --name-only
npm run build
```

확인 항목:

- 의도한 파일만 수정 또는 스테이징되었는가
- 페이지 코드와 연결 데이터가 함께 반영되었는가
- 공개 저장소에 올리면 안 되는 정보가 포함되지 않았는가
- 빌드가 오류 없이 완료되는가

## 10. 공개 저장소 주의사항

이 저장소는 public repository입니다. 커밋 전에는 다음 항목을 확인합니다.

- API 키, 토큰, 비밀번호, private key를 커밋하지 않습니다.
- `.env` 파일이나 개인 설정 파일을 커밋하지 않습니다.
- 내부 회의록, 비공개 연구 자료, 미공개 개인정보가 포함된 문서를 올리지 않습니다.
- 개인 이메일, 전화번호, 학번 등은 공개 목적이 명확할 때만 포함합니다.
- 예시 이메일은 실제 계정처럼 오해되지 않도록 문맥을 명확히 둡니다. 예: `prof@university.ac.kr`

간단한 점검 명령:

```bash
rg -n "password|secret|token|api[_-]?key|private[_-]?key|client[_-]?secret|ghp_|github_pat_|sk-" .
```

## 11. 문제 해결

### 의존성 설치 문제

```bash
npm cache clean --force
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### 개발 서버 포트 충돌

```bash
npm run dev -- --port 3001
```

### 라우팅 또는 페이지 이동 문제

- `src/App.jsx`에서 `HashRouter`와 라우트 경로를 확인합니다.
- `src/components/Navbar.jsx`의 메뉴 링크가 라우트 경로와 일치하는지 확인합니다.

### 빌드 오류

```bash
npm run build --verbose
```

## 12. 참고 링크

- 웹사이트: [https://ngnslab.github.io](https://ngnslab.github.io)
- 저장소: [https://github.com/ngnslab/ngnslab.github.io](https://github.com/ngnslab/ngnslab.github.io)
- React 문서: [https://react.dev](https://react.dev)
- Vite 문서: [https://vitejs.dev](https://vitejs.dev)
- React Router 문서: [https://reactrouter.com](https://reactrouter.com)

## 13. 문의

- 이메일: `ngnslab@gmail.com`

---

NGNS Lab - Next Generation Network Security Lab
