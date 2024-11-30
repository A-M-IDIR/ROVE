import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnimatePresence } from "framer-motion";

import WithAlert from "RESOURCES/HOCS/WithAlert";
import WithNoContexMenu from "RESOURCES/HOCS/WithNoContexMenu";
import WithLoadFont from "RESOURCES/HOCS/WithLoadFont";

import { TerminalWithVFX } from "PAGES/Terminal";

import "./style.scss";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TerminalWithVFX />} />
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>
      <WithAlert>
        <WithNoContexMenu>
          <WithLoadFont>
            <App />
          </WithLoadFont>
        </WithNoContexMenu>
      </WithAlert>
    </BrowserRouter>
  </QueryClientProvider>
);
