import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function App() {
  const basename = import.meta.env.PROD ? "/Portfolio/" : "/";

  return (
    <ContentProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}

export default App;
