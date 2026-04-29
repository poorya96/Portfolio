import { useState } from "react";
import { useContent } from "../context/ContentContext";
import {
  Eye,
  EyeOff,
  LogOut,
  RotateCcw,
  Download,
  Upload,
  AlertCircle,
} from "lucide-react";

export const Admin = () => {
  const {
    content,
    loading,
    updateContent,
    resetContent,
    exportContent,
    importContent,
  } = useContent();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if already authenticated via localStorage
    return localStorage.getItem("adminAuth") === "true";
  });
  const [showPassword, setShowPassword] = useState(false);
  const [editContent, setEditContent] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      setPassword("");
      setSaveMessage("Welcome to Admin Panel");
      setTimeout(() => setSaveMessage(""), 3000);
    } else {
      setError("Invalid password");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
    setEditContent(null);
  };

  const handleSaveChanges = () => {
    try {
      updateContent(editContent);
      setSaveMessage("Changes saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      setError("Failed to save changes: " + err.message);
    }
  };

  const handleFieldChange = (path, value) => {
    try {
      const keys = path.split(".");
      let obj = { ...editContent };
      let current = obj;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      setEditContent(obj);
    } catch (err) {
      setError("Error updating field: " + err.message);
    }
  };

  const handleArrayItemChange = (arrayPath, index, key, value) => {
    try {
      const newEditContent = JSON.parse(JSON.stringify(editContent));
      const keys = arrayPath.split(".");
      let arr = newEditContent;

      for (let key of keys) {
        arr = arr[key];
      }

      arr[index][key] = value;
      setEditContent(newEditContent);
    } catch (err) {
      setError("Error updating item: " + err.message);
    }
  };

  const handleAddArrayItem = (arrayPath, template) => {
    try {
      const newEditContent = JSON.parse(JSON.stringify(editContent));
      const keys = arrayPath.split(".");
      let arr = newEditContent;

      for (let key of keys) {
        arr = arr[key];
      }

      arr.push(template);
      setEditContent(newEditContent);
    } catch (err) {
      setError("Error adding item: " + err.message);
    }
  };

  const handleRemoveArrayItem = (arrayPath, index) => {
    try {
      const newEditContent = JSON.parse(JSON.stringify(editContent));
      const keys = arrayPath.split(".");
      let arr = newEditContent;

      for (let key of keys) {
        arr = arr[key];
      }

      arr.splice(index, 1);
      setEditContent(newEditContent);
    } catch (err) {
      setError("Error removing item: " + err.message);
    }
  };

  const handleImport = (e) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        importContent(file);
        setEditContent(null);
        setShowFileInput(false);
      }
    } catch (err) {
      setError("Error importing file: " + err.message);
    }
  };

  const handleStartEditing = () => {
    try {
      if (content) {
        setEditContent(JSON.parse(JSON.stringify(content)));
      }
    } catch (err) {
      setError("Error loading content: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-lg p-8 border border-primary/20">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-foreground"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
              {saveMessage && (
                <div className="p-3 bg-green-500/20 border border-green-500 rounded text-green-400 text-sm">
                  {saveMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Portfolio Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleSaveChanges}
            disabled={!editContent}
            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              resetContent();
              setEditContent(null);
              setSaveMessage("Content reset to default");
              setTimeout(() => setSaveMessage(""), 3000);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
          >
            <RotateCcw size={18} /> Reset
          </button>
          <button
            onClick={exportContent}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <Download size={18} /> Export
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFileInput(!showFileInput)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
            >
              <Upload size={18} /> Import
            </button>
            {showFileInput && (
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="absolute top-full mt-2 left-0 z-10"
              />
            )}
          </div>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mb-8 p-4 bg-green-500/20 border border-green-500 rounded text-green-400">
            {saveMessage}
          </div>
        )}

        {/* Content Editor */}
        {editContent ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-card border border-primary/20 rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-primary">Hero Section</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editContent.hero.title}
                  onChange={(e) =>
                    handleFieldChange("hero.title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={editContent.hero.subtitle}
                  onChange={(e) =>
                    handleFieldChange("hero.subtitle", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={editContent.hero.description}
                  onChange={(e) =>
                    handleFieldChange("hero.description", e.target.value)
                  }
                  rows="3"
                  className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                />
              </div>
            </div>

            {/* About Section */}
            <div className="bg-card border border-primary/20 rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-primary">About Section</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editContent.about.title}
                  onChange={(e) =>
                    handleFieldChange("about.title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description 1
                </label>
                <textarea
                  value={editContent.about.description}
                  onChange={(e) =>
                    handleFieldChange("about.description", e.target.value)
                  }
                  rows="3"
                  className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description 2
                </label>
                <textarea
                  value={editContent.about.description2}
                  onChange={(e) =>
                    handleFieldChange("about.description2", e.target.value)
                  }
                  rows="3"
                  className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                />
              </div>

              {/* About Cards */}
              <div className="space-y-4 mt-6">
                <h3 className="text-xl font-semibold">About Cards</h3>
                {editContent.about.cards?.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-background border border-primary/20 p-4 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Card {idx + 1}</h4>
                      <button
                        onClick={() =>
                          handleRemoveArrayItem("about.cards", idx)
                        }
                        className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Card Title"
                      value={card.title}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "about.cards",
                          idx,
                          "title",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 bg-card border border-primary/30 rounded text-foreground text-sm"
                    />
                    <textarea
                      placeholder="Card Description"
                      value={card.description}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "about.cards",
                          idx,
                          "description",
                          e.target.value,
                        )
                      }
                      rows="2"
                      className="w-full px-3 py-2 bg-card border border-primary/30 rounded text-foreground text-sm"
                    />
                  </div>
                ))}
                <button
                  onClick={() =>
                    handleAddArrayItem("about.cards", {
                      title: "New Card",
                      description: "Card description",
                    })
                  }
                  className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded text-sm"
                >
                  + Add Card
                </button>
              </div>
            </div>

            {/* Skills Section */}
            {editContent.skills && (
              <div className="bg-card border border-primary/20 rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-primary">Skills</h2>

                {/* Programming */}
                {editContent.skills.programming && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      Programming
                    </h3>
                    <div className="space-y-2">
                      {editContent.skills.programming.map((skill, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = { ...editContent.skills };
                              newSkills.programming[idx] = e.target.value;
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="flex-1 px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                          />
                          <button
                            onClick={() => {
                              const newSkills = { ...editContent.skills };
                              newSkills.programming.splice(idx, 1);
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = { ...editContent.skills };
                        newSkills.programming.push("New Skill");
                        setEditContent({ ...editContent, skills: newSkills });
                      }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                    >
                      + Add
                    </button>
                  </div>
                )}

                {/* ML/DL Frameworks */}
                {editContent.skills.ml_frameworks && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      ML/DL Frameworks
                    </h3>
                    <div className="space-y-2">
                      {editContent.skills.ml_frameworks.map((skill, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = { ...editContent.skills };
                              newSkills.ml_frameworks[idx] = e.target.value;
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="flex-1 px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                          />
                          <button
                            onClick={() => {
                              const newSkills = { ...editContent.skills };
                              newSkills.ml_frameworks.splice(idx, 1);
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = { ...editContent.skills };
                        newSkills.ml_frameworks.push("New Framework");
                        setEditContent({ ...editContent, skills: newSkills });
                      }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                    >
                      + Add
                    </button>
                  </div>
                )}

                {/* Data Tools */}
                {editContent.skills.data_tools && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      Data Analysis
                    </h3>
                    <div className="space-y-2">
                      {editContent.skills.data_tools.map((skill, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = { ...editContent.skills };
                              newSkills.data_tools[idx] = e.target.value;
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="flex-1 px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                          />
                          <button
                            onClick={() => {
                              const newSkills = { ...editContent.skills };
                              newSkills.data_tools.splice(idx, 1);
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = { ...editContent.skills };
                        newSkills.data_tools.push("New Tool");
                        setEditContent({ ...editContent, skills: newSkills });
                      }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                    >
                      + Add
                    </button>
                  </div>
                )}

                {/* Vision ML */}
                {editContent.skills.vision_ml && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      Computer Vision
                    </h3>
                    <div className="space-y-2">
                      {editContent.skills.vision_ml.map((skill, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = { ...editContent.skills };
                              newSkills.vision_ml[idx] = e.target.value;
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="flex-1 px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                          />
                          <button
                            onClick={() => {
                              const newSkills = { ...editContent.skills };
                              newSkills.vision_ml.splice(idx, 1);
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = { ...editContent.skills };
                        newSkills.vision_ml.push("New Skill");
                        setEditContent({ ...editContent, skills: newSkills });
                      }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                    >
                      + Add
                    </button>
                  </div>
                )}

                {/* Tools */}
                {editContent.skills.tools && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      Tools & DevOps
                    </h3>
                    <div className="space-y-2">
                      {editContent.skills.tools.map((skill, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = { ...editContent.skills };
                              newSkills.tools[idx] = e.target.value;
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="flex-1 px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                          />
                          <button
                            onClick={() => {
                              const newSkills = { ...editContent.skills };
                              newSkills.tools.splice(idx, 1);
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = { ...editContent.skills };
                        newSkills.tools.push("New Tool");
                        setEditContent({ ...editContent, skills: newSkills });
                      }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                    >
                      + Add
                    </button>
                  </div>
                )}

                {/* Hardware */}
                {editContent.skills.hardware && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      Hardware & Embedded
                    </h3>
                    <div className="space-y-2">
                      {editContent.skills.hardware.map((skill, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = { ...editContent.skills };
                              newSkills.hardware[idx] = e.target.value;
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="flex-1 px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
                          />
                          <button
                            onClick={() => {
                              const newSkills = { ...editContent.skills };
                              newSkills.hardware.splice(idx, 1);
                              setEditContent({
                                ...editContent,
                                skills: newSkills,
                              });
                            }}
                            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = { ...editContent.skills };
                        newSkills.hardware.push("New Hardware");
                        setEditContent({ ...editContent, skills: newSkills });
                      }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Projects Section */}
            <div className="bg-card border border-primary/20 rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-primary">Projects</h2>
              {editContent.projects?.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-background border border-primary/20 p-4 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Project {idx + 1}</h4>
                    <button
                      onClick={() => handleRemoveArrayItem("projects", idx)}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "projects",
                        idx,
                        "title",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 bg-card border border-primary/30 rounded text-foreground text-sm"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "projects",
                        idx,
                        "description",
                        e.target.value,
                      )
                    }
                    rows="2"
                    className="w-full px-3 py-2 bg-card border border-primary/30 rounded text-foreground text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={project.imageUrl}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "projects",
                        idx,
                        "imageUrl",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 bg-card border border-primary/30 rounded text-foreground text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Project URL"
                    value={project.projectUrl}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "projects",
                        idx,
                        "projectUrl",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 bg-card border border-primary/30 rounded text-foreground text-sm"
                  />
                  <input
                    type="text"
                    placeholder="GitHub URL"
                    value={project.githubUrl}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "projects",
                        idx,
                        "githubUrl",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 bg-card border border-primary/30 rounded text-foreground text-sm"
                  />
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={project.tags.join(", ")}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "projects",
                          idx,
                          "tags",
                          e.target.value.split(",").map((tag) => tag.trim()),
                        )
                      }
                      className="w-full px-3 py-2 bg-card border border-primary/30 rounded text-foreground text-sm"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  handleAddArrayItem("projects", {
                    id: editContent.projects.length + 1,
                    title: "New Project",
                    description: "Project description",
                    imageUrl: "/Projects/project.png",
                    tags: ["Tag1", "Tag2"],
                    projectUrl: "https://example.com",
                    githubUrl: "https://github.com",
                  })
                }
                className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
              >
                + Add Project
              </button>
            </div>

            {/* Contact Section */}
            <div className="bg-card border border-primary/20 rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-primary">
                Contact Information
              </h2>
              <input
                type="email"
                placeholder="Email"
                value={editContent.contact.email}
                onChange={(e) =>
                  handleFieldChange("contact.email", e.target.value)
                }
                className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={editContent.contact.phone}
                onChange={(e) =>
                  handleFieldChange("contact.phone", e.target.value)
                }
                className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
              />
              <input
                type="text"
                placeholder="Location"
                value={editContent.contact.location}
                onChange={(e) =>
                  handleFieldChange("contact.location", e.target.value)
                }
                className="w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground"
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <button
              onClick={handleStartEditing}
              className="px-8 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Editing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
