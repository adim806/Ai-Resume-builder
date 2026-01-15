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
    <div className='w-full bg-gray-100  '>
        <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none " + classes}>
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
                margin: 0;
                padding: 0;
                overflow: hidden;
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
                position: absolute;
                left: 0;
                top: 0;
                width: 210mm;
                min-height: 297mm;
                margin: 0;
                padding: 0;
                box-shadow: none !important;
                border: none !important;

               
                }
                }
            `}
        </style>
        
    </div>
  )
}

export default ResumePreview