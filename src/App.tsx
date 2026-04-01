import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "./AppBar";
import ResumePage from "./ResumePage";
import ProjectsPage from "./ProjectsPage";
import BlogPage from "./BlogPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}
