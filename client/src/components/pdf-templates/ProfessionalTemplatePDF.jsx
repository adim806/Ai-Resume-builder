import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font, Svg, Path, Circle, Rect, Line, Link } from '@react-pdf/renderer';

// Register fonts for better rendering (optional - using default for now)
// Font.register({ family: 'Inter', src: 'path-to-font.ttf' });

const ProfessionalTemplatePDF = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    // Convert hex color to rgba with opacity
    const hexToRgba = (hex, opacity) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            fontFamily: 'Helvetica',
        },
        leftSidebar: {
            width: '33.33%',
            backgroundColor: '#0f172a', // slate-900 (darker)
            color: '#ffffff',
            padding: '18 20',
        },
        rightContent: {
            width: '66.67%',
            padding: '20 24',
        },
        profileImage: {
            width: 75,
            height: 75,
            borderRadius: 37.5,
            marginBottom: 12,
            alignSelf: 'center',
            border: '2px solid #ffffff',
        },
        sectionTitle: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 10,
            paddingBottom: 4,
            borderBottom: `2px solid ${accentColor}`,
            marginLeft: -24,
            marginRight: -24,
            paddingLeft: 24,
            paddingRight: 24,
        },
        sectionTitleLeft: {
            fontSize: 11.5,
            fontWeight: 'bold',
            marginBottom: 7,
            paddingBottom: 3,
            borderBottom: `1.5px solid ${accentColor}`,
            marginLeft: -20,
            marginRight: -20,
            paddingLeft: 20,
            paddingRight: 20,
        },
        section: {
            marginBottom: 13,
        },
        iconRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            fontSize: 9,
        },
        iconContainer: {
            width: 16,
            height: 16,
            marginRight: 7,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 2.5,
        },
        textSmall: {
            fontSize: 9.5,
            lineHeight: 1.35,
            color: '#ffffff',
        },
        textGray: {
            fontSize: 9.5,
            lineHeight: 1.35,
            color: '#d1d5db',
        },
        skillBullet: {
            width: 5.5,
            height: 5.5,
            borderRadius: 2.75,
            backgroundColor: accentColor,
            marginRight: 7,
        },
        skillRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4.5,
        },
        skillText: {
            fontSize: 10.5,
            color: '#ffffff',
        },
        techStackCategory: {
            fontSize: 8,
            fontWeight: 'bold',
            color: accentColor,
            marginBottom: 1.5,
            marginTop: 0,
        },
        techStackItems: {
            fontSize: 9,
            color: '#d1d5db',
            lineHeight: 1.35,
        },
        headerName: {
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 4,
            color: '#1e293b',
        },
        headerProfession: {
            fontSize: 14,
            fontWeight: 'normal',
            color: accentColor,
            marginBottom: 8,
        },
        summary: {
            fontSize: 10,
            lineHeight: 1.6,
            color: '#374151',
            marginBottom: 5,
            textAlign: 'left',
        },
        jobTitle: {
            fontSize: 11,
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: 1,
        },
        companyName: {
            fontSize: 10,
            fontWeight: 'semibold',
            color: accentColor,
        },
        dateRange: {
            fontSize: 8,
            color: '#6b7280',
            fontStyle: 'italic',
        },
        experienceHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
        },
        description: {
            fontSize: 10,
            lineHeight: 1.6,
            color: '#374151',
            marginLeft: 12,
            marginTop: 3,
            textAlign: 'left',
        },
        experienceItem: {
            marginBottom: 8,
        },
        educationItem: {
            marginBottom: 8,
        },
        educationDegree: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 1.5,
        },
        educationInstitution: {
            fontSize: 9,
            color: '#d1d5db',
            marginBottom: 1.5,
        },
        educationDate: {
            fontSize: 8.5,
            color: '#9ca3af',
            fontStyle: 'italic',
        },
        educationGpa: {
            fontSize: 9,
            color: accentColor,
            marginTop: 1.5,
        },
        projectName: {
            fontSize: 10,
            fontWeight: 'semibold',
            color: accentColor,
            marginBottom: 2,
        },
        projectType: {
            fontSize: 8,
            color: '#6b7280',
            fontStyle: 'italic',
            marginBottom: 3,
        },
    });

    // Enhanced HTML parsing with better formatting preservation and whitespace control
    const parseHtmlContent = (html) => {
        if (!html) return [];
        
        let content = html;
        
        // Step 1: Normalize whitespace before processing tags
        content = content.trim();
        
        // Step 2: Handle list structures - use placeholder to control spacing precisely
        content = content.replace(/<ul[^>]*>/gi, '|||UL_START|||');
        content = content.replace(/<\/ul>/gi, '|||UL_END|||');
        content = content.replace(/<ol[^>]*>/gi, '|||OL_START|||');
        content = content.replace(/<\/ol>/gi, '|||OL_END|||');
        content = content.replace(/<li[^>]*>/gi, '|||LI|||');
        content = content.replace(/<\/li>/gi, '');
        
        // Step 3: Handle paragraphs and breaks
        content = content.replace(/<br\s*\/?>/gi, '\n');
        content = content.replace(/<\/p>/gi, '\n');
        content = content.replace(/<p[^>]*>/gi, '');
        
        // Step 4: Convert placeholders to actual formatting with controlled spacing
        content = content.replace(/\|\|\|UL_START\|\|\|/g, '');
        content = content.replace(/\|\|\|UL_END\|\|\|/g, '');
        content = content.replace(/\|\|\|OL_START\|\|\|/g, '');
        content = content.replace(/\|\|\|OL_END\|\|\|/g, '');
        content = content.replace(/\|\|\|LI\|\|\|/g, '\n• ');
        
        // Step 5: Clean up excessive newlines and whitespace
        // Replace multiple consecutive newlines with maximum of 2
        content = content.replace(/\n{3,}/g, '\n\n');
        // Trim leading/trailing newlines
        content = content.replace(/^\n+/, '');
        content = content.replace(/\n+$/, '');
        // Clean up spaces around newlines
        content = content.replace(/[ \t]+\n/g, '\n');
        content = content.replace(/\n[ \t]+/g, '\n');
        
        // Step 6: Parse with formatting tags
        const tagRegex = /(<strong[^>]*>|<\/strong>|<b[^>]*>|<\/b>|<em[^>]*>|<\/em>|<i[^>]*>|<\/i>|<u[^>]*>|<\/u>)/gi;
        const parts = content.split(tagRegex);
        
        const segments = [];
        let formatStack = { bold: false, italic: false, underline: false };
        
        parts.forEach(part => {
            const lowerPart = part.toLowerCase();
            
            if (lowerPart.startsWith('<strong') || lowerPart.startsWith('<b')) {
                formatStack.bold = true;
            } else if (lowerPart === '</strong>' || lowerPart === '</b>') {
                formatStack.bold = false;
            } else if (lowerPart.startsWith('<em') || lowerPart.startsWith('<i')) {
                formatStack.italic = true;
            } else if (lowerPart === '</em>' || lowerPart === '</i>') {
                formatStack.italic = false;
            } else if (lowerPart.startsWith('<u')) {
                formatStack.underline = true;
            } else if (lowerPart === '</u>') {
                formatStack.underline = false;
            } else if (part && !part.startsWith('<')) {
                // Clean text content and HTML entities
                const cleanText = part
                    .replace(/<[^>]+>/g, '')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/[ \t]+/g, ' '); // Normalize internal spaces
                
                if (cleanText) {
                    segments.push({
                        text: cleanText,
                        bold: formatStack.bold,
                        italic: formatStack.italic,
                        underline: formatStack.underline
                    });
                }
            }
        });
        
        return segments;
    };

    // Icon Components
    const PhoneIcon = () => (
        <Svg width="11" height="11" viewBox="0 0 24 24">
            <Path
                d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                fill={accentColor}
            />
        </Svg>
    );

    const EmailIcon = () => (
        <Svg width="11" height="11" viewBox="0 0 24 24">
            <Path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                fill={accentColor}
            />
        </Svg>
    );

    const LocationIcon = () => (
        <Svg width="11" height="11" viewBox="0 0 24 24">
            <Path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill={accentColor}
            />
        </Svg>
    );

    const LinkedInIcon = () => (
        <Svg width="11" height="11" viewBox="0 0 24 24">
            <Path
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                fill={accentColor}
            />
        </Svg>
    );

    const WebsiteIcon = () => (
        <Svg width="11" height="11" viewBox="0 0 24 24">
            <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill={accentColor}
            />
        </Svg>
    );

    const GitHubIcon = () => (
        <Svg width="11" height="11" viewBox="0 0 24 24">
            <Path
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
                fill={accentColor}
            />
        </Svg>
    );

    // Enhanced formatted text component that preserves formatting accurately
    const FormattedText = ({ html, style = {} }) => {
        const segments = parseHtmlContent(html);
        
        if (segments.length === 0) return null;
        
        return (
            <Text style={style}>
                {segments.map((segment, index) => {
                    // Determine font family based on formatting
                    let fontFamily = 'Helvetica';
                    if (segment.bold && segment.italic) {
                        fontFamily = 'Helvetica-BoldOblique';
                    } else if (segment.bold) {
                        fontFamily = 'Helvetica-Bold';
                    } else if (segment.italic) {
                        fontFamily = 'Helvetica-Oblique';
                    }
                    
                    return (
                        <Text
                            key={index}
                            style={{
                                fontFamily: fontFamily,
                                textDecoration: segment.underline ? 'underline' : 'none',
                            }}
                        >
                            {segment.text}
                        </Text>
                    );
                })}
            </Text>
        );
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Left Sidebar */}
                <View style={styles.leftSidebar}>
                    {/* Profile Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' && (
                        <Image
                            src={data.personal_info.image}
                            style={styles.profileImage}
                        />
                    )}

                    {/* Personal Info Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitleLeft}>Personal Info</Text>
                        
                        {data.personal_info?.phone && (
                            <View style={styles.iconRow}>
                                <View style={styles.iconContainer}>
                                    <PhoneIcon />
                                </View>
                                <Text style={styles.textSmall}>{data.personal_info.phone}</Text>
                            </View>
                        )}
                        
                        {data.personal_info?.email && (
                            <View style={styles.iconRow}>
                                <View style={styles.iconContainer}>
                                    <EmailIcon />
                                </View>
                                <Text style={styles.textSmall}>{data.personal_info.email}</Text>
                            </View>
                        )}
                        
                        {data.personal_info?.location && (
                            <View style={styles.iconRow}>
                                <View style={styles.iconContainer}>
                                    <LocationIcon />
                                </View>
                                <Text style={styles.textSmall}>{data.personal_info.location}</Text>
                            </View>
                        )}
                    </View>

                    {/* Links Section */}
                    {(data.personal_info?.linkedin || data.personal_info?.website || data.personal_info?.github) && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleLeft}>Links</Text>
                            
                            {data.personal_info?.linkedin && (
                                <Link src={data.personal_info.linkedin} style={{ textDecoration: 'none' }}>
                                    <View style={styles.iconRow}>
                                        <View style={styles.iconContainer}>
                                            <LinkedInIcon />
                                        </View>
                                        <Text style={styles.textGray}>
                                            {data.personal_info.linkedin.replace(/^https?:\/\//, '')}
                                        </Text>
                                    </View>
                                </Link>
                            )}
                            
                            {data.personal_info?.github && (
                                <Link src={data.personal_info.github} style={{ textDecoration: 'none' }}>
                                    <View style={styles.iconRow}>
                                        <View style={styles.iconContainer}>
                                            <GitHubIcon />
                                        </View>
                                        <Text style={styles.textGray}>
                                            {data.personal_info.github.replace(/^https?:\/\//, '')}
                                        </Text>
                                    </View>
                                </Link>
                            )}
                            
                            {data.personal_info?.website && (
                                <Link src={data.personal_info.website} style={{ textDecoration: 'none' }}>
                                    <View style={styles.iconRow}>
                                        <View style={styles.iconContainer}>
                                            <WebsiteIcon />
                                        </View>
                                        <Text style={styles.textGray}>
                                            {data.personal_info.website.replace(/^https?:\/\//, '')}
                                        </Text>
                                    </View>
                                </Link>
                            )}
                        </View>
                    )}

                    {/* Tech Stack Section */}
                    {data.tech_stack && (
                        (data.tech_stack.languages_frontend?.length > 0 || 
                         data.tech_stack.backend_dbs?.length > 0 || 
                         data.tech_stack.tools_testing?.length > 0 || 
                         data.tech_stack.methodologies?.length > 0) && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleLeft}>Tech Stack</Text>
                            
                            {data.tech_stack.languages_frontend?.length > 0 && (
                                <View style={{ marginBottom: 3.5 }}>
                                    <Text style={styles.techStackCategory}>Languages & Frontend</Text>
                                    <Text style={styles.techStackItems}>
                                        {data.tech_stack.languages_frontend.join(' • ')}
                                    </Text>
                                </View>
                            )}
                            
                            {data.tech_stack.backend_dbs?.length > 0 && (
                                <View style={{ marginBottom: 3.5 }}>
                                    <Text style={styles.techStackCategory}>Backend & DBs</Text>
                                    <Text style={styles.techStackItems}>
                                        {data.tech_stack.backend_dbs.join(' • ')}
                                    </Text>
                                </View>
                            )}
                            
                            {data.tech_stack.tools_testing?.length > 0 && (
                                <View style={{ marginBottom: 3.5 }}>
                                    <Text style={styles.techStackCategory}>Tools & Testing</Text>
                                    <Text style={styles.techStackItems}>
                                        {data.tech_stack.tools_testing.join(' • ')}
                                    </Text>
                                </View>
                            )}
                            
                            {data.tech_stack.methodologies?.length > 0 && (
                                <View style={{ marginBottom: 3.5 }}>
                                    <Text style={styles.techStackCategory}>Methodologies</Text>
                                    <Text style={styles.techStackItems}>
                                        {data.tech_stack.methodologies.join(' • ')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))}

                    {/* Skills Section */}
                    {data.skills && data.skills.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleLeft}>Skills</Text>
                            {data.skills.map((skill, index) => (
                                <View key={index} style={styles.skillRow}>
                                    <View style={styles.skillBullet} />
                                    <Text style={styles.skillText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Education Section */}
                    {data.education && data.education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleLeft}>Education</Text>
                            {data.education.map((edu, index) => (
                                <View key={index} style={styles.educationItem}>
                                    <Text style={styles.educationDegree}>
                                        {edu.degree}
                                    </Text>
                                    <Text style={styles.educationInstitution}>{edu.institution}</Text>
                                    <Text style={styles.educationDate}>
                                        {edu.start_date && formatDate(edu.start_date)} {edu.start_date && edu.graduation_date && '- '} {formatDate(edu.graduation_date)}
                                    </Text>
                                    {edu.gpa && (
                                        <Text style={styles.educationGpa}>
                                            Average: {edu.gpa}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Right Content */}
                <View style={styles.rightContent}>
                    {/* Header */}
                    <View style={{ marginBottom: 8 }}>
                        <Text style={styles.headerName}>
                            {data.personal_info?.full_name || "Your Name"}
                        </Text>
                        <Text style={styles.headerProfession}>
                            {data.personal_info?.profession || "Software Engineering"}
                        </Text>
                    </View>

                    {/* Professional Summary */}
                    {data.professional_summary && (
                        <View style={{ marginBottom: 10 }}>
                            <FormattedText html={data.professional_summary} style={styles.summary} />
                        </View>
                    )}

                    {/* Work Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.sectionTitle}>Work Experience</Text>
                            {data.experience.map((exp, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <Text style={styles.jobTitle}>{exp.position}</Text>
                                    <View style={styles.experienceHeader}>
                                        <Text style={styles.companyName}>{exp.company}</Text>
                                        <Text style={styles.dateRange}>
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </Text>
                                    </View>
                                    {exp.description && (
                                        <FormattedText html={exp.description} style={styles.description} />
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <View style={{ marginBottom: 12 }}>
                            <Text style={styles.sectionTitle}>Projects</Text>
                            {data.projects.map((project, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <Text style={styles.projectName}>{project.name}</Text>
                                    {project.type && (
                                        <Text style={styles.projectType}>{project.type}</Text>
                                    )}
                                    {project.description && (
                                        <Text style={styles.description}>
                                            {project.description}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Military Service */}
                    {data.military_service && data.military_service.length > 0 && (
                        <View>
                            <Text style={styles.sectionTitle}>Military Service</Text>
                            {data.military_service.map((service, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <Text style={styles.jobTitle}>{service.rank}</Text>
                                    <View style={styles.experienceHeader}>
                                        <Text style={styles.companyName}>{service.unit}</Text>
                                        <Text style={styles.dateRange}>
                                            {formatDate(service.start_date)} - {service.is_current ? "Present" : formatDate(service.end_date)}
                                        </Text>
                                    </View>
                                    {service.description && (
                                        <FormattedText html={service.description} style={styles.description} />
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};

export default ProfessionalTemplatePDF;

