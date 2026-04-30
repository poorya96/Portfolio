import { X, Mail, Github, Linkedin, Download } from "lucide-react";
import { useContent } from "../context/ContentContext";

export const ContactModal = ({ isOpen, onClose }) => {
  const { content } = useContent();

  if (!content) return null;

  const { contact, socialLinks } = content;

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="section-card border border-primary/25 p-8 rounded-lg relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-primary/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

          {/* Contact Info */}
          <div className="space-y-4 mb-8">
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
            >
              <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold text-foreground">{contact.email}</p>
              </div>
            </a>

            {/* Social Links */}
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
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {link.name}
                      </p>
                      <p className="font-semibold text-foreground truncate">
                        {link.display || link.name}
                      </p>
                    </div>
                  </a>
                );
              })}

            {/* CV Download */}
            {contact.cv && (
              <a
                href={contact.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
              >
                <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resume/CV</p>
                  <p className="font-semibold text-foreground">Download</p>
                </div>
              </a>
            )}
          </div>

          {/* Phone and Location */}
          {/* <div className="border-t border-primary/20 pt-4 space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Phone:</span>{" "}
              <span className="font-semibold">{contact.phone}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Location:</span>{" "}
              <span className="font-semibold">{contact.location}</span>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};
