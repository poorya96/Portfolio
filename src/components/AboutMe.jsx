import { Code } from "lucide-react";
import { useState } from "react";
import { useContent } from "../context/ContentContext";
import { ContactModal } from "./ContactModal";

export const AboutMe = () => {
  const { content } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!content) return <div>Loading...</div>;

  const { title, description, description2, cards } = content.about;

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          {title} <span className="text-primary">Me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold">
              ML Researcher & Deep Learning Specialist
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              {description2}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="cosmic-button text-sm md:text-base py-2 md:py-3"
              >
                Get in Touch
              </button>
              <a
                href={content?.contact?.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 md:py-3 rounded-full border-2 border-primary text-primary hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center text-sm md:text-base font-medium"
              >
                CV
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="section-card p-5 md:p-6 border border-primary/25 hover:border-primary/50 hover:shadow-lg card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    <Code className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-sm md:text-base text-foreground mb-1">
                      {card.title}
                    </h4>
                    <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
