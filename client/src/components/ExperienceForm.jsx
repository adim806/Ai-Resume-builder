import { Briefcase, Loader2, Plus, Sparkles, Trash2, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExtension from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

// Editor toolbar component for each experience
const EditorToolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className='flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap'>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
                title="Bold"
            >
                <Bold className='size-3.5' />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
                title="Italic"
            >
                <Italic className='size-3.5' />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
                title="Underline"
            >
                <Underline className='size-3.5' />
            </button>

            <div className='w-px h-5 bg-gray-300 mx-1'></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
                title="Bullet List"
            >
                <List className='size-3.5' />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
                title="Numbered List"
            >
                <ListOrdered className='size-3.5' />
            </button>

            <div className='w-px h-5 bg-gray-300 mx-1'></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''}`}
                title="Align Left"
            >
                <AlignLeft className='size-3.5' />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''}`}
                title="Align Center"
            >
                <AlignCenter className='size-3.5' />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''}`}
                title="Align Right"
            >
                <AlignRight className='size-3.5' />
            </button>
        </div>
    );
};

// Individual experience item with its own editor
const ExperienceItem = ({ experience, index, onUpdate, onRemove, onGenerateDescription, isGenerating }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            UnderlineExtension,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: experience.description || '<p>Describe your key responsibilities and achievements...</p>',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onUpdate(index, 'description', html)
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[100px] p-3',
            },
        },
    });

    // Update editor when description changes externally (e.g., AI enhancement)
    useEffect(() => {
        if (editor && experience.description && editor.getHTML() !== experience.description) {
            editor.commands.setContent(experience.description)
        }
    }, [experience.description, editor]);

    return (
        <div className='p-4 border border-gray-200 rounded-lg space-y-3'>
            <div className='flex justify-between items-start'>
                <h4>Experience #{index + 1}</h4>
                <button 
                    type="button"
                    onClick={() => onRemove(index)} 
                    className='text-red-500 hover:text-red-700 transition-colors'
                >
                    <Trash2 className='size-4'/>
                </button>
            </div>

            <div className='grid md:grid-cols-2 gap-3'>
                <input 
                    value={experience.company || ""} 
                    onChange={(e) => onUpdate(index, "company", e.target.value)} 
                    type="text" 
                    placeholder='Company name' 
                    className='px-3 py-2 text-sm rounded-lg'
                />

                <input 
                    value={experience.position || ""} 
                    onChange={(e) => onUpdate(index, "position", e.target.value)} 
                    type="text" 
                    placeholder='Job title' 
                    className='px-3 py-2 text-sm rounded-lg'
                />

                <input 
                    value={experience.start_date || ""} 
                    onChange={(e) => onUpdate(index, "start_date", e.target.value)} 
                    type="month" 
                    className='px-3 py-2 text-sm rounded-lg'
                />

                <input 
                    value={experience.end_date || ""} 
                    onChange={(e) => onUpdate(index, "end_date", e.target.value)} 
                    type="month" 
                    disabled={experience.is_current} 
                    className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'
                />
            </div>

            <label className='flex items-center gap-2'>
                <input 
                    type="checkbox" 
                    checked={experience.is_current || false} 
                    onChange={(e) => onUpdate(index, "is_current", e.target.checked)} 
                    className='rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-500 outline-none'
                />
                <span className='text-sm text-gray-700'>Currently working here</span>
            </label>

            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <label className='text-sm font-medium text-gray-700'>Job Description</label>
                    <button 
                        type="button"
                        onClick={() => onGenerateDescription(index)} 
                        disabled={isGenerating || !experience.position || !experience.company} 
                        className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'
                    >
                        {isGenerating ? (
                            <Loader2 className='w-3 h-3 animate-spin'/>
                        ) : (
                            <Sparkles className='w-3 h-3' />
                        )}
                        Enhance with AI
                    </button>
                </div>

                <div className='border border-gray-300 rounded-lg overflow-hidden bg-white'>
                    <EditorToolbar editor={editor} />
                    <div className='text-sm text-gray-700'>
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
        </div>
    );
};


const ExperienceForm = ({data, onChange}) => {

    const { token } = useSelector(state => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1)

    const addExperience = () =>{

        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false

        };
        onChange([...data, newExperience])
    }

    const removeExperience = (index) =>{
        const updated = data.filter((_, i)=> i !==index);
        onChange(updated)
    }

    const updateExperience = (index, field, value) =>{
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

    const generatDescription = async (index) =>{
        console.log("in generatDescription func");

        setGeneratingIndex(index)
        const experience = data[index]
        
        // Extract plain text from HTML if it's HTML, otherwise use as is
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = experience.description || '';
        const textContent = tempDiv.textContent || tempDiv.innerText || experience.description || '';
        
        const prompt = `enhance this job description "${textContent}" for position of ${experience.position} at ${experience.company}.`
        
        try {
            const response = await api.post('/api/ai/enhance-job-desc', {userContent: prompt}, {headers: { Authorization: 'Bearer ' + token }})
            console.log(response);

            // Wrap the AI response in a paragraph tag for proper HTML formatting
            updateExperience(index, "description", `<p>${response.data.enhanceContent}</p>`)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setGeneratingIndex(-1)
        }
    }



  return (
    <div className='space-y-6'>
       
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Professional Experience </h3>
                <p className='text-sm text-gray-500'>Add your job experience</p>
            </div>
            <button 
                type="button"
                onClick={addExperience} 
                className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'
            >
                <Plus className='size-4' />
                Add Experience
            </button>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                <p>No work experience added yet.</p>
                <p className='text-sm'>Click "Add Experience" to get started.</p>
            </div>
        ) : (
            <div className='space-y-4'>
                {data.map((experience, index) => (
                    <ExperienceItem
                        key={index}
                        experience={experience}
                        index={index}
                        onUpdate={updateExperience}
                        onRemove={removeExperience}
                        onGenerateDescription={generatDescription}
                        isGenerating={generatingIndex === index}
                    />
                ))}
            </div>
        )}

    </div>
  )
}

export default ExperienceForm