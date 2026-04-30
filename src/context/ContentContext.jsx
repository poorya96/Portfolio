import { createContext, useContext, useEffect, useState } from "react";

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load from localStorage first (only in production)
    if (!import.meta.env.DEV) {
      const savedContent = localStorage.getItem("portfolioContent");
      if (savedContent) {
        try {
          setContent(JSON.parse(savedContent));
          setLoading(false);
          return;
        } catch (e) {
          console.error("Failed to parse saved content", e);
        }
      }
    }

    // Always load from public/content.json during development, or if no localStorage
    fetch(import.meta.env.BASE_URL + "content.json")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load content:", err);
        setLoading(false);
      });
  }, []);

  const updateContent = (newContent) => {
    setContent(newContent);
    localStorage.setItem("portfolioContent", JSON.stringify(newContent));
  };

  const resetContent = () => {
    localStorage.removeItem("portfolioContent");
    fetch(import.meta.env.BASE_URL + "content.json")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
      })
      .catch((err) => console.error("Failed to reset content:", err));
  };

  const exportContent = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-content.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importContent = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        updateContent(importedData);
        alert("Content imported successfully!");
      } catch (err) {
        alert("Failed to import content: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        updateContent,
        resetContent,
        exportContent,
        importContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
