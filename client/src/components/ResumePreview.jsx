import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'

const ResumePreview = ({data, template, accentColor, classes=''}) => {

    const renderTemplate = () => {
        switch(template){

            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            case "professional":
                return <ProfessionalTemplate data={data} accentColor={accentColor} />;
            case "creative":
                return <CreativeTemplate data={data} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    }
  return (
    <div className='w-full bg-gray-100'>
        <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none print:h-[297mm] print:max-h-[297mm] print:overflow-hidden " + classes}>
          {renderTemplate()}
        </div>
        <style >
            {`
                @page {
                size: A4;
                margin: 0;
                }
                @media print {
                html, body {
                width: 210mm;
                height: 297mm;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                color-adjust: exact;
                }
                body *{
                visibility: hidden;
                }
                #resume-preview, #resume-preview *{
                visibility: visible;
                }
                .resume-section{
                  break-inside: avoid;
                  page-break-inside: avoid;
                }
                #resume-preview{
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                max-height: 297mm !important;
                min-height: 297mm !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                border: none !important;
                overflow: hidden !important;
                page-break-after: avoid !important;
                page-break-before: avoid !important;
                }
                
                /* Hide lucide icons in print and replace with Unicode symbols */
                #resume-preview svg {
                  display: none !important;
                }
                
                /* Prevent page breaks inside sections */
                #resume-preview h2,
                #resume-preview h3,
                #resume-preview h4 {
                  page-break-after: avoid !important;
                  break-after: avoid !important;
                }
                
                #resume-preview p,
                #resume-preview div {
                  orphans: 3;
                  widows: 3;
                }
                
                /* Ensure all content fits */
                #resume-preview * {
                  box-sizing: border-box;
                }
                
                /* Force single page */
                @page {
                  size: A4;
                  margin: 0;
                }
                
                /* Prevent any content after resume-preview */
                #resume-preview ~ * {
                  display: none !important;
                }
                }
            `}
        </style>
        
    </div>
  )
}

export default ResumePreview