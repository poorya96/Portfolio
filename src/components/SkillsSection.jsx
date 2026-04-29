import { useContent } from "../context/ContentContext";
import { useState } from "react";

export const SkillsSection = () => {
  const { content } = useContent();

  if (!content || !content.skills) return <div>Loading...</div>;

  const categories = [
    { key: "programming", label: "Programming" },
    { key: "ml_frameworks", label: "ML/DL Frameworks" },
    { key: "data_tools", label: "Data Analysis" },
    { key: "vision_ml", label: "Computer Vision" },
    { key: "tools", label: "Tools & DevOps" },
    { key: "hardware", label: "Hardware & Embedded" },
  ];

  const [activeCategory, setActiveCategory] = useState("programming");

  const activeSkills = content.skills[activeCategory] || [];

  return (
    <section id="skills" className="py-24 px-4 ">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Technical <span className="text-primary">Skills</span>
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-xs md:text-sm font-semibold ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "section-card text-foreground hover:border-primary/50 border-2 border-primary/25"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeSkills.map((skill, key) => (
            <div
              key={key}
              className="section-card p-4 border border-primary/25 hover:border-primary/50 hover:shadow-lg card-hover text-center"
            >
              <h3 className="font-semibold text-xs md:text-sm text-foreground">
                {skill}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
