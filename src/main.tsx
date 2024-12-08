import { createRoot } from "react-dom/client";
// import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home/index.tsx";
import GlobalStyle from "./global.ts";
import Login from "./pages/Login/index.tsx";
import { Provider } from 'react-redux'
import { store } from "./redux/store.ts";



createRoot(document.getElementById("root")!).render(
  <Provider store={store}>

    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  </Provider>
);
