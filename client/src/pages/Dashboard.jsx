import { FilePenIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadeResume, setshowUploadeResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async ()=>{
    try {
      const { data } = await api.get('/api/users/resumes', {headers: {Authorization: 'Bearer ' + token}})
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      
    }
  }
  const creatResume = async(event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', {title}, {headers: {Authorization: 'Bearer ' + token}})
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
      
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async(event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers: {Authorization: 'Bearer ' + token}})
      setTitle('')
      setResume(null)
      setshowUploadeResume(false)
      navigate(`/app/builder/${data.resumeId}`)
      
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }
    setIsLoading(false)

  }

  const editTitle = async(event) => {
    try {
      event.preventDefault()
      const {data} = await api.put(`/api/resumes/update`, {resumeId: editResumeId, resumeData: { title }}, {headers: {Authorization: 'Bearer ' + token}})
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume, title} : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    
  }
  const deleteResume = async(resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if(confirm){
        const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {Authorization: 'Bearer ' + token}})
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }
  
  useEffect(()=>{
    loadAllResumes()
  },[])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header Section */}
        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'>
            My Resumes
          </h1>
          <p className='text-slate-600 text-lg'>Create, manage, and customize your professional resumes</p>
        </div>

        {/* Action Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12 max-w-3xl'>
          {/* Create Resume Card */}
          <button 
            onClick={() => setShowCreateResume(true)} 
            className='group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-indigo-500'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            <div className='relative flex flex-col items-center gap-4'>
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500'>
                <PlusIcon className='size-10 text-white'/>
              </div>
              <div className='text-center'>
                <h3 className='text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors'>Create New Resume</h3>
                <p className='text-sm text-slate-500'>Start from scratch with our templates</p>
              </div>
            </div>
          </button>

          {/* Upload Resume Card */}
          <button 
            onClick={()=>setshowUploadeResume(true)} 
            className='group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-purple-500'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            <div className='relative flex flex-col items-center gap-4'>
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500'>
                <UploadCloudIcon className='size-10 text-white'/>
              </div>
              <div className='text-center'>
                <h3 className='text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors'>Upload Existing</h3>
                <p className='text-sm text-slate-500'>Import your PDF resume instantly</p>
              </div>
            </div>
          </button>
        </div>

        {/* Resumes Grid */}
        {allResumes.length > 0 && (
          <div>
            <div className='flex items-center gap-3 mb-6'>
              <div className='h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full'></div>
              <h2 className='text-2xl font-bold text-slate-800'>Your Resumes</h2>
            </div>
            
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
              {allResumes.map((resume,index)=>{
                const baseColor = colors[index % colors.length];
                return (
                  <div 
                    key={index} 
                    onClick={()=>navigate(`/app/builder/${resume._id}`)} 
                    className='group relative w-full h-64 flex flex-col items-center justify-center rounded-2xl gap-3 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-2 transform hover:-translate-y-2' 
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}15, ${baseColor}30, white)`,
                      borderColor: baseColor + '40'
                    }}
                  >
                    {/* Decorative background elements */}
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500' 
                         style={{background: `radial-gradient(circle at top right, ${baseColor}20, transparent)`}}
                    ></div>
                    
                    {/* Icon */}
                    <div className='relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500'
                         style={{background: `linear-gradient(135deg, ${baseColor}, ${baseColor}dd)`}}
                    >
                      <FilePenIcon className='size-8 text-white'/>
                    </div>
                    
                    {/* Title */}
                    <p className='relative z-10 text-base font-semibold group-hover:scale-105 transition-all px-4 text-center line-clamp-2' 
                       style={{color:baseColor}}
                    >
                      {resume.title}
                    </p>
                    
                    {/* Date */}
                    <p className='absolute bottom-4 text-xs font-medium transition-all duration-300 px-3 text-center' 
                       style={{ color: baseColor + 'cc' }}
                    >
                      {new Date(resume.updateAt).toLocaleDateString()}
                    </p>
                    
                    {/* Action Buttons */}
                    <div 
                      onClick={(e)=> e.stopPropagation()} 
                      className='absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    >
                      <button
                        onClick={()=> {setEditResumeId(resume._id); setTitle(resume.title)}}
                        className='p-2 bg-white/90 hover:bg-white rounded-lg shadow-md hover:shadow-lg transition-all'
                        style={{color: baseColor}}
                      >
                        <PencilIcon className='size-4' />
                      </button>
                      <button
                        onClick={()=>deleteResume(resume._id)}
                        className='p-2 bg-white/90 hover:bg-red-50 rounded-lg shadow-md hover:shadow-lg transition-all hover:text-red-600'
                      >
                        <TrashIcon className='size-4'/>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {allResumes.length === 0 && (
          <div className='text-center py-20'>
            <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center'>
              <FilePenIcon className='size-12 text-indigo-500'/>
            </div>
            <h3 className='text-2xl font-bold text-slate-700 mb-2'>No resumes yet</h3>
            <p className='text-slate-500'>Create your first resume to get started</p>
          </div>
        )}
          {showCreateResume && (
            <form onSubmit={creatResume} onClick={()=> setShowCreateResume(false)} className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'>
              <div onClick={e => e.stopPropagation()} className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all animate-slideUp'>
                {/* Header with gradient */}
                <div className='mb-6'>
                  <div className='w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg'>
                    <PlusIcon className='size-8 text-white'/>
                  </div>
                  <h2 className='text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Create New Resume</h2>
                  <p className='text-sm text-slate-500 text-center mt-2'>Give your resume a memorable title</p>
                </div>

                {/* Input Field */}
                <div className='mb-6'>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Resume Title</label>
                  <input 
                    onChange={(e)=>setTitle(e.target.value)} 
                    value={title} 
                    type="text" 
                    placeholder='e.g., Software Engineer Resume' 
                    className='w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all' 
                    autoFocus
                  />
                </div>

                {/* Button */}
                <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200'>
                  Create Resume
                </button>

                {/* Close Button */}
                <button 
                  type="button"
                  className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all' 
                  onClick={()=>{setShowCreateResume(false); setTitle('') }}
                >
                  <XIcon className='size-5' />
                </button>
              </div>
            </form>
          )}

          {showUploadeResume && (
            <form onSubmit={uploadResume} onClick={()=> setshowUploadeResume(false)} className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'>
              <div onClick={e => e.stopPropagation()} className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all animate-slideUp'>
                {/* Header with gradient */}
                <div className='mb-6'>
                  <div className='w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg'>
                    <UploadCloudIcon className='size-8 text-white'/>
                  </div>
                  <h2 className='text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Upload Resume</h2>
                  <p className='text-sm text-slate-500 text-center mt-2'>Import your existing PDF resume</p>
                </div>

                {/* Title Input */}
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Resume Title</label>
                  <input 
                    onChange={(e)=>setTitle(e.target.value)} 
                    value={title} 
                    type="text" 
                    placeholder='e.g., My Professional Resume' 
                    className='w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all' 
                  />
                </div>

                {/* File Upload Area */}
                <div className='mb-6'>
                  <label htmlFor="resume-input" className='block text-sm font-medium text-slate-700 mb-2'>
                    Resume File (PDF)
                  </label>
                  <div className='relative'>
                    <div className='flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-300 group text-slate-400 rounded-xl p-8 hover:border-purple-500 hover:bg-purple-50/50 cursor-pointer transition-all'>
                      {resume ? (
                        <div className='flex items-center gap-3 text-purple-600'>
                          <div className='w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center'>
                            <UploadCloud className='size-6'/>
                          </div>
                          <div className='text-left'>
                            <p className='font-medium text-sm'>{resume.name}</p>
                            <p className='text-xs text-slate-500'>Ready to upload</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className='w-16 h-16 rounded-full bg-slate-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors'>
                            <UploadCloud className='size-8 group-hover:text-purple-500 transition-colors'/>
                          </div>
                          <div className='text-center'>
                            <p className='text-slate-700 font-medium group-hover:text-purple-600 transition-colors'>Click to upload PDF</p>
                            <p className='text-xs text-slate-500 mt-1'>or drag and drop your file here</p>
                          </div>
                        </>
                      )}
                    </div>
                    <input type="file" id="resume-input" accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])}/>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  disabled={isLoading}
                  className='w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {isLoading && <LoaderCircleIcon className='animate-spin size-5' />}
                  {isLoading ? 'Processing...' : 'Upload Resume'}
                </button>

                {/* Close Button */}
                <button 
                  type="button"
                  className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all' 
                  onClick={()=>{setshowUploadeResume(false); setTitle(''); setResume(null) }}
                >
                  <XIcon className='size-5' />
                </button>
              </div>
            </form>
          )}

          {editResumeId && (
            <form onSubmit={editTitle} onClick={()=> setEditResumeId('')} className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'>
              <div onClick={e => e.stopPropagation()} className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all animate-slideUp'>
                {/* Header with gradient */}
                <div className='mb-6'>
                  <div className='w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg'>
                    <PencilIcon className='size-8 text-white'/>
                  </div>
                  <h2 className='text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>Edit Resume Title</h2>
                  <p className='text-sm text-slate-500 text-center mt-2'>Update your resume title</p>
                </div>

                {/* Input Field */}
                <div className='mb-6'>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Resume Title</label>
                  <input 
                    onChange={(e)=>setTitle(e.target.value)} 
                    value={title} 
                    type="text" 
                    placeholder='Enter new resume title' 
                    className='w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all' 
                    autoFocus
                  />
                </div>

                {/* Button */}
                <button className='w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200'>
                  Update Title
                </button>

                {/* Close Button */}
                <button 
                  type="button"
                  className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all' 
                  onClick={()=>{setEditResumeId(''); setTitle('') }}
                >
                  <XIcon className='size-5' />
                </button>
              </div>
            </form>
          )}
      </div>
    </div>
  )
}

export default Dashboard