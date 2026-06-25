import { Document, Packer, AlignmentType } from 'docx';
import { htmlToDocxParagraphs } from '../../utils/docx/htmlToDocx';
import { formatResumeDate, hexColor } from '../../utils/docx/resumeFormat';
import {
    createLtrParagraph,
    createRun,
    createCompanyDateParagraph,
    DOCX_NUMBERING,
    DOCX_DEFAULT_STYLES,
    DOCX_TYPE,
    LTR_SECTION,
} from '../../utils/docx/docxParagraph';

const sectionHeading = (text, accent) =>
    createLtrParagraph({
        spacing: { before: 240, after: 120 },
        children: [createRun({ text, bold: true, size: DOCX_TYPE.sectionTitle, color: hexColor(accent) })],
    });

export const buildClassicDocx = (data, accentColor) => {
    const blocks = [];
    const accent = hexColor(accentColor);

    blocks.push(
        createLtrParagraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
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

    const contact = [
        data.personal_info?.email,
        data.personal_info?.phone,
        data.personal_info?.location,
    ].filter(Boolean);
    if (contact.length) {
        blocks.push(
            createLtrParagraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 160 },
                children: [createRun({ text: contact.join('  |  '), size: 18, color: '6B7280' })],
            })
        );
    }

    if (data.professional_summary) {
        blocks.push(sectionHeading('Professional Summary', accentColor));
        blocks.push(...htmlToDocxParagraphs(data.professional_summary));
    }

    if (data.experience?.length > 0) {
        blocks.push(sectionHeading('Work Experience', accentColor));
        data.experience.forEach((exp) => {
            blocks.push(
                createLtrParagraph({
                    spacing: { after: 60 },
                    children: [createRun({ text: exp.position, bold: true, size: 22, color: '1E293B' })],
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
                blocks.push(...htmlToDocxParagraphs(exp.description, { indentLeft: 360 }));
            }
        });
    }

    if (data.projects?.length > 0) {
        blocks.push(sectionHeading('Projects & Training', accentColor));
        data.projects.forEach((project) => {
            blocks.push(
                createLtrParagraph({
                    spacing: { after: 60 },
                    children: [createRun({ text: project.name, bold: true, size: 22, color: accent })],
                })
            );
            if (project.type) {
                blocks.push(
                    createLtrParagraph({
                        spacing: { after: 60 },
                        children: [createRun({ text: project.type, size: 18, color: '6B7280' })],
                    })
                );
            }
            if (project.description) {
                blocks.push(...htmlToDocxParagraphs(project.description, { indentLeft: 360 }));
            }
        });
    }

    if (data.education?.length > 0) {
        blocks.push(sectionHeading('Education', accentColor));
        data.education.forEach((edu) => {
            blocks.push(
                createLtrParagraph({
                    spacing: { after: 80 },
                    children: [
                        createRun({ text: edu.degree, bold: true, size: 22, color: '1E293B' }),
                        createRun({
                            text: edu.graduation_date ? `  |  ${formatResumeDate(edu.graduation_date)}` : '',
                            size: 18,
                            color: '6B7280',
                        }),
                    ],
                })
            );
            if (edu.institution) {
                blocks.push(
                    createLtrParagraph({
                        spacing: { after: 80 },
                        children: [createRun({ text: edu.institution, size: 20, color: '374151' })],
                    })
                );
            }
        });
    }

    if (data.skills?.length > 0) {
        blocks.push(sectionHeading('Skills', accentColor));
        blocks.push(
            createLtrParagraph({
                children: [createRun({ text: data.skills.join(', '), size: 20, color: '374151' })],
            })
        );
    }

    return new Document({
        numbering: DOCX_NUMBERING,
        styles: DOCX_DEFAULT_STYLES,
        sections: [
            {
                properties: {
                    ...LTR_SECTION,
                    page: {
                        margin: { top: 720, right: 720, bottom: 720, left: 720 },
                    },
                },
                children: blocks,
            },
        ],
    });
};

export const generateClassicDocxBlob = async (data, accentColor) => {
    const doc = buildClassicDocx(data, accentColor);
    return Packer.toBlob(doc);
};
