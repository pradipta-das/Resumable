'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ResumeBuilder } from '@/components/ResumeBuilder'
import { TemplateSelector } from '@/components/TemplateSelector'
import { Resume } from '@/types/resume'
import { CustomTemplate } from '@/types/template'
import { Icon } from '@/components/Icon'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentResume, setCurrentResume] = useState<Resume | undefined>(undefined)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('1') // Default to first template

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  const handleSaveResume = async (resume: Resume) => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...resume,
          userId: session?.user.id,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Resume saved successfully:', result)
        // You can add a toast notification here
      } else {
        throw new Error('Failed to save resume')
      }
    } catch (error) {
      console.error('Error saving resume:', error)
      // You can add error handling/notification here
    }
  }

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    setShowTemplateSelector(false)
  }

  const handleCustomizeTemplate = (template: CustomTemplate) => {
    console.log('Customizing template:', template)
    // You can implement template customization logic here
    setShowTemplateSelector(false)
  }

  const handleExportPDF = async () => {
    if (!currentResume?._id) {
      console.error('No resume to export')
      return
    }

    try {
      const response = await fetch(`/api/resumes/${currentResume._id}/export`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${currentResume.title || 'resume'}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        throw new Error('Failed to export PDF')
      }
    } catch (error) {
      console.error('Error exporting PDF:', error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="settings" className="animate-spin" size={32} />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to sign in
  }

  if (showTemplateSelector) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => setShowTemplateSelector(false)}
            className="btn btn-outline"
          >
            <Icon name="arrow-left" size={16} className="mr-2" />
            Back to Resume Builder
          </button>
        </div>
        
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
          onCustomizeTemplate={handleCustomizeTemplate}
        />
      </div>
    )
  }

  return (
    <div className="h-screen">
      <ResumeBuilder
        initialResume={currentResume}
        onSave={handleSaveResume}
        selectedTemplate={selectedTemplate}
        onTemplateChange={() => setShowTemplateSelector(true)}
        onExportPDF={handleExportPDF}
      />
    </div>
  )
}