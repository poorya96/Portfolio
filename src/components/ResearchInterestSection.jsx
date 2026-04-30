import { useContent } from "../context/ContentContext";
import { Eye, Brain, Car } from "lucide-react";

export const ResearchInterestSection = () => {
  const { content } = useContent();

  const interestIcons = [Eye, Brain, Car];

  if (!content || !content.research_interests) return null;

  return (
    <section id="research-interests" className="py-24 px-4  ">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Research <span className="text-primary">Interests</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.research_interests.map((interest, idx) => {
            const IconComponent = interestIcons[idx];
            return (
              <div
                key={idx}
                className="section-card p-6 border border-primary/25 hover:border-primary/50 hover:shadow-xl card-hover"
              >
                <div className="flex items-start gap-3">
                  <IconComponent className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
                    {interest}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
