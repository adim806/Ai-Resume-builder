import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path, Link } from '@react-pdf/renderer';

const SIDEBAR_WIDTH = 192;

const htmlTextLength = (html) => (html ? html.replace(/<[^>]+>/g, '').length : 0);

const htmlRenderWeight = (html) => {
    if (!html) return 0;
    const listItems = (html.match(/<li[\s>]/gi) || []).length;
    const paragraphs = (html.match(/<p[\s>]/gi) || []).length;
    return listItems * 0.65 + Math.max(0, paragraphs - 1) * 0.35;
};

const computeLayoutTier = (data) => {
    let score = 0;

    score += htmlTextLength(data.professional_summary) / 70;
    score += htmlRenderWeight(data.professional_summary);

    score += (data.experience?.length || 0) * 2.2;
    data.experience?.forEach((exp) => {
        score += htmlTextLength(exp.description) / 100;
        score += htmlRenderWeight(exp.description);
    });

    score += (data.projects?.length || 0) * 1.8;
    data.projects?.forEach((project) => {
        score += htmlTextLength(project.description) / 90;
        score += htmlRenderWeight(project.description);
    });

    score += (data.military_service?.length || 0) * 2.2;
    data.military_service?.forEach((service) => {
        score += htmlTextLength(service.description) / 100;
        score += htmlRenderWeight(service.description);
    });

    score += (data.skills?.length || 0) * 0.35;
    score += (data.education?.length || 0) * 0.6;

    const techStack = data.tech_stack || {};
    score += Object.values(techStack).flat().length * 0.06;

    if (score <= 17) return 'normal';
    if (score <= 23) return 'compact';
    if (score <= 30) return 'compactMid';
    return 'tight';
};

const LAYOUT_PRESETS = {
    normal: {
        bodySize: 10,
        lineHeight: 1.62,
        padY: 24,
        padBottomMain: 0,
        padXMain: 24,
        padXSidebar: 20,
        sectionGap: 14,
        itemGap: 10,
        headerName: 26,
        headerRole: 14,
        sectionTitle: 13,
        sidebarTitle: 12,
        profileSize: 72,
        iconGap: 8,
        titlePadBottom: 4,
    },
    compact: {
        bodySize: 10,
        lineHeight: 1.58,
        padY: 22,
        padBottomMain: 0,
        padXMain: 24,
        padXSidebar: 20,
        sectionGap: 13,
        itemGap: 9,
        headerName: 25,
        headerRole: 14,
        sectionTitle: 13,
        sidebarTitle: 12,
        profileSize: 72,
        iconGap: 7,
        titlePadBottom: 4,
    },
    compactMid: {
        bodySize: 10,
        lineHeight: 1.52,
        padY: 20,
        padBottomMain: 0,
        padXMain: 22,
        padXSidebar: 20,
        sectionGap: 11,
        itemGap: 8,
        headerName: 24,
        headerRole: 13,
        sectionTitle: 12.5,
        sidebarTitle: 12,
        profileSize: 72,
        iconGap: 6,
        titlePadBottom: 3,
    },
    tight: {
        bodySize: 9.75,
        lineHeight: 1.48,
        padY: 19,
        padBottomMain: 0,
        padXMain: 22,
        padXSidebar: 18,
        sectionGap: 10,
        itemGap: 7,
        headerName: 23,
        headerRole: 12.5,
        sectionTitle: 12,
        sidebarTitle: 11,
        profileSize: 68,
        iconGap: 6,
        titlePadBottom: 3,
    },
};

const createStyles = (accentColor, tier) => {
    const p = LAYOUT_PRESETS[tier];

    return StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: p.bodySize,
            color: '#1e293b',
        },
        sidebar: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: SIDEBAR_WIDTH,
            backgroundColor: '#0f172a',
            color: '#ffffff',
            paddingTop: p.padY,
            paddingBottom: p.padY,
            paddingHorizontal: p.padXSidebar,
        },
        mainContent: {
            marginLeft: SIDEBAR_WIDTH,
            paddingTop: p.padY,
            paddingBottom: p.padBottomMain,
            paddingHorizontal: p.padXMain,
        },
        profileImage: {
            width: p.profileSize,
            height: p.profileSize,
            borderRadius: p.profileSize / 2,
            marginBottom: 16,
            alignSelf: 'center',
            border: '2px solid #ffffff',
        },
        sidebarSectionTitle: {
            fontSize: p.sidebarTitle,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 8,
            paddingBottom: p.titlePadBottom,
            borderBottom: `2px solid ${accentColor}`,
            marginLeft: -p.padXSidebar,
            marginRight: -p.padXSidebar,
            paddingLeft: p.padXSidebar,
            paddingRight: p.padXSidebar,
        },
        sidebarSection: {
            marginBottom: p.sectionGap,
        },
        iconRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: p.iconGap,
        },
        iconCircle: {
            width: 15,
            height: 15,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
            marginTop: 1,
        },
        sidebarText: {
            fontSize: p.bodySize,
            color: '#ffffff',
            lineHeight: p.lineHeight,
            flex: 1,
        },
        linkText: {
            fontSize: p.bodySize - 0.5,
            color: '#9ca3af',
            lineHeight: p.lineHeight,
            flex: 1,
        },
        skillRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
        },
        skillBullet: {
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: accentColor,
            marginRight: 8,
        },
        skillText: {
            fontSize: p.bodySize,
            color: '#ffffff',
        },
        techStackCategory: {
            fontSize: p.bodySize - 1,
            fontWeight: 'bold',
            color: accentColor,
            marginBottom: 3,
        },
        techStackItems: {
            fontSize: p.bodySize,
            color: '#ffffff',
            lineHeight: p.lineHeight,
            marginBottom: 8,
        },
        educationDegree: {
            fontSize: p.bodySize,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 2,
        },
        educationInstitution: {
            fontSize: p.bodySize - 1,
            color: '#d1d5db',
            marginBottom: 2,
        },
        educationDate: {
            fontSize: p.bodySize - 1,
            color: '#9ca3af',
            fontStyle: 'italic',
        },
        educationGpa: {
            fontSize: p.bodySize - 1,
            color: accentColor,
            marginTop: 2,
        },
        headerName: {
            fontSize: p.headerName,
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: 4,
        },
        headerProfession: {
            fontSize: p.headerRole,
            color: accentColor,
            marginBottom: p.sectionGap - 1,
        },
        mainSectionTitle: {
            fontSize: p.sectionTitle,
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: 8,
            paddingBottom: p.titlePadBottom,
            borderBottom: `2px solid ${accentColor}`,
        },
        mainSection: {
            marginBottom: p.sectionGap,
        },
        summary: {
            fontSize: p.bodySize,
            lineHeight: p.lineHeight,
            color: '#374151',
            marginBottom: p.sectionGap,
            textAlign: 'left',
        },
        jobTitle: {
            fontSize: p.bodySize + 1,
            fontWeight: 'bold',
            color: '#1e293b',
        },
        companyName: {
            fontSize: p.bodySize,
            fontWeight: 'bold',
            color: accentColor,
            flex: 1,
            paddingRight: 8,
        },
        dateRange: {
            fontSize: p.bodySize - 1,
            color: '#6b7280',
            fontStyle: 'italic',
            flexShrink: 0,
        },
        experienceHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 3,
            marginBottom: 3,
        },
        description: {
            fontSize: p.bodySize,
            lineHeight: p.lineHeight,
            color: '#374151',
            marginLeft: 10,
            textAlign: 'left',
        },
        experienceItem: {
            marginBottom: p.itemGap,
        },
        projectName: {
            fontSize: p.bodySize + 1,
            fontWeight: 'bold',
            color: accentColor,
        },
        projectType: {
            fontSize: p.bodySize - 1,
            color: '#6b7280',
            marginTop: 2,
            marginBottom: 3,
        },
        projectDescription: {
            fontSize: p.bodySize,
            lineHeight: p.lineHeight,
            color: '#374151',
            textAlign: 'left',
        },
    });
};

const ProfessionalTemplatePDF = ({ data, accentColor }) => {
    const layoutTier = computeLayoutTier(data);
    const styles = createStyles(accentColor, layoutTier);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const parseHtmlContent = (html) => {
        if (!html) return [];

        let content = html.trim();
        content = content.replace(/<p>\s*(<br\s*\/?>)?\s*<\/p>/gi, '');
        content = content.replace(/<ul[^>]*>/gi, '');
        content = content.replace(/<\/ul>/gi, '');
        content = content.replace(/<ol[^>]*>/gi, '');
        content = content.replace(/<\/ol>/gi, '');
        content = content.replace(/<li[^>]*>/gi, '|||LI|||');
        content = content.replace(/<\/li>/gi, '');
        content = content.replace(/<br\s*\/?>/gi, '\n');
        content = content.replace(/<\/p>/gi, '\n');
        content = content.replace(/<p[^>]*>/gi, '');
        content = content.replace(/\|\|\|LI\|\|\|/g, '\n• ');
        content = content.replace(/\n{3,}/g, '\n\n');
        content = content.replace(/^\n+/, '');
        content = content.replace(/\n+$/, '');
        content = content.replace(/^\n• /, '• ');

        const tagRegex = /(<strong[^>]*>|<\/strong>|<b[^>]*>|<\/b>|<em[^>]*>|<\/em>|<i[^>]*>|<\/i>)/gi;
        const parts = content.split(tagRegex);
        const segments = [];
        let formatStack = { bold: false, italic: false };

        parts.forEach((part) => {
            const lowerPart = part.toLowerCase();
            if (lowerPart.startsWith('<strong') || lowerPart.startsWith('<b')) {
                formatStack.bold = true;
            } else if (lowerPart === '</strong>' || lowerPart === '</b>') {
                formatStack.bold = false;
            } else if (lowerPart.startsWith('<em') || lowerPart.startsWith('<i')) {
                formatStack.italic = true;
            } else if (lowerPart === '</em>' || lowerPart === '</i>') {
                formatStack.italic = false;
            } else if (part && !part.startsWith('<')) {
                const cleanText = part
                    .replace(/<[^>]+>/g, '')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/[ \t]+/g, ' ');

                if (cleanText.trim()) {
                    segments.push({
                        text: cleanText,
                        bold: formatStack.bold,
                        italic: formatStack.italic,
                    });
                }
            }
        });

        return segments;
    };

    const FormattedText = ({ html, style = {} }) => {
        const segments = parseHtmlContent(html);
        if (segments.length === 0) return null;

        const getFontFamily = (segment) => {
            if (segment.bold && segment.italic) return 'Helvetica-BoldOblique';
            if (segment.bold) return 'Helvetica-Bold';
            if (segment.italic) return 'Helvetica-Oblique';
            return 'Helvetica';
        };

        return (
            <Text style={style}>
                {segments.map((segment, index) => (
                    <Text key={index} style={{ fontFamily: getFontFamily(segment) }}>
                        {segment.text}
                    </Text>
                ))}
            </Text>
        );
    };

    const PhoneIcon = () => (
        <Svg width="10" height="10" viewBox="0 0 24 24">
            <Path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill={accentColor} />
        </Svg>
    );

    const EmailIcon = () => (
        <Svg width="10" height="10" viewBox="0 0 24 24">
            <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill={accentColor} />
        </Svg>
    );

    const LocationIcon = () => (
        <Svg width="10" height="10" viewBox="0 0 24 24">
            <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={accentColor} />
        </Svg>
    );

    const LinkedInIcon = () => (
        <Svg width="10" height="10" viewBox="0 0 24 24">
            <Path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill={accentColor} />
        </Svg>
    );

    const GitHubIcon = () => (
        <Svg width="10" height="10" viewBox="0 0 24 24">
            <Path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" fill={accentColor} />
        </Svg>
    );

    const WebsiteIcon = () => (
        <Svg width="10" height="10" viewBox="0 0 24 24">
            <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill={accentColor} />
        </Svg>
    );

    const IconRow = ({ icon, children, href }) => {
        const row = (
            <View style={styles.iconRow}>
                <View style={styles.iconCircle}>{icon}</View>
                {children}
            </View>
        );
        return href ? <Link src={href}>{row}</Link> : row;
    };

    const normalizeLink = (url) => (url.startsWith('http') ? url : `https://${url}`);

    const techStack = data.tech_stack || {};
    const hasTechStack =
        techStack.languages_frontend?.length > 0 ||
        techStack.backend_dbs?.length > 0 ||
        techStack.tools_testing?.length > 0 ||
        techStack.methodologies?.length > 0;

    const techStackCategories = [
        { key: 'languages_frontend', label: 'Languages & Frontend' },
        { key: 'backend_dbs', label: 'Backend & DBs' },
        { key: 'tools_testing', label: 'Tools & Testing' },
        { key: 'methodologies', label: 'Methodologies' },
    ];

    const lastMainSection =
        data.military_service?.length > 0 ? 'military' :
        data.projects?.length > 0 ? 'projects' :
        data.experience?.length > 0 ? 'experience' :
        null;

    const sectionStyle = (section) =>
        section === lastMainSection
            ? [styles.mainSection, { marginBottom: 0 }]
            : styles.mainSection;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sidebar}>
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' && (
                        <Image src={data.personal_info.image} style={styles.profileImage} />
                    )}

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarSectionTitle}>Personal Info</Text>
                        {data.personal_info?.phone && (
                            <IconRow icon={<PhoneIcon />}>
                                <Text style={styles.sidebarText}>{data.personal_info.phone}</Text>
                            </IconRow>
                        )}
                        {data.personal_info?.email && (
                            <IconRow icon={<EmailIcon />}>
                                <Text style={styles.sidebarText}>{data.personal_info.email}</Text>
                            </IconRow>
                        )}
                        {data.personal_info?.location && (
                            <IconRow icon={<LocationIcon />}>
                                <Text style={styles.sidebarText}>{data.personal_info.location}</Text>
                            </IconRow>
                        )}
                    </View>

                    {(data.personal_info?.linkedin || data.personal_info?.website || data.personal_info?.github) && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarSectionTitle}>Links</Text>
                            {data.personal_info?.linkedin && (
                                <IconRow icon={<LinkedInIcon />} href={normalizeLink(data.personal_info.linkedin)}>
                                    <Text style={styles.linkText}>
                                        {data.personal_info.linkedin.replace(/^https?:\/\//, '')}
                                    </Text>
                                </IconRow>
                            )}
                            {data.personal_info?.github && (
                                <IconRow icon={<GitHubIcon />} href={normalizeLink(data.personal_info.github)}>
                                    <Text style={styles.linkText}>
                                        {data.personal_info.github.replace(/^https?:\/\//, '')}
                                    </Text>
                                </IconRow>
                            )}
                            {data.personal_info?.website && (
                                <IconRow icon={<WebsiteIcon />} href={normalizeLink(data.personal_info.website)}>
                                    <Text style={styles.linkText}>
                                        {data.personal_info.website.replace(/^https?:\/\//, '')}
                                    </Text>
                                </IconRow>
                            )}
                        </View>
                    )}

                    {hasTechStack && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarSectionTitle}>Tech Stack</Text>
                            {techStackCategories.map(({ key, label }) =>
                                techStack[key]?.length > 0 ? (
                                    <View key={key}>
                                        <Text style={styles.techStackCategory}>{label}</Text>
                                        <Text style={styles.techStackItems}>
                                            {techStack[key].join(', ')}
                                        </Text>
                                    </View>
                                ) : null
                            )}
                        </View>
                    )}

                    {data.skills && data.skills.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarSectionTitle}>Skills</Text>
                            {data.skills.map((skill, index) => (
                                <View key={index} style={styles.skillRow}>
                                    <View style={styles.skillBullet} />
                                    <Text style={styles.skillText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.education && data.education.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarSectionTitle}>Education</Text>
                            {data.education.map((edu, index) => (
                                <View key={index} style={{ marginBottom: 8 }}>
                                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                                    <Text style={styles.educationInstitution}>{edu.institution}</Text>
                                    <Text style={styles.educationDate}>
                                        {edu.start_date && formatDate(edu.start_date)}
                                        {edu.start_date && edu.graduation_date && ' - '}
                                        {formatDate(edu.graduation_date)}
                                    </Text>
                                    {edu.gpa && <Text style={styles.educationGpa}>Average: {edu.gpa}</Text>}
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.mainContent}>
                    <Text style={styles.headerName}>{data.personal_info?.full_name || 'Your Name'}</Text>
                    <Text style={styles.headerProfession}>
                        {data.personal_info?.profession || 'Software Engineering'}
                    </Text>

                    {data.professional_summary && (
                        <FormattedText html={data.professional_summary} style={styles.summary} />
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <View style={sectionStyle('experience')}>
                            <Text style={styles.mainSectionTitle}>Work Experience</Text>
                            {data.experience.map((exp, index) => (
                                <View key={index} style={styles.experienceItem} minPresenceAhead={0}>
                                    <Text style={styles.jobTitle}>{exp.position}</Text>
                                    <View style={styles.experienceHeader}>
                                        <Text style={styles.companyName}>{exp.company}</Text>
                                        <Text style={styles.dateRange}>
                                            {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                                        </Text>
                                    </View>
                                    {exp.description && (
                                        <FormattedText html={exp.description} style={styles.description} />
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {data.projects && data.projects.length > 0 && (
                        <View style={sectionStyle('projects')}>
                            <Text style={styles.mainSectionTitle}>Projects & Training</Text>
                            {data.projects.map((project, index) => (
                                <View key={index} style={styles.experienceItem} minPresenceAhead={0}>
                                    <Text style={styles.projectName}>{project.name}</Text>
                                    {project.type && <Text style={styles.projectType}>{project.type}</Text>}
                                    {project.description && (
                                        <FormattedText html={project.description} style={styles.projectDescription} />
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {data.military_service && data.military_service.length > 0 && (
                        <View style={sectionStyle('military')}>
                            <Text style={styles.mainSectionTitle}>Military Service</Text>
                            {data.military_service.map((service, index) => (
                                <View key={index} style={styles.experienceItem} minPresenceAhead={0}>
                                    <Text style={styles.jobTitle}>{service.rank}</Text>
                                    <View style={styles.experienceHeader}>
                                        <Text style={styles.companyName}>{service.unit}</Text>
                                        <Text style={styles.dateRange}>
                                            {formatDate(service.start_date)} - {service.is_current ? 'Present' : formatDate(service.end_date)}
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
