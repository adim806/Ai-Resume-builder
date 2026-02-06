import ProfessionalTemplatePDF from './ProfessionalTemplatePDF';
import ClassicTemplatePDF from './ClassicTemplatePDF';

// For templates that don't have PDF version yet, we'll use Classic as fallback
const getPDFTemplate = (templateName) => {
    switch (templateName) {
        case 'professional':
            return ProfessionalTemplatePDF;
        case 'classic':
            return ClassicTemplatePDF;
        case 'modern':
            return ClassicTemplatePDF; // Fallback to Classic for now
        case 'minimal':
            return ClassicTemplatePDF; // Fallback to Classic for now
        case 'minimal-image':
            return ClassicTemplatePDF; // Fallback to Classic for now
        case 'creative':
            return ClassicTemplatePDF; // Fallback to Classic for now
        default:
            return ClassicTemplatePDF;
    }
};

export { getPDFTemplate, ProfessionalTemplatePDF, ClassicTemplatePDF };


