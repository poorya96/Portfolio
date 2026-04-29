import { useContent } from "../context/ContentContext";
import { Briefcase, ExternalLink, Github } from "lucide-react";

export const ExperienceSection = () => {
  const { content } = useContent();

  if (!content || !content.experience) return null;

  return (
    <section id="experience" className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Professional <span className="text-primary">Experience</span>
        </h2>
        <div className="space-y-12">
          {content.experience.map((exp, idx) => (
            <div key={idx} className="relative">
              {/* Timeline dot */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {idx < content.experience.length - 1 && (
                    <div
                      className="w-1 bg-primary/20 flex-grow mt-4"
                      style={{ minHeight: "200px" }}
                    />
                  )}
                </div>
                <div className="flex-grow pb-8">
                  <div className="section-card p-6 border border-primary/25 hover:border-primary/50 hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg md:text-xl font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-medium text-sm md:text-base mt-1">
                          {exp.company}
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 text-xs md:text-sm text-muted-foreground">
                          <span className="font-medium">{exp.period}</span>
                          <span className="hidden md:inline">•</span>
                          <span>{exp.location}</span>
                        </div>

                        {/* Projects */}
                        {exp.projects && (
                          <div className="mt-6 space-y-3">
                            {exp.projects.map((project, pidx) => (
                              <div
                                key={pidx}
                                className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg border border-primary/15"
                              >
                                <h4 className="font-semibold text-foreground text-sm md:text-base mb-2">
                                  {project.name}
                                </h4>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                  {project.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
