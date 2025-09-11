import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const menu = [
    { to: "/", label: "Home" },
    { to: "/member", label: "Member" },
    { to: "/research", label: "Research" },
    { to: "/publications", label: "Publications" },
    { to: "/activities", label: "Activities" },
    { to: "/lecture", label: "Lecture" },
    { to: "/news", label: "News" },
    { to: "/notice", label: "Notice" },
    { to: "/contact", label: "Contact" },
  ];

  // ✅ 화면 리사이즈 시 open 상태 초기화
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false); // PC 사이즈면 항상 메뉴 보여지므로 닫기
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ 스크롤 이벤트 처리
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 30) {
        // 스크롤을 아래로 내릴 때 (100px 이상)
        setIsVisible(false);
      } else {
        // 스크롤을 위로 올릴 때
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isVisible ? "visible" : "hidden"}`}>
      <div className="logo">
        <Link to="/">NGNS Lab</Link>
      </div>

      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        {menu.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
