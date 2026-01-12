import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white h-[11in] overflow-hidden">
            {/* Header Section with Dark Background */}
            <header className="bg-slate-700 text-white relative pb-12">
                <div className="flex items-center gap-6 px-8 pt-8 pb-4">
                    {/* Profile Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <img 
                            src={data.personal_info.image} 
                            alt="Profile" 
                            className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg flex-shrink-0" 
                        />
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <img 
                                src={URL.createObjectURL(data.personal_info.image)} 
                                alt="Profile" 
                                className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg flex-shrink-0" 
                            />
                        ) : null
                    )}

                    {/* Name and Title */}
                    <div>
                        <h1 className="text-4xl font-bold mb-2 leading-tight">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-xl font-medium text-gray-200">
                            {data.personal_info?.profession || "Software Engineering"}
                        </p>
                    </div>
                </div>

                {/* Triangle/Arrow Shape - Smooth connection */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '60px' }}>
                    <svg className="absolute bottom-0 left-0" width="300" height="60" viewBox="0 0 300 60" preserveAspectRatio="none">
                        <path d="M 0 0 L 300 60 L 0 60 Z" fill="#e7e5e4" />
                    </svg>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12">
                {/* Left Sidebar - Beige/Cream */}
                <aside className="col-span-4 bg-stone-200 px-7 py-6">
                    {/* Personal Info */}
                    <section className="mb-6">
                        <h2 className="text-base font-bold mb-4 text-gray-800">
                            Personal Info
                        </h2>
                        <div className="space-y-3 text-xs">
                            {data.personal_info?.email && (
                                <div className="flex items-start gap-2">
                                    <Mail size={16} className="mt-0.5 flex-shrink-0 text-gray-700" />
                                    <span className="break-words leading-relaxed text-gray-700">
                                        {data.personal_info.email}
                                    </span>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="flex items-start gap-2">
                                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-gray-700" />
                                    <span className="leading-relaxed text-gray-700">
                                        {data.personal_info.phone}
                                    </span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-start gap-2">
                                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-700" />
                                    <span className="leading-relaxed text-gray-700">
                                        {data.personal_info.location}
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-base font-bold mb-4 text-gray-800">
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="text-xs border-l-2 border-gray-400 pl-3">
                                        <h3 className="font-semibold mb-1 leading-snug text-gray-800">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-700 mb-1 leading-snug">
                                            {edu.institution}
                                        </p>
                                        <p className="text-[11px] text-gray-600 leading-snug">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-[11px] mt-1 text-gray-600">
                                                (Average: {edu.gpa})
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-base font-bold mb-4 text-gray-800">
                                Skills
                            </h2>
                            <div className="space-y-1.5">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="text-xs text-gray-700 leading-relaxed">
                                        {skill} - Expert
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Links */}
                    {(data.personal_info?.linkedin || data.personal_info?.website) && (
                        <section>
                            <h2 className="text-base font-bold mb-4 text-gray-800">
                                Links
                            </h2>
                            <div className="space-y-2.5 text-xs">
                                {data.personal_info?.linkedin && (
                                    <div className="flex items-start gap-2">
                                        <Linkedin size={14} className="mt-0.5 flex-shrink-0 text-gray-700" />
                                        <a 
                                            href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="truncate underline hover:no-underline leading-relaxed block text-gray-700"
                                        >
                                            {data.personal_info.linkedin}
                                        </a>
                                    </div>
                                )}
                                {data.personal_info?.website && (
                                    <div className="flex items-start gap-2">
                                        <Globe size={14} className="mt-0.5 flex-shrink-0 text-gray-700" />
                                        <a 
                                            href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="truncate underline hover:no-underline leading-relaxed block text-gray-700"
                                        >
                                            {data.personal_info.website}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Content - White */}
                <main className="col-span-8 px-8 py-6">
                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                                Summary
                            </h2>
                            <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-line">
                                <span className="font-bold">Recent {data.personal_info?.profession || "Software Engineering"} graduate</span> {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                                Work Experience
                            </h2>
                            <div className="space-y-4">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="mb-2">
                                            <h3 className="font-bold text-gray-900 text-sm leading-snug">
                                                {exp.position}
                                            </h3>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm font-semibold text-gray-700 leading-snug">
                                                    {exp.company}
                                                </p>
                                                <span className="text-xs text-gray-500 italic leading-snug">
                                                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                        </div>
                                        {exp.description && (
                                            <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line ml-4">
                                                {exp.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                                Projects
                            </h2>
                            <div className="space-y-3">
                                {data.projects.map((project, index) => (
                                    <div key={index}>
                                        <div className="mb-1">
                                            <h3 className="font-bold text-gray-900 text-sm leading-snug">
                                                {project.name}
                                            </h3>
                                            {project.type && (
                                                <p className="text-xs italic text-gray-600 leading-snug">
                                                    {project.type}
                                                </p>
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

                    {/* Military Service (if exists in experience) */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                            Military Service
                        </h2>
         
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CreativeTemplate;

