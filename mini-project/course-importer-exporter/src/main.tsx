import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./app-layout.tsx";
import "./index.css";
import MainUserPage from "./pages/main-user-page.tsx";
import MainCoursePage from "./pages/main-course-page.tsx";
import MainTryoutSectionPage from "./pages/main-tryout-section-page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<MainUserPage />} />
          <Route path="users" element={<MainUserPage />} />
          <Route path="courses" element={<MainCoursePage />} />
          <Route path="tryout-sections" element={<MainTryoutSectionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
