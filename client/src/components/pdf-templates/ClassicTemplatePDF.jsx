import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';

const ClassicTemplatePDF = ({ data, accentColor }) => {
    // Convert hex color to rgba with opacity
    const hexToRgba = (hex, opacity) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

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
                
                if (cleanText.trim()) {
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
        <Svg width="12" height="12" viewBox="0 0 24 24">
            <Path
                d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                fill={accentColor}
            />
        </Svg>
    );

    const EmailIcon = () => (
        <Svg width="12" height="12" viewBox="0 0 24 24">
            <Path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                fill={accentColor}
            />
        </Svg>
    );

    const LocationIcon = () => (
        <Svg width="12" height="12" viewBox="0 0 24 24">
            <Path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill={accentColor}
            />
        </Svg>
    );

    const LinkedInIcon = () => (
        <Svg width="12" height="12" viewBox="0 0 24 24">
            <Path
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                fill={accentColor}
            />
        </Svg>
    );

    const WebsiteIcon = () => (
        <Svg width="12" height="12" viewBox="0 0 24 24">
            <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill={accentColor}
            />
        </Svg>
    );

    // Enhanced formatted text component with word-by-word rendering for proper wrapping
    const FormattedText = ({ html, style = {} }) => {
        const segments = parseHtmlContent(html);
        
        if (segments.length === 0) return null;
        
        // Split segments into individual words to allow proper wrapping
        const words = [];
        segments.forEach((segment) => {
            const text = segment.text;
            
            // Split by whitespace and newlines, but preserve them
            const parts = text.split(/(\s+|\n)/);
            
            parts.forEach((part) => {
                if (part) {
                    words.push({
                        text: part,
                        bold: segment.bold,
                        italic: segment.italic,
                        underline: segment.underline
                    });
                }
            });
        });
        
        return (
            <Text style={style}>
                {words.map((word, index) => {
                    // Determine font family based on formatting
                    let fontFamily = 'Helvetica';
                    if (word.bold && word.italic) {
                        fontFamily = 'Helvetica-BoldOblique';
                    } else if (word.bold) {
                        fontFamily = 'Helvetica-Bold';
                    } else if (word.italic) {
                        fontFamily = 'Helvetica-Oblique';
                    }
                    
                    return (
                        <Text
                            key={index}
                            style={{
                                fontFamily: fontFamily,
                                textDecoration: word.underline ? 'underline' : 'none',
                            }}
                        >
                            {word.text}
                        </Text>
                    );
                })}
            </Text>
        );
    };

    const styles = StyleSheet.create({
        page: {
            padding: 32,
            backgroundColor: '#ffffff',
            fontFamily: 'Helvetica',
        },
        header: {
            textAlign: 'center',
            marginBottom: 32,
            paddingBottom: 24,
            borderBottom: `2px solid ${accentColor}`,
        },
        name: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 8,
            color: accentColor,
        },
        contactInfo: {
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 14,
            fontSize: 9,
            color: '#4b5563',
        },
        contactItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },
        iconContainer: {
            width: 16,
            height: 16,
            marginRight: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 2,
            border: `0.5px solid ${hexToRgba('#e5e7eb', 1)}`,
        },
        sectionTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 12,
            color: accentColor,
        },
        section: {
            marginBottom: 24,
        },
        summary: {
            fontSize: 9,
            lineHeight: 1.6,
            color: '#374151',
            textAlign: 'left',
        },
        experienceItem: {
            marginBottom: 10,
            paddingLeft: 16,
            borderLeft: `3px solid ${accentColor}`,
        },
        experienceHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
        },
        jobTitle: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#111827',
        },
        company: {
            fontSize: 9,
            fontWeight: 'normal',
            color: '#374151',
            marginTop: 2,
        },
        dateRange: {
            fontSize: 8,
            color: '#4b5563',
            textAlign: 'right',
        },
        description: {
            fontSize: 9,
            lineHeight: 1.4,
            color: '#374151',
            textAlign: 'left',
        },
        projectItem: {
            marginBottom: 12,
            paddingLeft: 24,
            borderLeft: '3px solid #d1d5db',
        },
        projectName: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 4,
        },
        projectDescription: {
            fontSize: 9,
            color: '#4b5563',
        },
        educationItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
        },
        degree: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#111827',
        },
        institution: {
            fontSize: 9,
            color: '#374151',
            marginTop: 2,
        },
        gpa: {
            fontSize: 8,
            color: '#4b5563',
            marginTop: 2,
        },
        skillsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
        },
        skill: {
            fontSize: 9,
            color: '#374151',
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>
                        {data.personal_info?.full_name || "Your Name"}
                    </Text>
                    <View style={styles.contactInfo}>
                        {data.personal_info?.email && (
                            <View style={styles.contactItem}>
                                <View style={styles.iconContainer}>
                                    <EmailIcon />
                                </View>
                                <Text>{data.personal_info.email}</Text>
                            </View>
                        )}
                        {data.personal_info?.phone && (
                            <View style={styles.contactItem}>
                                <View style={styles.iconContainer}>
                                    <PhoneIcon />
                                </View>
                                <Text>{data.personal_info.phone}</Text>
                            </View>
                        )}
                        {data.personal_info?.location && (
                            <View style={styles.contactItem}>
                                <View style={styles.iconContainer}>
                                    <LocationIcon />
                                </View>
                                <Text>{data.personal_info.location}</Text>
                            </View>
                        )}
                        {data.personal_info?.linkedin && (
                            <View style={styles.contactItem}>
                                <View style={styles.iconContainer}>
                                    <LinkedInIcon />
                                </View>
                                <Text>{data.personal_info.linkedin.replace(/^https?:\/\//, '')}</Text>
                            </View>
                        )}
                        {data.personal_info?.website && (
                            <View style={styles.contactItem}>
                                <View style={styles.iconContainer}>
                                    <WebsiteIcon />
                                </View>
                                <Text>{data.personal_info.website.replace(/^https?:\/\//, '')}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Professional Summary */}
                {data.professional_summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
                        <FormattedText html={data.professional_summary} style={styles.summary} />
                    </View>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                        {data.experience.map((exp, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <View style={styles.experienceHeader}>
                                    <View>
                                        <Text style={styles.jobTitle}>{exp.position}</Text>
                                        <Text style={styles.company}>{exp.company}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.dateRange}>
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </Text>
                                    </View>
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
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>PROJECTS</Text>
                        {data.projects.map((proj, index) => (
                            <View key={index} style={styles.projectItem}>
                                <Text style={styles.projectName}>{proj.name}</Text>
                                {proj.description && (
                                    <Text style={styles.projectDescription}>{proj.description}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>EDUCATION</Text>
                        {data.education.map((edu, index) => (
                            <View key={index} style={styles.educationItem}>
                                <View>
                                    <Text style={styles.degree}>
                                        {edu.degree}
                                    </Text>
                                    <Text style={styles.institution}>{edu.institution}</Text>
                                    {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
                                </View>
                                <View>
                                    <Text style={styles.dateRange}>{edu.start_date && formatDate(edu.start_date)} {edu.start_date && edu.graduation_date && '- '} {formatDate(edu.graduation_date)}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>CORE SKILLS</Text>
                        <View style={styles.skillsContainer}>
                            {data.skills.map((skill, index) => (
                                <Text key={index} style={styles.skill}>• {skill}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Military Service */}
                {data.military_service && data.military_service.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>MILITARY SERVICE</Text>
                        {data.military_service.map((service, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <View style={styles.experienceHeader}>
                                    <View>
                                        <Text style={styles.jobTitle}>{service.rank}</Text>
                                        <Text style={styles.company}>{service.unit}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.dateRange}>
                                            {formatDate(service.start_date)} - {service.is_current ? "Present" : formatDate(service.end_date)}
                                        </Text>
                                    </View>
                                </View>
                                {service.description && (
                                    <FormattedText html={service.description} style={styles.description} />
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default ClassicTemplatePDF;

