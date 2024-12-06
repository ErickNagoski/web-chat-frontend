import { createRoot } from "react-dom/client";
// import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home/index.tsx";
import GlobalStyle from "./global.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
    </Routes>
    <GlobalStyle />
  </BrowserRouter>
);
