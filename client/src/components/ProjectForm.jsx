import { Plus, Trash2, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExtension from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

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

const ProjectItem = ({ project, index, onUpdate, onRemove }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            UnderlineExtension,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: project.description || '<p>Describe your project, technologies used, and key outcomes...</p>',
        onUpdate: ({ editor }) => {
            onUpdate(index, 'description', editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[100px] p-3',
            },
        },
    });

    useEffect(() => {
        if (editor && project.description && editor.getHTML() !== project.description) {
            editor.commands.setContent(project.description)
        }
    }, [project.description, editor]);

    return (
        <div className='p-4 border border-gray-200 rounded-lg space-y-3'>
            <div className='flex justify-between items-start'>
                <h4>Project #{index + 1}</h4>
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className='text-red-500 hover:text-red-700 transition-colors'
                >
                    <Trash2 className='size-4' />
                </button>
            </div>

            <div className='grid gap-3'>
                <input
                    value={project.name || ""}
                    onChange={(e) => onUpdate(index, "name", e.target.value)}
                    type="text"
                    placeholder='Project name'
                    className='px-3 py-2 text-sm rounded-lg'
                />

                <input
                    value={project.type || ""}
                    onChange={(e) => onUpdate(index, "type", e.target.value)}
                    type="text"
                    placeholder='Project type'
                    className='px-3 py-2 text-sm rounded-lg'
                />

                <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>Describe your project</label>
                    <div className='border border-gray-300 rounded-lg overflow-hidden bg-white'>
                        <EditorToolbar editor={editor} />
                        <div className='text-sm text-gray-700'>
                            <EditorContent editor={editor} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectForm = ({ data, onChange }) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        };
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Projects & Training </h3>
                    <p className='text-sm text-gray-500'>Add your Projects</p>
                </div>
                <button
                    type="button"
                    onClick={addProject}
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'
                >
                    <Plus className='size-4' />
                    Add Project
                </button>
            </div>

            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <ProjectItem
                        key={index}
                        project={project}
                        index={index}
                        onUpdate={updateProject}
                        onRemove={removeProject}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProjectForm
