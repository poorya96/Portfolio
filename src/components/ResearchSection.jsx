import { useContent } from "../context/ContentContext";
import { BookMarked, Microscope } from "lucide-react";

export const ResearchSection = () => {
  const { content } = useContent();

  if (!content || !content.research) return null;

  return (
    <section id="research" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          <span className="text-primary">Research</span> & Projects
        </h2>
        <div className="space-y-6">
          {content.research.map((project, idx) => (
            <div
              key={idx}
              className="section-card p-6 border border-primary/25 hover:border-primary/50 hover:shadow-xl card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                  <Microscope className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {project.period}
                    </span>
                  </div>
                  {project.status && (
                    <p className="text-sm text-primary/70 mt-1">
                      Status: {project.status}
                    </p>
                  )}
                  <p className="text-muted-foreground mt-3">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
