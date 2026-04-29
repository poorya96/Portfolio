import { useContent } from "../context/ContentContext";
import { BookOpen, Award } from "lucide-react";

export const EducationSection = () => {
  const { content } = useContent();

  if (!content || !content.education) return null;

  return (
    <section id="education" className="py-24 px-4  ">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          <span className="text-primary">Education</span>
        </h2>
        <div className="space-y-6">
          {content.education.map((edu, idx) => (
            <div
              key={idx}
              className="section-card p-6 border border-primary/25 hover:border-primary/50 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <span className="text-sm text-muted-foreground">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-primary mt-1">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground mt-2">
                      GPA: {edu.gpa}
                    </p>
                  )}
                  {edu.thesis && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-foreground">
                        Thesis:{" "}
                        <span className="font-normal">{edu.thesis}</span>
                      </p>
                    </div>
                  )}
                  {edu.details && (
                    <p className="text-sm text-muted-foreground mt-3">
                      {edu.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
