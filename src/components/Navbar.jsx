import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Research", href: "#research-interests" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-40 py-5 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-xs" : "py-5",
        )}
      >
        <div className="container flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold text-primary flex items-center"
          >
            <span className="relative z-10">
              <span className="text-glow px-1 text-foreground">Poorya</span>
              Portfolio
            </span>
          </a>
          {/* Desktop Ver */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, key) => (
              <a
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                key={key}
                href={item.href}
              >
                {item.name}{" "}
              </a>
            ))}
          </div>
          {/* Mobile Ver */}
          <button
            className="md:hidden p-2 text-foreground z-50 relative"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} className="text-foreground" />
            ) : (
              <Menu size={24} className="text-foreground" />
            )}
          </button>
        </div>
      </nav>
      {/* Mobile Menu - Outside nav to prevent scroll effect interference */}
      <div
        className={cn(
          "fixed inset-0 h-screen bg-background/20 backdrop-blur-md z-30 flex flex-col items-center justify-center",
          "transition-all duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col space-y-8 text-xl">
          {navItems.map((item, key) => (
            <a
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
              key={key}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}{" "}
            </a>
          ))}
        </div>
        <ThemeToggle forMobile={true} />
      </div>
    </>
  );
};
