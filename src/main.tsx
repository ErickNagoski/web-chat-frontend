import { createRoot } from "react-dom/client";
// import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home/index.tsx";
import GlobalStyle from "./global.ts";
import Login from "./pages/Login/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import SignupScreen from "./pages/Signup/index.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="cadastro" element={<SignupScreen />} />
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
