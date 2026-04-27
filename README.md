# NGNS Lab 웹사이트 유지보수 가이드

NGNS Lab 공식 웹사이트(`https://ngnslab.github.io`) 유지보수를 위한 문서입니다.  
처음 참여하는 사람도 이 문서만 보면 **실행, 수정, 배포, 점검**까지 진행할 수 있도록 정리했습니다.

## 1. 기술 스택과 핵심 정보

- 프레임워크: `React 19` + `Vite 5`
- 라우팅: `react-router-dom v7` (`HashRouter`)
- 배포 방식: `gh-pages -d dist` (GitHub Pages)
- 주요 데이터: `public/data/*.json`

## 2. 빠른 시작

### 2.1 필수 도구

- Node.js 18 이상
- npm 9 이상
- Git 최신 버전

### 2.2 설치 및 실행

```bash
git clone https://github.com/ngnslab/ngnslab.github.io.git
cd ngnslab.github.io
npm install
npm run dev
```

개발 서버 기본 주소: `http://localhost:5173`

## 3. 프로젝트 구조(유지보수 관점)

```text
ngnslab.github.io/
├── public/
│   ├── data/                 # 페이지에서 읽는 JSON 데이터
│   ├── images/               # 정적 이미지
│   └── docs/ 또는 /docs/     # PDF/문서 자산(경로 매칭 중요)
├── src/
│   ├── components/           # 공통 UI (예: Navbar, Card)
│   ├── pages/                # 페이지 단위 컴포넌트
│   ├── App.jsx               # 라우팅/전체 페이지 연결
│   └── main.jsx              # 엔트리 포인트
├── dist/                     # 빌드 결과물(배포 대상)
├── package.json              # 스크립트/의존성
└── vite.config.js            # Vite 설정
```

## 4. 페이지 수정 시 작업 순서

1. 대상 페이지 컴포넌트 수정 (`src/pages/...`)
2. 필요한 경우 데이터 JSON 수정 (`public/data/...`)
3. 필요한 경우 이미지/PDF 자산 추가 (`public/images`, `docs`)
4. 로컬 확인 (`npm run dev`)
5. 빌드 확인 (`npm run build`)

## 5. 데이터 파일 가이드

### 5.1 `member.json` (멤버 페이지)

현재 페이지에서 실사용하는 주요 필드:

- `name`: 표시 이름 (`(Part-time)` 포함 가능)
- `image`: 이미지 경로
- `position`: 예) `PhD Student`, `Master Student`, `Undergraduate Student`, `Internship Student`
- `interests`: 관심분야 배열
- `period`(선택): 활동 기간
- `isCurrent`(선택): 재적 여부 (`true/false`)

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

### 5.2 `researchAchievements.json` (연구실적 페이지)

섹션별 키:

- `internationalPapers`
- `domesticPapers`
- `internationalConferences`
- `domesticConferences`
- `internationalStandardization`

논문/학회 항목은 `title`, `authors`, `journal`/`conference`, `year` 등을 사용하고,  
PDF 버튼 노출이 필요하면 `filePath`를 함께 입력합니다.

### 5.3 `researchProjects.json` (연구과제 페이지)

현재 화면 기준 핵심 섹션:

- `ongoingProjects`
- `completedProjects`

각 항목은 `title`, `description`, `period`를 기본으로 사용합니다.

## 6. 커밋 규칙(페이지 중심)

### 6.1 기본 원칙

- 한 커밋에는 한 페이지(또는 한 목적)의 변경만 담습니다.
- 페이지와 함께 반영되는 JSON/이미지/PDF는 같은 커밋에 묶습니다.
- 커밋 메시지는 코드 내부 구현보다 **웹에서 보이는 변화** 중심으로 작성합니다.

### 6.2 페이지별 권장 스테이징 범위

- Member: `src/pages/Member.jsx`, `src/pages/Member.css`, `public/data/member.json`, 관련 이미지
- Publications: `src/pages/Publications.jsx`, `src/pages/Publications.css`, `public/data/researchAchievements.json`, 관련 `docs`
- Research: `src/pages/Research.jsx`, `public/data/researchProjects.json`
- Contact: `src/pages/Contact.jsx`
- 공통 메뉴: `src/components/Navbar.jsx`

### 6.3 커밋 메시지 형식

```text
type(scope): 페이지에서 보이는 변경 요약
```

예시:

- `feat(member): 멤버 페이지 표시 구조 및 이력 구분 개선`
- `feat(publications): PDF/DOI 노출 및 표준화 섹션 추가`
- `refactor(research): 연구 프로젝트 중심으로 섹션 단순화`

## 7. GitHub Pages 배포 절차

이 저장소는 `dist`를 `gh-pages` 브랜치로 배포합니다.

```bash
npm run build
npm run deploy
```

중요:

- `npm run build` 없이 `npm run deploy`만 실행하면 이전 결과가 배포될 수 있습니다.
- 배포 후 `gh-pages` 브랜치 최신 커밋과 실제 페이지 반영 여부를 함께 확인하세요.

## 8. 배포 전 점검 체크리스트

```bash
git diff --staged --name-only
npm run build
```

확인 항목:

- 커밋이 페이지 단위로 분리되어 있는가
- 스테이징 파일이 의도한 범위와 일치하는가
- 커밋 메시지가 사용자 관점의 변경사항을 설명하는가
- 빌드가 오류 없이 완료되는가

## 9. 문제 해결(자주 발생)

### 9.1 의존성 설치 문제

```bash
npm cache clean --force
# macOS/Linux
rm -rf node_modules package-lock.json
# Windows PowerShell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### 9.2 라우팅/페이지 이동 문제

- `src/App.jsx`의 `HashRouter` 및 라우트 경로 확인
- `src/components/Navbar.jsx` 메뉴 링크 경로 확인

### 9.3 빌드 오류

```bash
npm run build --verbose
```

## 10. 참고 링크

- 웹사이트: [https://ngnslab.github.io](https://ngnslab.github.io)
- 저장소: [https://github.com/ngnslab/ngnslab.github.io](https://github.com/ngnslab/ngnslab.github.io)
- React 문서: [https://react.dev/](https://react.dev/)
- Vite 문서: [https://vitejs.dev/](https://vitejs.dev/)

## 11. 문의

- 이메일: `ngnslab@gmail.com`

---

NGNS Lab - Network Generation Network Security Lab
# NGNS Lab - React 웹사이트

NGNS Lab의 공식 웹사이트입니다. React + Vite를 사용하여 구축되었으며, 연구실 소개, 멤버 정보, 뉴스, 공지사항 등을 제공합니다.

## 프로젝트 개요

- **Framework**: React 19 + Vite 5
- **Routing**: React Router v7 (HashRouter)
- **Styling**: CSS3
- **Deployment**: GitHub Pages (`gh-pages -d dist`)

## 주요 기능

- **Homepage**: Lab introduction and key information
- **Members**: Faculty and student information
- **Research**: Research areas and projects
- **Publications**: Papers, conferences, standardization achievements
- **News**: Lab updates and announcements
- **Notices**: Important notices and schedules
- **Contact**: Lab location and contact information

## Development Environment Setup

### 1. Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: Latest version

### 2. Node.js Installation

#### Windows
1. Download LTS version from [Node.js official site](https://nodejs.org/)
2. Run installer and complete installation
3. Verify version in PowerShell:
   ```bash
   node --version
   npm --version
   ```

#### macOS
```bash
# Using Homebrew
brew install node

# Or using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Project Clone and Installation

```bash
# Clone repository
git clone https://github.com/ngnslab/ngnslab.github.io.git
cd ngnslab.github.io

# Install dependencies
npm install
```

## Development Server

```bash
# Start development server (http://localhost:5173)
npm run dev

# Or run on specific port
npm run dev -- --port 3000
```

## Project Build

```bash
# Production build
npm run build

# Preview build result
npm run preview
```

## Deployment Guide

### GitHub Pages Deployment

1. **Build project**:
   ```bash
   npm run build
   ```

2. **Execute deployment**:
   ```bash
   npm run deploy
   ```

3. **배포 후 확인**:
   - GitHub 저장소의 `gh-pages` 브랜치가 최신 커밋으로 갱신되었는지 확인
   - Pages URL에서 변경된 화면이 반영되었는지 확인

## 커밋 규칙 및 GitHub Pages 배포 절차

이 프로젝트는 웹페이지 변경 이력을 빠르게 파악할 수 있도록 페이지 중심 커밋 전략을 사용합니다.

### 1) 페이지 중심 커밋 규칙

- 하나의 커밋은 하나의 페이지 또는 하나의 명확한 UI 목적만 다룹니다.
- 화면에 함께 반영되는 데이터는 페이지 코드와 함께 스테이징합니다. (`public/data/*.json`)
- 관련 없는 페이지 변경은 한 커밋에 섞지 않습니다. (예: `Member` + `Research`)
- 커밋 메시지는 내부 구현보다 **사용자가 웹에서 보는 변화**를 중심으로 작성합니다.

### 2) 페이지별 권장 커밋 범위

- `Member` 페이지:
  - `src/pages/Member.jsx`, `src/pages/Member.css`
  - `public/data/member.json`
  - `public/images/members/` 내 관련 이미지
- `Publications` 페이지:
  - `src/pages/Publications.jsx`, `src/pages/Publications.css`
  - `public/data/researchAchievements.json`
  - 페이지에 연결되는 문서 자산 `docs/` (PDF 링크/내용 갱신 시)
- `Research` 페이지:
  - `src/pages/Research.jsx`
  - `public/data/researchProjects.json`
- `Contact` 페이지:
  - `src/pages/Contact.jsx`
- 공통 네비게이션 변경:
  - `src/components/Navbar.jsx`

### 3) 커밋 메시지 작성 형식

다음 형식을 기본으로 사용합니다.

```text
type(scope): 페이지에서 보이는 변경 요약
```

권장 예시:

- `feat(member): 멤버 페이지 표시 구조 및 이력 노출 개선`
- `feat(publications): 연구실적 페이지 PDF/DOI 접근성 및 표준화 섹션 추가`
- `refactor(research): 연구 프로젝트 중심으로 화면 단순화`

본문은 3~6줄로 아래 내용을 포함합니다.

1. 어떤 섹션명/레이아웃이 바뀌었는지
2. 사용자가 새로 확인하거나 접근할 수 있는 정보가 무엇인지
3. UI와 함께 갱신된 데이터/문서 소스가 무엇인지

### 4) GitHub Pages 배포 담당자 체크리스트

이 저장소는 아래 방식으로 `dist`를 GitHub Pages에 배포합니다.

```bash
gh-pages -d dist
```

따라서 배포는 반드시 아래 순서를 지킵니다.

```bash
npm run build
npm run deploy
```

중요 사항:

- `npm run build`: 최신 정적 결과물을 `dist`에 생성
- `npm run deploy`: 현재 `dist`를 GitHub Pages로 배포
- 빌드 없이 배포하면 이전 결과물이 올라갈 수 있음

### 5) Push 전 최종 확인

Push 전에 아래 명령으로 점검합니다.

```bash
git diff --staged --name-only
npm run build
```

확인 항목:

- 각 커밋에 의도한 페이지 관련 파일만 포함되었는지
- 커밋 메시지가 웹페이지 기준 변경사항을 명확히 설명하는지
- 배포 전 빌드가 정상적으로 완료되는지

### Vercel Deployment

1. Login to [Vercel](https://vercel.com)
2. Click "New Project"
3. Connect GitHub repository
4. Complete automatic deployment setup

### Netlify Deployment

1. Login to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub repository
4. Build command: `npm run build`
5. Publish directory: `dist`

## Project Structure

```
NGNS/
├── public/                 # Static files
│   ├── data/              # JSON data files
│   │   ├── member.json    # Member information
│   │   ├── news.json      # News data
│   │   └── ...
│   └── images/            # Image files
├── src/                   # Source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── dist/                  # Build output (npm run build 시 생성)
├── package.json           # Project configuration
└── vite.config.js         # Vite configuration
```

## Key Configuration Files

### package.json
```json
{
  "name": "ngns",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.7.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.30.1",
    "@tailwindcss/postcss": "^4.1.11",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@vitejs/plugin-react": "^4.7.0",
    "eslint": "^9.30.1",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "gh-pages": "^6.3.0",
    "globals": "^16.3.0",
    "vite": "^5.4.20"
  }
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // GitHub Pages 사용자 페이지는 루트 도메인 사용
  plugins: [react()],
})
```

## Data Management

### JSON File Structure

#### member.json
```json
[
  {
    "id": 1,
    "name": "Prof. Kim",
    "position": "Professor",
    "email": "prof@university.ac.kr",
    "research": ["Network Security", "Blockchain"],
    "image": "/images/members/prof.jpg"
  }
]
```

#### news.json
```json
[
  {
    "id": 1,
    "date": "2024-01-15",
    "category": "Research",
    "title": "Research Title",
    "description": "Brief description",
    "content": "Detailed content",
    "image": "/lab/lab.png"
  }
]
```

## Customization

### Color Theme Change
Modify CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --accent-color: #f59e0b;
}
```

### Font Change
Add Google Fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
}
```

## Troubleshooting

### Common Issues

1. **Dependency installation failure**:
   ```bash
   npm cache clean --force
   # macOS/Linux
   rm -rf node_modules package-lock.json
   # Windows PowerShell
   Remove-Item -Recurse -Force node_modules, package-lock.json
   npm install
   ```

2. **Port conflict**:
   ```bash
   npm run dev -- --port 3001
   ```

3. **Build failure**:
   ```bash
   npm run build --verbose
   ```

4. **Routing issues**:
   - `src/App.jsx`에서 `HashRouter` 사용 여부 확인
   - 라우트 경로 변경 시 `Navbar` 링크도 함께 점검

### Developer Tools

- **React Developer Tools**: Install browser extension
- **Console logs**: Check debugging information during development
- **Network tab**: Monitor API calls and data loading status

## Additional Resources

- [React Official Documentation](https://react.dev/)
- [Vite Official Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [CSS Guide](https://developer.mozilla.org/ko/docs/Web/CSS)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is distributed under the MIT License.

## Contact

- **Email**: ngnslab@gmail.com
- **Website**: https://ngnslab.github.io
- **GitHub**: https://github.com/ngnslab/ngnslab.github.io

---

**NGNS Lab** - Network Generation Network Security Lab  
*Providing the best environment for innovative network security research.*
