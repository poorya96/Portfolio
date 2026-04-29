import { useEffect, useState } from "react";
import { Sun, Moon, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = ["red", "blue", "green"];

export const ThemeToggle = ({ forMobile = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorTheme, setColorTheme] = useState("red");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }

    const storedColor = localStorage.getItem("color-theme") || "red";
    setColorTheme(storedColor);
    document.documentElement.classList.add(`theme-${storedColor}`);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const toggleColor = () => {
    const currentColorIndex = COLORS.indexOf(colorTheme);
    const nextColorIndex = (currentColorIndex + 1) % COLORS.length;
    const nextColor = COLORS[nextColorIndex];

    document.documentElement.classList.remove(`theme-${colorTheme}`);
    document.documentElement.classList.add(`theme-${nextColor}`);
    localStorage.setItem("color-theme", nextColor);
    setColorTheme(nextColor);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        forMobile ? "flex-row mt-8" : "fixed max-sm:hidden top-5 right-5 z-50",
      )}
    >
      <button
        onClick={toggleColor}
        className={cn(
          "p-2 rounded-full transition-colors duration-300",
          "focus:outline-none",
        )}
      >
        <Palette
          className={cn("h-6 w-6", {
            "text-red-500": colorTheme === "red",
            "text-blue-500": colorTheme === "blue",
            "text-green-500": colorTheme === "green",
          })}
        />
      </button>
      <button
        onClick={toggleTheme}
        className={cn(
          "p-2 rounded-full transition-colors duration-300",
          "focus:outline-none",
        )}
      >
        {isDarkMode ? (
          <Sun className="h-6 w-6 text-yellow-300" />
        ) : (
          <Moon className="h-6 w-6 text-blue-900" />
        )}
      </button>
    </div>
  );
};
