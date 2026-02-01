import { Loader2, Sparkles, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExtension from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {

    const { token } = useSelector(state => state.auth)
    const [isGenerating, setIsGenerating] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit,
            UnderlineExtension,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: data || '<p>Write a compelling professional summary that highlights your key strengths and career objectives...</p>',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html)
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] p-4',
            },
        },
    })

    // Update editor content when data changes externally (e.g., loading existing resume)
    useEffect(() => {
        if (editor && data && editor.getHTML() !== data) {
            editor.commands.setContent(data)
        }
    }, [data, editor])

    const generateSummary = async ()=>{
        try {
            console.log("in generateSummary func");
            setIsGenerating(true)
            const textContent = editor ? editor.getText() : data
            const prompt = `enhance my professional summary "${textContent}"`;
            const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, {headers: { Authorization: 'Bearer ' + token }})
            const enhancedContent = response.data.enhanceContent
            
            if (editor) {
                editor.commands.setContent(`<p>${enhancedContent}</p>`)
            }
            setResumeData(prev => ({...prev, professional_summary: enhancedContent}))
            console.log(response);
          } catch (error) {
            console.error(error?.response?.data?.message || error.message)
          }
          finally{
            setIsGenerating(false)
          }
    }

    if (!editor) {
        return null
    }

  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Professional Summary </h3>
                <p className='text-sm text-gray-500'>Add summary for your resume here</p>
            </div>
            <button disabled={isGenerating} onClick={generateSummary} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                {isGenerating ? (<Loader2 className='size-4 animate-spin'/>) : (<Sparkles className='size-4' />)}
                {isGenerating ? "Enhancing.." : "AI Enhance"}
            
            </button>
        </div>

        <div className='mt-6 border border-gray-300 rounded-lg overflow-hidden bg-white'>
            {/* Toolbar */}
            <div className='flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
                    title="Bold"
                >
                    <Bold className='size-4' />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
                    title="Italic"
                >
                    <Italic className='size-4' />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
                    title="Underline"
                >
                    <Underline className='size-4' />
                </button>

                <div className='w-px h-6 bg-gray-300 mx-1'></div>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
                    title="Bullet List"
                >
                    <List className='size-4' />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
                    title="Numbered List"
                >
                    <ListOrdered className='size-4' />
                </button>

                <div className='w-px h-6 bg-gray-300 mx-1'></div>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''}`}
                    title="Align Left"
                >
                    <AlignLeft className='size-4' />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''}`}
                    title="Align Center"
                >
                    <AlignCenter className='size-4' />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''}`}
                    title="Align Right"
                >
                    <AlignRight className='size-4' />
                </button>
            </div>

            {/* Editor Content */}
            <div className='text-sm text-gray-700'>
                <EditorContent editor={editor} />
            </div>
        </div>

        <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>    
    </div>
  )
}

export default ProfessionalSummaryForm