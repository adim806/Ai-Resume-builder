import { Code2, Plus, X } from 'lucide-react'
import React, { useState } from 'react'

const TechStackForm = ({data, onChange}) => {
    const [newItems, setNewItems] = useState({
        languages_frontend: "",
        backend_dbs: "",
        tools_testing: "",
        methodologies: ""
    })

    const categories = [
        {
            key: "languages_frontend",
            label: "Languages & Frontend",
            placeholder: "e.g., JavaScript, React, TypeScript",
            color: "blue"
        },
        {
            key: "backend_dbs",
            label: "Backend & DBs",
            placeholder: "e.g., Node.js, MongoDB, PostgreSQL",
            color: "green"
        },
        {
            key: "tools_testing",
            label: "Tools & Testing",
            placeholder: "e.g., Git, Jest, Docker",
            color: "purple"
        },
        {
            key: "methodologies",
            label: "Methodologies",
            placeholder: "e.g., Agile, Scrum, TDD",
            color: "orange"
        }
    ]

    const addItem = (category) => {
        const value = newItems[category].trim()
        if (value && !data[category]?.includes(value)) {
            onChange({
                ...data,
                [category]: [...(data[category] || []), value]
            })
            setNewItems({...newItems, [category]: ""})
        }
    }

    const removeItem = (category, indexToRemove) => {
        onChange({
            ...data,
            [category]: data[category].filter((_, index) => index !== indexToRemove)
        })
    }

    const handleKeyPress = (e, category) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addItem(category)
        }
    }

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                bg: "bg-blue-100",
                text: "text-blue-800",
                hover: "hover:bg-blue-200",
                button: "bg-blue-600 hover:bg-blue-700"
            },
            green: {
                bg: "bg-green-100",
                text: "text-green-800",
                hover: "hover:bg-green-200",
                button: "bg-green-600 hover:bg-green-700"
            },
            purple: {
                bg: "bg-purple-100",
                text: "text-purple-800",
                hover: "hover:bg-purple-200",
                button: "bg-purple-600 hover:bg-purple-700"
            },
            orange: {
                bg: "bg-orange-100",
                text: "text-orange-800",
                hover: "hover:bg-orange-200",
                button: "bg-orange-600 hover:bg-orange-700"
            }
        }
        return colors[color]
    }

    const hasAnyData = categories.some(cat => data[cat.key]?.length > 0)

    return (
        <div className='space-y-6'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                    <Code2 className='size-5' />
                    Tech Stack
                </h3>
                <p className='text-sm text-gray-500'>Organize your technical skills by category</p>
            </div>

            {categories.map((category) => {
                const colors = getColorClasses(category.color)
                return (
                    <div key={category.key} className='space-y-3 p-4 bg-gray-50 rounded-lg'>
                        <label className='block text-sm font-medium text-gray-700'>
                            {category.label}
                        </label>
                        
                        <div className='flex gap-2'>
                            <input 
                                type="text"
                                placeholder={category.placeholder}
                                className='flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none'
                                value={newItems[category.key]}
                                onChange={(e) => setNewItems({...newItems, [category.key]: e.target.value})}
                                onKeyDown={(e) => handleKeyPress(e, category.key)}
                            />
                            <button 
                                onClick={() => addItem(category.key)}
                                disabled={!newItems[category.key].trim()}
                                className={`flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${colors.button}`}
                            >
                                <Plus className='size-4'/> Add
                            </button>
                        </div>

                        {data[category.key]?.length > 0 && (
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {data[category.key].map((item, index) => (
                                    <span 
                                        key={index} 
                                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${colors.bg} ${colors.text}`}
                                    >
                                        {item}
                                        <button 
                                            onClick={() => removeItem(category.key, index)}
                                            className={`ml-1 rounded-full p-0.5 transition-colors ${colors.hover}`}
                                        >
                                            <X className='w-4 h-3'/>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}

            {!hasAnyData && (
                <div className='bg-blue-50 p-4 rounded-lg'>
                    <p className='text-sm text-blue-800'>
                        <strong>Tip:</strong> Organize your technical skills into categories for better presentation. 
                        This helps employers quickly identify your expertise in different areas.
                    </p>
                </div>
            )}
        </div>
    )
}

export default TechStackForm

