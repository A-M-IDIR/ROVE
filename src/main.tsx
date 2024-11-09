import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnimatePresence } from "framer-motion";

import WtihAlert from "RESOURCES/HOCS/WtihAlert";

import "./style.scss";

function App() {
  React.useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<></>} />
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>
      <WtihAlert>
        <App />
      </WtihAlert>
    </BrowserRouter>
  </QueryClientProvider>
);
