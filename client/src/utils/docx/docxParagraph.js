import {
    Paragraph,
    TextRun,
    AlignmentType,
    LevelFormat,
    TabStopType,
    TabStopPosition,
    PageTextDirectionType,
} from 'docx';

export { PageTextDirectionType };

export const DOCX_FONT = 'Calibri';

export const DOCX_TYPE = {
    font: DOCX_FONT,
    body: 20,
    bodySmall: 18,
    sidebarTitle: 24,
    sidebarCategory: 18,
    sidebarMeta: 18,
    link: 18,
    name: 52,
    role: 28,
    sectionTitle: 26,
    itemTitle: 22,
    meta: 18,
};

export const ENGLISH_RUN = {
    language: { value: 'en-US' },
    font: DOCX_FONT,
};

export const LTR_SECTION = {
    textDirection: PageTextDirectionType.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
};

export const DOCX_NUMBERING = {
    config: [
        {
            reference: 'resume-bullets',
            levels: [
                {
                    level: 0,
                    format: LevelFormat.BULLET,
                    text: '\u2022',
                    alignment: AlignmentType.LEFT,
                    style: {
                        run: { font: DOCX_FONT, size: DOCX_TYPE.body },
                        paragraph: {
                            alignment: AlignmentType.LEFT,
                            bidirectional: false,
                            spacing: { after: 40, line: 264 },
                            indent: { left: 360, hanging: 360 },
                        },
                    },
                },
            ],
        },
        {
            reference: 'resume-numbers',
            levels: [
                {
                    level: 0,
                    format: LevelFormat.DECIMAL,
                    text: '%1.',
                    alignment: AlignmentType.LEFT,
                    style: {
                        run: { font: DOCX_FONT, size: DOCX_TYPE.body },
                        paragraph: {
                            alignment: AlignmentType.LEFT,
                            bidirectional: false,
                            spacing: { after: 40, line: 264 },
                            indent: { left: 360, hanging: 360 },
                        },
                    },
                },
            ],
        },
    ],
};

export const DOCX_DEFAULT_STYLES = {
    default: {
        document: {
            run: {
                ...ENGLISH_RUN,
                size: DOCX_TYPE.body,
            },
            paragraph: {
                alignment: AlignmentType.LEFT,
                bidirectional: false,
                spacing: { after: 80, line: 264 },
            },
        },
    },
};

export const createRun = (options) =>
    new TextRun({
        font: DOCX_FONT,
        ...ENGLISH_RUN,
        ...options,
    });

export const createLtrParagraph = (options = {}) => {
    const { spacing, ...rest } = options;
    return new Paragraph({
        alignment: AlignmentType.LEFT,
        bidirectional: false,
        spacing: { line: 264, ...spacing },
        ...rest,
    });
};

export const createCompanyDateParagraph = (company, dateText, accentColor) =>
    createLtrParagraph({
        spacing: { after: 60, line: 264 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
            createRun({ text: company, bold: true, size: DOCX_TYPE.body, color: accentColor }),
            createRun({
                text: `\t${dateText}`,
                size: DOCX_TYPE.meta,
                color: '6B7280',
                italics: true,
            }),
        ],
    });
