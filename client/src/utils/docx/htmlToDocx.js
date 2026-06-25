import { createLtrParagraph, createRun, DOCX_TYPE } from './docxParagraph';

const stripTags = (html) =>
    html
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/[ \t]+/g, ' ')
        .trim();

const inlineHtmlToTextRuns = (html, { size = DOCX_TYPE.body, color = '374151' } = {}) => {
    if (!html) return [createRun({ text: '', size, color })];

    const tagRegex = /(<strong[^>]*>|<\/strong>|<b[^>]*>|<\/b>|<em[^>]*>|<\/em>|<i[^>]*>|<\/i>|<u[^>]*>|<\/u>)/gi;
    const parts = html.split(tagRegex);
    const runs = [];
    let bold = false;
    let italics = false;
    let underline = false;

    parts.forEach((part) => {
        const lower = part.toLowerCase();
        if (lower.startsWith('<strong') || lower.startsWith('<b')) bold = true;
        else if (lower === '</strong>' || lower === '</b>') bold = false;
        else if (lower.startsWith('<em') || lower.startsWith('<i')) italics = true;
        else if (lower === '</em>' || lower === '</i>') italics = false;
        else if (lower.startsWith('<u')) underline = true;
        else if (lower === '</u>') underline = false;
        else if (part && !part.startsWith('<')) {
            const text = stripTags(part);
            if (text) {
                runs.push(
                    createRun({
                        text,
                        size,
                        color,
                        bold,
                        italics,
                        underline: underline ? {} : undefined,
                    })
                );
            }
        }
    });

    return runs.length ? runs : [createRun({ text: stripTags(html), size, color })];
};

const getListItemContent = (li) => {
    const paragraph = li.querySelector('p');
    return paragraph ? paragraph.innerHTML : li.innerHTML;
};

const splitHtmlIntoBlocks = (html) => {
    if (!html || typeof document === 'undefined') return [];

    const container = document.createElement('div');
    container.innerHTML = html.trim();
    const blocks = [];

    container.childNodes.forEach((node) => {
        if (node.nodeName === 'P') {
            const text = stripTags(node.innerHTML);
            if (text) blocks.push({ type: 'paragraph', content: node.innerHTML });
        } else if (node.nodeName === 'UL') {
            node.querySelectorAll('li').forEach((li) => {
                const text = stripTags(getListItemContent(li));
                if (text) blocks.push({ type: 'list', listStyle: 'bullet', content: getListItemContent(li) });
            });
        } else if (node.nodeName === 'OL') {
            node.querySelectorAll('li').forEach((li) => {
                const text = stripTags(getListItemContent(li));
                if (text) blocks.push({ type: 'list', listStyle: 'number', content: getListItemContent(li) });
            });
        } else if (node.nodeName === 'LI') {
            const text = stripTags(getListItemContent(node));
            if (text) blocks.push({ type: 'list', listStyle: 'bullet', content: getListItemContent(node) });
        } else if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            if (text) blocks.push({ type: 'paragraph', content: text });
        }
    });

    if (blocks.length === 0) {
        const text = stripTags(html);
        if (text) blocks.push({ type: 'paragraph', content: html });
    }

    return blocks;
};

export const htmlToDocxParagraphs = (html, options = {}) => {
    const {
        size = DOCX_TYPE.body,
        color = '374151',
        indentLeft = 0,
        spacingAfter = 70,
        listSpacingAfter = 45,
    } = options;

    return splitHtmlIntoBlocks(html).map((block) => {
        if (block.type === 'list') {
            const listReference = block.listStyle === 'number' ? 'resume-numbers' : 'resume-bullets';
            return createLtrParagraph({
                numbering: { reference: listReference, level: 0 },
                spacing: { after: listSpacingAfter, line: 264 },
                indent: indentLeft ? { left: indentLeft + 360, hanging: 360 } : undefined,
                children: inlineHtmlToTextRuns(block.content, { size, color }),
            });
        }

        return createLtrParagraph({
            spacing: { after: spacingAfter, line: 264 },
            indent: indentLeft ? { left: indentLeft } : undefined,
            children: inlineHtmlToTextRuns(block.content, { size, color }),
        });
    });
};
