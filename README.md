# NGNS Lab - React 웹사이트

NGNS Lab의 공식 웹사이트입니다. React + Vite를 사용하여 구축되었으며, 연구실 소개, 멤버 정보, 뉴스, 공지사항 등을 제공합니다.

## Project Overview

- **Framework**: React 18 + Vite
- **Routing**: React Router (HashRouter)
- **Styling**: CSS3
- **Deployment**: Static Hosting (GitHub Pages, Vercel, etc.)

## Main Features

- **Homepage**: Lab introduction and key information
- **Members**: Faculty and student information
- **Research**: Research areas and projects
- **Publications**: Published papers and patents
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
git clone https://github.com/givensik/NGNS.git
cd NGNS

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

2. **GitHub repository settings**:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` or `main`
   - Folder: `/root` or `/docs`

3. **Create gh-pages branch** (recommended):
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Add scripts to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

5. **Execute deployment**:
   ```bash
   npm run deploy
   ```

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
├── dist/                  # Build output
├── package.json           # Project configuration
└── vite.config.js         # Vite configuration
```

## Key Configuration Files

### package.json
```json
{
  "name": "ngns-lab",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.0.0",
    "vite": "^4.0.0"
  }
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths
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
   rm -rf node_modules package-lock.json
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
   - Verify HashRouter usage
   - Create 404.html file if needed

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

- **Email**: contact@ngns-lab.com
- **Website**: https://ngns-lab.com
- **GitHub**: https://github.com/givensik/NGNS

---

**NGNS Lab** - Network Generation Network Security Lab  
*Providing the best environment for innovative network security research.*
