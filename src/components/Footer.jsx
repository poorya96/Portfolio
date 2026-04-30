import { useState } from "react";
import { ContactModal } from "./ContactModal";
import { Mail, Github, Linkedin } from "lucide-react";
import { useContent } from "../context/ContentContext";

export const Footer = () => {
  const { content } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!content) return null;

  const { socialLinks, contact } = content;

  return (
    <>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <footer className="border-t border-primary/20 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Brand Section */}
            <div>
              <a
                href="#home"
                className="text-xl font-bold text-primary flex items-center"
              >
                <span className="text-glow px-1 text-foreground">Poorya</span>
                Portfolio
              </a>
              <p className="text-muted-foreground mt-4 text-sm">
                ML researcher specializing in computer vision and deep learning
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#research"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Research
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Experience
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks &&
                  socialLinks.map((link, idx) => {
                    let Icon;
                    if (link.icon === "Mail") Icon = Mail;
                    else if (link.icon === "Github") Icon = Github;
                    else if (link.icon === "Linkedin") Icon = Linkedin;
                    else Icon = Mail;

                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        aria-label={link.name}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="border-t border-primary/20 pt-8 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cosmic-button mb-8"
            >
              Get in Touch
            </button>
            <p className="text-sm text-muted-foreground">
              © 2026 Poorya Hassanzadeh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
