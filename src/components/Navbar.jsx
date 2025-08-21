import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { to: "/", label: "Home" },
    { to: "/professor", label: "Professor" },
    { to: "/member", label: "Member" },
    { to: "/research", label: "Research" },
    { to: "/activities", label: "Activities" },
    { to: "/publications", label: "Publications" },
    { to: "/lecture", label: "Lecture" },
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

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🏛️ NGNS Lab</Link>
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
