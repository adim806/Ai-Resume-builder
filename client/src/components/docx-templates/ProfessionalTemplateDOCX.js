import {
    Document,
    Packer,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    ShadingType,
    AlignmentType,
    ExternalHyperlink,
    ImageRun,
    HeightRule,
    VerticalAlignTable,
    TableLayoutType,
    convertMillimetersToTwip,
    PageOrientation,
} from 'docx';
import { htmlToDocxParagraphs } from '../../utils/docx/htmlToDocx';
import { formatResumeDate, normalizeLink, hexColor, parseDataUrl } from '../../utils/docx/resumeFormat';
import {
    createLtrParagraph,
    createRun,
    createCompanyDateParagraph,
    DOCX_NUMBERING,
    DOCX_DEFAULT_STYLES,
    DOCX_TYPE,
    LTR_SECTION,
} from '../../utils/docx/docxParagraph';

const NO_BORDERS = {
    top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
};

const PAGE_WIDTH = convertMillimetersToTwip(210);
const PAGE_HEIGHT = convertMillimetersToTwip(297);
const SIDEBAR_COL_WIDTH = Math.round(PAGE_WIDTH * 0.32);
const MAIN_COL_WIDTH = PAGE_WIDTH - SIDEBAR_COL_WIDTH;
const CELL_PAD_TOP = 440;
const CELL_PAD_SIDEBAR_X = 400;
const CELL_PAD_MAIN_X = 480;

const sidebarTitle = (text, accent) =>
    createLtrParagraph({
        spacing: { before: 140, after: 80 },
        border: {
            bottom: { color: hexColor(accent), size: 6, style: BorderStyle.SINGLE, space: 3 },
        },
        children: [createRun({ text, bold: true, size: DOCX_TYPE.sidebarTitle, color: 'FFFFFF' })],
    });

const sidebarText = (text, options = {}) =>
    createLtrParagraph({
        spacing: { after: options.after ?? 60 },
        children: [createRun({ text, size: DOCX_TYPE.body, color: options.color ?? 'FFFFFF' })],
    });

const sidebarLink = (url, label) =>
    createLtrParagraph({
        spacing: { after: 60 },
        children: [
            new ExternalHyperlink({
                link: normalizeLink(url),
                children: [
                    createRun({
                        text: label.replace(/^https?:\/\//, ''),
                        size: DOCX_TYPE.link,
                        color: 'D1D5DB',
                        underline: {},
                    }),
                ],
            }),
        ],
    });

const mainSectionTitle = (text, accent) =>
    createLtrParagraph({
        spacing: { before: 160, after: 90 },
        border: {
            bottom: { color: hexColor(accent), size: 6, style: BorderStyle.SINGLE, space: 3 },
        },
        children: [createRun({ text, bold: true, size: DOCX_TYPE.sectionTitle, color: '1E293B' })],
    });

const buildSidebarContent = (data, accentColor) => {
    const blocks = [];
    const accent = hexColor(accentColor);
    const techStack = data.tech_stack || {};
    const techStackCategories = [
        { key: 'languages_frontend', label: 'Languages & Frontend' },
        { key: 'backend_dbs', label: 'Backend & DBs' },
        { key: 'tools_testing', label: 'Tools & Testing' },
        { key: 'methodologies', label: 'Methodologies' },
    ];
    const hasTechStack = techStackCategories.some(({ key }) => techStack[key]?.length > 0);

    const imageData = parseDataUrl(data.personal_info?.image);
    if (imageData) {
        blocks.push(
            createLtrParagraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [
                    new ImageRun({
                        data: imageData.data,
                        type: imageData.type,
                        transformation: { width: 72, height: 72 },
                    }),
                ],
            })
        );
    }

    blocks.push(sidebarTitle('Personal Info', accentColor));
    if (data.personal_info?.phone) blocks.push(sidebarText(data.personal_info.phone));
    if (data.personal_info?.email) blocks.push(sidebarText(data.personal_info.email));
    if (data.personal_info?.location) blocks.push(sidebarText(data.personal_info.location));

    if (data.personal_info?.linkedin || data.personal_info?.github || data.personal_info?.website) {
        blocks.push(sidebarTitle('Links', accentColor));
        if (data.personal_info?.linkedin) {
            blocks.push(sidebarLink(data.personal_info.linkedin, data.personal_info.linkedin));
        }
        if (data.personal_info?.github) {
            blocks.push(sidebarLink(data.personal_info.github, data.personal_info.github));
        }
        if (data.personal_info?.website) {
            blocks.push(sidebarLink(data.personal_info.website, data.personal_info.website));
        }
    }

    if (hasTechStack) {
        blocks.push(sidebarTitle('Tech Stack', accentColor));
        techStackCategories.forEach(({ key, label }) => {
            if (techStack[key]?.length > 0) {
                blocks.push(
                    createLtrParagraph({
                        spacing: { after: 30 },
                        children: [
                            createRun({ text: label, bold: true, size: DOCX_TYPE.sidebarCategory, color: accent }),
                        ],
                    })
                );
                blocks.push(
                    sidebarText(techStack[key].join(', '), { color: 'E5E7EB', after: 70 })
                );
            }
        });
    }

    if (data.skills?.length > 0) {
        blocks.push(sidebarTitle('Skills', accentColor));
        data.skills.forEach((skill) => {
            blocks.push(
                createLtrParagraph({
                    numbering: { reference: 'resume-bullets', level: 0 },
                    spacing: { after: 40 },
                    children: [createRun({ text: skill, size: DOCX_TYPE.body, color: 'FFFFFF' })],
                })
            );
        });
    }

    if (data.education?.length > 0) {
        blocks.push(sidebarTitle('Education', accentColor));
        data.education.forEach((edu) => {
            blocks.push(
                createLtrParagraph({
                    spacing: { after: 30 },
                    children: [
                        createRun({ text: edu.degree, bold: true, size: DOCX_TYPE.body, color: 'FFFFFF' }),
                    ],
                })
            );
            if (edu.institution) {
                blocks.push(sidebarText(edu.institution, { color: 'D1D5DB', after: 30 }));
            }
            const dates = [
                edu.start_date && formatResumeDate(edu.start_date),
                edu.graduation_date && formatResumeDate(edu.graduation_date),
            ].filter(Boolean);
            if (dates.length) {
                blocks.push(sidebarText(dates.join(' - '), { color: '9CA3AF', after: 30 }));
            }
            if (edu.gpa) {
                blocks.push(
                    createLtrParagraph({
                        spacing: { after: 70 },
                        children: [
                            createRun({ text: `Average: ${edu.gpa}`, size: DOCX_TYPE.sidebarMeta, color: accent }),
                        ],
                    })
                );
            }
        });
    }

    return blocks;
};

const buildMainContent = (data, accentColor) => {
    const blocks = [];
    const accent = hexColor(accentColor);

    blocks.push(
        createLtrParagraph({
            spacing: { after: 40 },
            children: [
                createRun({
                    text: data.personal_info?.full_name || 'Your Name',
                    bold: true,
                    size: DOCX_TYPE.name,
                    color: '1E293B',
                }),
            ],
        })
    );
    blocks.push(
        createLtrParagraph({
            spacing: { after: 120 },
            children: [
                createRun({
                    text: data.personal_info?.profession || 'Software Engineering',
                    size: DOCX_TYPE.role,
                    color: accent,
                }),
            ],
        })
    );

    if (data.professional_summary) {
        blocks.push(...htmlToDocxParagraphs(data.professional_summary, { spacingAfter: 120 }));
    }

    if (data.experience?.length > 0) {
        blocks.push(mainSectionTitle('Work Experience', accentColor));
        data.experience.forEach((exp) => {
            blocks.push(
                createLtrParagraph({
                    spacing: { after: 30 },
                    children: [
                        createRun({ text: exp.position, bold: true, size: DOCX_TYPE.itemTitle, color: '1E293B' }),
                    ],
                })
            );
            blocks.push(
                createCompanyDateParagraph(
                    exp.company,
                    `${formatResumeDate(exp.start_date)} - ${exp.is_current ? 'Present' : formatResumeDate(exp.end_date)}`,
                    accent
                )
            );
            if (exp.description) {
                blocks.push(...htmlToDocxParagraphs(exp.description, { indentLeft: 360, spacingAfter: 90 }));
            }
        });
    }

    if (data.projects?.length > 0) {
        blocks.push(mainSectionTitle('Projects & Training', accentColor));
        data.projects.forEach((project) => {
            blocks.push(
                createLtrParagraph({
                    spacing: { after: 30 },
                    children: [
                        createRun({ text: project.name, bold: true, size: DOCX_TYPE.itemTitle, color: accent }),
                    ],
                })
            );
            if (project.type) {
                blocks.push(
                    createLtrParagraph({
                        spacing: { after: 45 },
                        children: [createRun({ text: project.type, size: DOCX_TYPE.meta, color: '6B7280' })],
                    })
                );
            }
            if (project.description) {
                blocks.push(...htmlToDocxParagraphs(project.description, { indentLeft: 360, spacingAfter: 90 }));
            }
        });
    }

    if (data.military_service?.length > 0) {
        blocks.push(mainSectionTitle('Military Service', accentColor));
        data.military_service.forEach((service) => {
            blocks.push(
                createLtrParagraph({
                    spacing: { after: 30 },
                    children: [
                        createRun({ text: service.rank, bold: true, size: DOCX_TYPE.itemTitle, color: '1E293B' }),
                    ],
                })
            );
            blocks.push(
                createCompanyDateParagraph(
                    service.unit,
                    `${formatResumeDate(service.start_date)} - ${service.is_current ? 'Present' : formatResumeDate(service.end_date)}`,
                    accent
                )
            );
            if (service.description) {
                blocks.push(...htmlToDocxParagraphs(service.description, { indentLeft: 360, spacingAfter: 90 }));
            }
        });
    }

    return blocks;
};

export const buildProfessionalDocx = (data, accentColor) => {
    const sidebarContent = buildSidebarContent(data, accentColor);
    const mainContent = buildMainContent(data, accentColor);

    return new Document({
        numbering: DOCX_NUMBERING,
        styles: DOCX_DEFAULT_STYLES,
        sections: [
            {
                properties: {
                    ...LTR_SECTION,
                    page: {
                        size: {
                            orientation: PageOrientation.PORTRAIT,
                            width: PAGE_WIDTH,
                            height: PAGE_HEIGHT,
                        },
                        margin: { top: 0, right: 0, bottom: 0, left: 0 },
                    },
                },
                children: [
                    new Table({
                        width: { size: PAGE_WIDTH, type: WidthType.DXA },
                        columnWidths: [SIDEBAR_COL_WIDTH, MAIN_COL_WIDTH],
                        layout: TableLayoutType.FIXED,
                        indent: { size: 0, type: WidthType.DXA },
                        rows: [
                            new TableRow({
                                height: { value: PAGE_HEIGHT, rule: HeightRule.ATLEAST },
                                children: [
                                    new TableCell({
                                        width: { size: SIDEBAR_COL_WIDTH, type: WidthType.DXA },
                                        verticalAlign: VerticalAlignTable.TOP,
                                        borders: NO_BORDERS,
                                        shading: {
                                            fill: '0F172A',
                                            type: ShadingType.CLEAR,
                                            color: 'auto',
                                        },
                                        margins: {
                                            top: CELL_PAD_TOP,
                                            bottom: 0,
                                            left: CELL_PAD_SIDEBAR_X,
                                            right: CELL_PAD_SIDEBAR_X,
                                        },
                                        children: sidebarContent,
                                    }),
                                    new TableCell({
                                        width: { size: MAIN_COL_WIDTH, type: WidthType.DXA },
                                        verticalAlign: VerticalAlignTable.TOP,
                                        borders: NO_BORDERS,
                                        margins: {
                                            top: CELL_PAD_TOP,
                                            bottom: 0,
                                            left: CELL_PAD_MAIN_X,
                                            right: CELL_PAD_MAIN_X,
                                        },
                                        children: mainContent,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            },
        ],
    });
};

export const generateProfessionalDocxBlob = async (data, accentColor) => {
    const doc = buildProfessionalDocx(data, accentColor);
    return Packer.toBlob(doc);
};
