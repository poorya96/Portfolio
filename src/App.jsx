import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <ContentProvider>
      <BrowserRouter basename="/Portfolio/">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}

export default App;
