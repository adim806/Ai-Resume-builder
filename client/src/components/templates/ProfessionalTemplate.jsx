import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const IconCircle = ({ children }) => (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white flex-shrink-0">
            {children}
        </div>
    );

    const SidebarSection = ({ title, children }) => (
        <section className="mb-5 px-6">
            <h2
                className="text-[15px] font-bold mb-3 pb-1.5 border-b-2 -mx-6 px-6 text-white"
                style={{ borderColor: accentColor }}
            >
                {title}
            </h2>
            {children}
        </section>
    );

    const bodyTextClass =
        "text-[13px] text-gray-700 leading-[1.65] hyphens-auto break-words text-pretty [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_b]:font-bold [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:pl-1 [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:pl-1 [&_li]:mb-0.5";

    const techStack = data.tech_stack || {};
    const hasTechStack =
        techStack.languages_frontend?.length > 0 ||
        techStack.backend_dbs?.length > 0 ||
        techStack.tools_testing?.length > 0 ||
        techStack.methodologies?.length > 0;

    const techStackCategories = [
        { key: "languages_frontend", label: "Languages & Frontend" },
        { key: "backend_dbs", label: "Backend & DBs" },
        { key: "tools_testing", label: "Tools & Testing" },
        { key: "methodologies", label: "Methodologies" },
    ];

    return (
        <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-zinc-800">
            <div className="grid grid-cols-[32%_1fr] min-h-[297mm]">
                {/* Left Sidebar */}
                <aside className="bg-[#0f172a] text-white py-7 px-0">
                    {data.personal_info?.image && typeof data.personal_info.image === "string" ? (
                        <div className="mb-5 px-6">
                            <img
                                src={data.personal_info.image}
                                alt="Profile"
                                className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-white shadow-lg"
                            />
                        </div>
                    ) : data.personal_info?.image && typeof data.personal_info.image === "object" ? (
                        <div className="mb-5 px-6">
                            <img
                                src={URL.createObjectURL(data.personal_info.image)}
                                alt="Profile"
                                className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-white shadow-lg"
                            />
                        </div>
                    ) : null}

                    <SidebarSection title="Personal Info">
                        <div className="space-y-2.5 text-[13px]">
                            {data.personal_info?.phone && (
                                <div className="flex items-start gap-2.5">
                                    <IconCircle>
                                        <Phone size={14} style={{ color: accentColor }} />
                                    </IconCircle>
                                    <span className="break-words leading-relaxed pt-0.5">{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-start gap-2.5">
                                    <IconCircle>
                                        <Mail size={14} style={{ color: accentColor }} />
                                    </IconCircle>
                                    <span className="break-words leading-relaxed pt-0.5">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-start gap-2.5">
                                    <IconCircle>
                                        <MapPin size={14} style={{ color: accentColor }} />
                                    </IconCircle>
                                    <span className="leading-relaxed pt-0.5">{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </SidebarSection>

                    {(data.personal_info?.linkedin || data.personal_info?.github || data.personal_info?.website) && (
                        <SidebarSection title="Links">
                            <div className="space-y-2.5">
                                {data.personal_info?.linkedin && (
                                    <div className="flex items-start gap-2.5">
                                        <IconCircle>
                                            <Linkedin size={16} style={{ color: accentColor }} />
                                        </IconCircle>
                                        <a
                                            href={
                                                data.personal_info.linkedin.startsWith("http")
                                                    ? data.personal_info.linkedin
                                                    : `https://${data.personal_info.linkedin}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="break-words underline hover:no-underline leading-relaxed pt-0.5 text-xs text-gray-300"
                                        >
                                            {data.personal_info.linkedin.replace(/^https?:\/\//, "")}
                                        </a>
                                    </div>
                                )}
                                {data.personal_info?.github && (
                                    <div className="flex items-start gap-2.5">
                                        <IconCircle>
                                            <Github size={16} style={{ color: accentColor }} />
                                        </IconCircle>
                                        <a
                                            href={
                                                data.personal_info.github.startsWith("http")
                                                    ? data.personal_info.github
                                                    : `https://${data.personal_info.github}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="break-words underline hover:no-underline leading-relaxed pt-0.5 text-xs text-gray-300"
                                        >
                                            {data.personal_info.github.replace(/^https?:\/\//, "")}
                                        </a>
                                    </div>
                                )}
                                {data.personal_info?.website && (
                                    <div className="flex items-start gap-2.5">
                                        <IconCircle>
                                            <Globe size={14} style={{ color: accentColor }} />
                                        </IconCircle>
                                        <a
                                            href={
                                                data.personal_info.website.startsWith("http")
                                                    ? data.personal_info.website
                                                    : `https://${data.personal_info.website}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="break-words underline hover:no-underline leading-relaxed pt-0.5 text-xs text-gray-300"
                                        >
                                            {data.personal_info.website.replace(/^https?:\/\//, "")}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </SidebarSection>
                    )}

                    {hasTechStack && (
                        <SidebarSection title="Tech Stack">
                            <div className="space-y-3">
                                {techStackCategories.map(({ key, label }) =>
                                    techStack[key]?.length > 0 ? (
                                        <div key={key}>
                                            <h3
                                                className="text-xs font-semibold mb-1 leading-snug"
                                                style={{ color: accentColor }}
                                            >
                                                {label}
                                            </h3>
                                            <p className="text-[13px] text-white leading-relaxed break-words">
                                                {techStack[key].join(", ")}
                                            </p>
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </SidebarSection>
                    )}

                    {data.skills && data.skills.length > 0 && (
                        <SidebarSection title="Skills">
                            <div className="space-y-2">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: accentColor }}
                                        />
                                        <span className="text-[13px] leading-relaxed">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </SidebarSection>
                    )}

                    {data.education && data.education.length > 0 && (
                        <SidebarSection title="Education">
                            <div className="space-y-3">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="text-[13px]">
                                        <h3 className="font-semibold mb-1 leading-snug">{edu.degree}</h3>
                                        <p className="text-gray-300 mb-1 leading-snug text-xs">{edu.institution}</p>
                                        <p className="text-xs text-gray-400 italic leading-snug">
                                            {edu.start_date && formatDate(edu.start_date)}
                                            {edu.start_date && edu.graduation_date && " - "}
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-xs mt-1 leading-snug" style={{ color: accentColor }}>
                                                Average: {edu.gpa}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </SidebarSection>
                    )}
                </aside>

                {/* Right Content */}
                <main className="py-6 px-7 min-w-0">
                    <header className="mb-4">
                        <h1 className="text-3xl font-bold mb-1 text-slate-800 leading-tight">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-xl font-medium leading-tight" style={{ color: accentColor }}>
                            {data.personal_info?.profession || "Software Engineering"}
                        </p>
                    </header>

                    {data.professional_summary && (
                        <section className="mb-5">
                            <div
                                className={bodyTextClass}
                                dangerouslySetInnerHTML={{ __html: data.professional_summary }}
                            />
                        </section>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-5">
                            <h2
                                className="text-[17px] font-bold text-slate-800 mb-3 pb-1.5 border-b-2 w-full"
                                style={{ borderColor: accentColor }}
                            >
                                Work Experience
                            </h2>
                            <div className="space-y-4">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-slate-800 text-[15px] leading-snug">{exp.position}</h3>
                                        <div className="flex justify-between items-start gap-3 mt-1">
                                            <p className="text-[15px] font-semibold leading-snug min-w-0 flex-1" style={{ color: accentColor }}>
                                                {exp.company}
                                            </p>
                                            <span className="text-[13px] text-gray-500 italic leading-snug flex-shrink-0 whitespace-nowrap">
                                                {formatDate(exp.start_date)} -{" "}
                                                {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <div
                                                className={`${bodyTextClass} mt-1 ml-3`}
                                                dangerouslySetInnerHTML={{ __html: exp.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects && data.projects.length > 0 && (
                        <section className="mb-5">
                            <h2
                                className="text-[17px] font-bold text-slate-800 mb-3 pb-1.5 border-b-2 w-full"
                                style={{ borderColor: accentColor }}
                            >
                                Projects & Training
                            </h2>
                            <div className="space-y-4">
                                {data.projects.map((project, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-[15px] leading-snug" style={{ color: accentColor }}>
                                            {project.name}
                                        </h3>
                                        {project.type && (
                                            <p className="text-[13px] text-gray-500 leading-snug mt-0.5">
                                                {project.type}
                                            </p>
                                        )}
                                        {project.description && (
                                            <div
                                                className={`${bodyTextClass} mt-1.5 ml-3`}
                                                dangerouslySetInnerHTML={{ __html: project.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.military_service && data.military_service.length > 0 && (
                        <section>
                            <h2
                                className="text-[17px] font-bold text-slate-800 mb-3 pb-1.5 border-b-2 w-full"
                                style={{ borderColor: accentColor }}
                            >
                                Military Service
                            </h2>
                            <div className="space-y-4">
                                {data.military_service.map((service, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-slate-800 text-[15px] leading-snug">{service.rank}</h3>
                                        <div className="flex justify-between items-start gap-3 mt-1">
                                            <p className="text-[15px] font-semibold leading-snug min-w-0 flex-1" style={{ color: accentColor }}>
                                                {service.unit}
                                            </p>
                                            <span className="text-[13px] text-gray-500 italic leading-snug flex-shrink-0 whitespace-nowrap">
                                                {formatDate(service.start_date)} -{" "}
                                                {service.is_current ? "Present" : formatDate(service.end_date)}
                                            </span>
                                        </div>
                                        {service.description && (
                                            <div
                                                className={`${bodyTextClass} mt-1 ml-3`}
                                                dangerouslySetInnerHTML={{ __html: service.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProfessionalTemplate;
