import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 h-[11in] overflow-hidden">
            <div className="grid grid-cols-12 h-full">
                {/* Left Sidebar - Dark */}
                <aside className="col-span-4 bg-slate-800 text-white py-7 px-0 flex flex-col">
                    {/* Profile Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-5 px-6">
                            <img 
                                src={data.personal_info.image} 
                                alt="Profile" 
                                className="w-26 h-26 object-cover rounded-full mx-auto border-3 border-white shadow-lg" 
                            />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-5 px-6">
                                <img 
                                    src={URL.createObjectURL(data.personal_info.image)} 
                                    alt="Profile" 
                                    className="w-26 h-26 object-cover rounded-full mx-auto border-3 border-white shadow-lg" 
                                />
                            </div>
                        ) : null
                    )}

                    {/* Personal Info Section */}
                    <section className="mb-5 px-6">
                        <h2 className="text-sm font-bold mb-3 pb-1.5 border-b-2 -mx-6 px-6" style={{ borderColor: accentColor }}>
                            Personal Info
                        </h2>
                        <div className="space-y-2.5 text-xs">
                            {data.personal_info?.phone && (
                                <div className="flex items-start gap-2">
                                    <Phone size={14} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="break-words leading-relaxed">{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-start gap-2">
                                    <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="break-words leading-relaxed">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-start gap-2">
                                    <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="leading-relaxed">{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Links Section */}
                    {(data.personal_info?.linkedin || data.personal_info?.website) && (
                        <section className="mb-5 px-6">
                            <h2 className="text-sm font-bold mb-3 pb-1.5 border-b-2 -mx-6 px-6" style={{ borderColor: accentColor }}>
                                Links
                            </h2>
                            <div className="space-y-2.5 text-xs">
                                {data.personal_info?.linkedin && (
                                    <div className="flex items-start gap-2">
                                        <Linkedin size={14} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                        <a 
                                            href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="truncate underline hover:no-underline leading-relaxed block"
                                            style={{ color: accentColor }}
                                        >
                                            {data.personal_info.linkedin}
                                        </a>
                                    </div>
                                )}
                                {data.personal_info?.website && (
                                    <div className="flex items-start gap-2">
                                        <Globe size={14} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                        <a 
                                            href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="truncate underline hover:no-underline leading-relaxed block"
                                            style={{ color: accentColor }}
                                        >
                                            {data.personal_info.website}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Skills Section */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="mb-5 px-6">
                            <h2 className="text-sm font-bold mb-3 pb-1.5 border-b-2 -mx-6 px-6" style={{ borderColor: accentColor }}>
                                Skills
                            </h2>
                            <div className="space-y-2">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }}></div>
                                        <span className="text-xs leading-relaxed">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {data.education && data.education.length > 0 && (
                        <section className="flex-shrink-0 px-6">
                            <h2 className="text-sm font-bold mb-3 pb-1.5 border-b-2 -mx-6 px-6" style={{ borderColor: accentColor }}>
                                Education
                            </h2>
                            <div className="space-y-3">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="text-xs">
                                        <h3 className="font-semibold mb-1 leading-snug">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-300 mb-1 leading-snug text-[11px]">{edu.institution}</p>
                                        <p className="text-[11px] text-gray-400 italic leading-snug">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-[11px] mt-1 leading-snug" style={{ color: accentColor }}>
                                                Average: {edu.gpa}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Content - Light */}
                <main className="col-span-8 py-5 px-7 flex flex-col">
                    {/* Header */}
                    <header className="mb-4 flex-shrink-0">
                        <h1 className="text-3xl font-bold mb-1 text-slate-800 leading-tight">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-lg font-medium leading-tight" style={{ color: accentColor }}>
                            {data.personal_info?.profession || "Software Engineering"}
                        </p>
                    </header>

                    {/* Professional Summary */}
                    {data.professional_summary && (
                        <section className="mb-5 flex-shrink-0">
                            <h2 className="text-base font-bold text-slate-800 mb-3 pb-1.5 border-b-2 w-full" style={{ borderColor: accentColor }}>
                                 
                            </h2>
                            <div 
                                className="text-xs text-gray-700 leading-relaxed whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: data.professional_summary }}
                            />
                        </section>
                    )}

                    {/* Work Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-5 flex-shrink-0">
                            <h2 className="text-base font-bold text-slate-800 mb-3 pb-1.5 border-b-2 w-full" style={{ borderColor: accentColor }}>
                                Work Experience
                            </h2>
                            <div className="space-y-4">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="mb-1.5">
                                            <h3 className="font-bold text-slate-800 text-sm leading-snug">
                                                {exp.position}
                                            </h3>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm font-semibold leading-snug" style={{ color: accentColor }}>
                                                    {exp.company}
                                                </p>
                                                <span className="text-xs text-gray-500 italic leading-snug">
                                                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                        </div>
                                        {exp.description && (
                                            <div 
                                                className="text-xs text-gray-700 leading-relaxed whitespace-pre-line ml-4"
                                                dangerouslySetInnerHTML={{ __html: exp.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <section className="mb-5 flex-shrink-0">
                            <h2 className="text-base font-bold text-slate-800 mb-3 pb-1.5 border-b-2 w-full" style={{ borderColor: accentColor }}>
                                Projects
                            </h2>
                            <div className="space-y-3">
                                {data.projects.map((project, index) => (
                                    <div key={index}>
                                        <div className="mb-1">
                                            <h3 className="font-bold text-slate-800 text-sm leading-snug">{project.name}</h3>
                                            {project.type && (
                                                <p className="text-xs italic text-gray-600 leading-snug">{project.type}</p>
                                            )}
                                        </div>
                                        {project.description && (
                                            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line ml-4">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Military Service */}
                    {data.military_service && data.military_service.length > 0 && (
                        <section className="flex-shrink-0">
                            <h2 className="text-base font-bold text-slate-800 mb-3 pb-1.5 border-b-2 w-full" style={{ borderColor: accentColor }}>
                                Military Service
                            </h2>
                            <div className="space-y-4">
                                {data.military_service.map((service, index) => (
                                    <div key={index}>
                                        <div className="mb-1.5">
                                            <h3 className="font-bold text-slate-800 text-sm leading-snug">
                                                {service.rank}
                                            </h3>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm font-semibold leading-snug" style={{ color: accentColor }}>
                                                    {service.unit}
                                                </p>
                                                <span className="text-xs text-gray-500 italic leading-snug">
                                                    {formatDate(service.start_date)} - {service.is_current ? "Present" : formatDate(service.end_date)}
                                                </span>
                                            </div>
                                        </div>
                                        {service.description && (
                                            <div 
                                                className="text-xs text-gray-700 leading-relaxed whitespace-pre-line ml-4"
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

