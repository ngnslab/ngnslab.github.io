import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FloatingToc.css';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\uac00-\ud7af\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function FloatingToc() {
  const { pathname } = useLocation();
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth > 1200
  );
  const tocRef = useRef(null);

  const isHome = useMemo(() => pathname === '/', [pathname]);

  useEffect(() => {
    if (isHome) {
      setHeadings([]);
      return;
    }

    const pageRoot = document.querySelector('[data-page-content]');
    if (!pageRoot) {
      setHeadings([]);
      return;
    }

    const collectHeadings = () => {
      const headingElements = Array.from(pageRoot.querySelectorAll('h2, h3')).filter(
        (element) => !element.closest('.member-card')
      );
      const idCounter = new Map();

      const parsedHeadings = headingElements
        .map((element) => {
          const rawText = (element.textContent || '').trim();
          if (!rawText) return null;

          let baseId = element.id || slugify(rawText);
          if (!baseId) baseId = `section-${idCounter.size + 1}`;

          const duplicateCount = idCounter.get(baseId) || 0;
          idCounter.set(baseId, duplicateCount + 1);
          const safeId = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount + 1}`;

          element.id = safeId;

          return {
            id: safeId,
            text: rawText,
            level: element.tagName.toLowerCase() === 'h3' ? 3 : 2,
          };
        })
        .filter(Boolean);

      setHeadings(parsedHeadings);
    };

    collectHeadings();

    const mutationObserver = new MutationObserver(() => {
      collectHeadings();
    });

    mutationObserver.observe(pageRoot, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => mutationObserver.disconnect();
  }, [pathname, isHome]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1200);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!headings.length) {
      setActiveId('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (!visibleEntries.length) return;

        const topMost = visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];

        setActiveId(topMost.target.id);
      },
      {
        rootMargin: '-90px 0px -60% 0px',
        threshold: 0.15,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const pageRoot = document.querySelector('[data-page-content]');
    if (!pageRoot) return undefined;

    if (isHome || headings.length < 1 || !isDesktop) {
      pageRoot.style.paddingRight = '';
      return undefined;
    }

    const updateRightPadding = () => {
      const tocWidth = tocRef.current?.offsetWidth || 220;
      pageRoot.style.paddingRight = `${tocWidth + 48}px`;
    };

    updateRightPadding();
    window.addEventListener('resize', updateRightPadding);

    return () => {
      window.removeEventListener('resize', updateRightPadding);
      pageRoot.style.paddingRight = '';
    };
  }, [headings, isDesktop, isHome]);

  if (isHome || headings.length < 1) {
    return null;
  }

  const handleClick = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <aside ref={tocRef} className="floating-toc" aria-label="Page table of contents">
      <div className="floating-toc-title">Contents</div>
      <ul className="floating-toc-list">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              className={`floating-toc-link ${heading.level === 3 ? 'sub' : ''} ${activeId === heading.id ? 'active' : ''}`}
              onClick={() => handleClick(heading.id)}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
