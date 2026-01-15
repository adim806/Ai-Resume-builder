import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ({selectedColor, onChange}) => {
    // ערכת צבעים מקצועית לקורות חיים
    const colors = [
        // גוונים קלאסיים ורשמיים
        { name: "Slate", value: "#334155" },      // אפור-כחול כהה, סולידי ומודרני
        { name: "Midnight", value: "#1e293b" },   // כחול עמוק מאוד, כמעט שחור
        { name: "Black", value: "#000000" },      // הקלאסי המוחלט

        // גווני כחול ותכלת (הכי פופולרי בהייטק)
        { name: "Royal", value: "#2563EB" },      // כחול הייטק סטנדרטי (חי יותר)
        { name: "Navy", value: "#1E40AF" },       // כחול צי כהה וסמכותי
        { name: "Ocean", value: "#0E7490" },      // ציאן כהה/טורקיז עמוק

        // גוונים "חמים" אך אלגנטיים
        { name: "Burgundy", value: "#BE123C" },   // אדום יין עמוק (במקום אדום בוהק)
        { name: "Rust", value: "#C2410C" },       // כתום-חמרה (הרבה יותר קריא מכתום רגיל)
        { name: "Gold", value: "#B45309" },       // זהב/ברונזה כהה (משדר יוקרה)

        // גוונים יצירתיים ורעננים
        { name: "Emerald", value: "#047857" },    // ירוק אמרלד עמוק
        { name: "Forest", value: "#166534" },     // ירוק יער כהה
        { name: "Violet", value: "#6D28D9" },     // סגול עמוק (יצירתיות ומנהיגות)
    ]

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
        <button onClick={()=> setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette  size={16}/> <span className='max-sm:hidden'>Accent</span>
        </button>
        {isOpen && (
            // שיניתי מעט את הרוחב ל-w-72 כדי שיהיה יותר אוויר לצבעים החדשים
            <div className='grid grid-cols-3 sm:grid-cols-4 w-72 gap-3 absolute top-full left-0 p-4 mt-2 z-20 bg-white rounded-xl border border-gray-200 shadow-xl'>
                {colors.map((color)=>(
                    <div key={color.value} className='relative cursor-pointer group flex flex-col items-center gap-1' onClick={()=>{onChange(color.value); setIsOpen(false)}}>
                        {/* הוספתי border-gray-100 כדי שהצבעים הבהירים לא ייעלמו ברקע הלבן */}
                        <div className="w-10 h-10 rounded-full border border-gray-100 shadow-sm group-hover:scale-110 transition-all duration-200" style={{backgroundColor : color.value}}>
                        </div>
                        {selectedColor === color.value && (
                            <div className='absolute top-0 left-0 right-0 bottom-[1.2rem] flex items-center justify-center'>
                                {/* הוספתי צללית קטנה ל-V שיהיה קריא גם על צבעים בהירים יחסית */}
                                <Check className='w-5 h-5 text-white drop-shadow-md'/>
                            </div>
                        )}
                        <p className='text-[10px] font-medium text-center text-gray-500 group-hover:text-gray-900 transition-colors'>{color.name}</p>

                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default ColorPicker