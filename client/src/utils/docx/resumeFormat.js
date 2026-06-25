export const formatResumeDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

export const normalizeLink = (url) => (url.startsWith('http') ? url : `https://${url}`);

export const hexColor = (hex) => hex.replace('#', '').toUpperCase();

export const parseDataUrl = (dataUrl) => {
    if (!dataUrl || typeof dataUrl !== 'string') return null;
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) return null;

    const mime = match[1];
    const binary = atob(match[2]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

    let type = 'png';
    if (mime.includes('jpeg') || mime.includes('jpg')) type = 'jpg';
    else if (mime.includes('gif')) type = 'gif';

    return { data: bytes, type };
};

export const triggerFileDownload = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};

export const getResumeFileName = (data, extension) => {
    const base = data.personal_info?.full_name || data.title || 'resume';
    return `${base}.${extension}`;
};
