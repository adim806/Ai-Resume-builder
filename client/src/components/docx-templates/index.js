import { generateProfessionalDocxBlob } from './ProfessionalTemplateDOCX';
import { generateClassicDocxBlob } from './ClassicTemplateDOCX';

export const generateDocxBlob = async (templateName, data, accentColor) => {
    switch (templateName) {
        case 'professional':
            return generateProfessionalDocxBlob(data, accentColor);
        case 'classic':
            return generateClassicDocxBlob(data, accentColor);
        default:
            return generateClassicDocxBlob(data, accentColor);
    }
};

export { generateProfessionalDocxBlob, generateClassicDocxBlob };
