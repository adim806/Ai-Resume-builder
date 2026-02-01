import { Shield, Plus, Trash2, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExtension from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

// Editor toolbar component for each military service
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

// Individual military service item with its own editor
const MilitaryServiceItem = ({ service, index, onUpdate, onRemove }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            UnderlineExtension,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: service.description || '<p>Describe your responsibilities and achievements...</p>',
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

    // Update editor when description changes externally
    useEffect(() => {
        if (editor && service.description && editor.getHTML() !== service.description) {
            editor.commands.setContent(service.description)
        }
    }, [service.description, editor]);

    return (
        <div className='p-4 border border-gray-200 rounded-lg space-y-3'>
            <div className='flex justify-between items-start'>
                <h4>Service #{index + 1}</h4>
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
                    value={service.unit || ""} 
                    onChange={(e) => onUpdate(index, "unit", e.target.value)} 
                    type="text" 
                    placeholder='Unit name' 
                    className='px-3 py-2 text-sm rounded-lg'
                />

                <input 
                    value={service.rank || ""} 
                    onChange={(e) => onUpdate(index, "rank", e.target.value)} 
                    type="text" 
                    placeholder='Rank/Position' 
                    className='px-3 py-2 text-sm rounded-lg'
                />

                <input 
                    value={service.start_date || ""} 
                    onChange={(e) => onUpdate(index, "start_date", e.target.value)} 
                    type="month" 
                    className='px-3 py-2 text-sm rounded-lg'
                />

                <input 
                    value={service.end_date || ""} 
                    onChange={(e) => onUpdate(index, "end_date", e.target.value)} 
                    type="month" 
                    disabled={service.is_current} 
                    className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'
                />
            </div>

            <label className='flex items-center gap-2'>
                <input 
                    type="checkbox" 
                    checked={service.is_current || false} 
                    onChange={(e) => onUpdate(index, "is_current", e.target.checked)} 
                    className='rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-500 outline-none'
                />
                <span className='text-sm text-gray-700'>Currently serving</span>
            </label>

            <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Description</label>
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

const MilitaryServiceForm = ({data = [], onChange}) => {

    const addMilitaryService = () =>{
        const newMilitaryService = {
            unit: "",
            rank: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newMilitaryService])
    }

    const removeMilitaryService = (index) =>{
        const updated = data.filter((_, i)=> i !==index);
        onChange(updated)
    }

    const updateMilitaryService = (index, field, value) =>{
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

  return (
    <div className='space-y-6'>
       
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Military Service </h3>
                <p className='text-sm text-gray-500'>Add your military service details</p>
            </div>
            <button onClick={addMilitaryService} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                <Plus className='size-4' />
                Add Service
            </button>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <Shield className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                <p>No military service added yet.</p>
                <p className='text-sm'>Click "Add Service" to get started.</p>
            </div>
        ) : (
            <div className='space-y-4'>
                {data.map((service, index) => (
                    <MilitaryServiceItem
                        key={index}
                        service={service}
                        index={index}
                        onUpdate={updateMilitaryService}
                        onRemove={removeMilitaryService}
                    />
                ))}
            </div>
        )}

    </div>
  )
}

export default MilitaryServiceForm

