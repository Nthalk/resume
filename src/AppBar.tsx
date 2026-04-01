import { NavLink } from "react-router-dom";
import { resume } from "./data";

export default function AppBar() {
  return (
    <nav className="appbar">
      <NavLink to="/" className="appbar__brand">
        {resume.name}
      </NavLink>
      <div className="appbar__links">
        <NavLink to="/" end>
          Resume
        </NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </div>
    </nav>
  );
}
