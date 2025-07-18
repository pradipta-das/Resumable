'use client'

import { useState } from 'react'
import { ResumeBuilder } from '@/components/ResumeBuilder'
import { Resume } from '@/types/resume'

export default function Home() {
  const [currentResume, setCurrentResume] = useState<Resume | undefined>(undefined)

  const handleSaveResume = async (resume: Resume) => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
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

  return (
    <div className="h-screen">
      <ResumeBuilder
        initialResume={currentResume}
        onSave={handleSaveResume}
      />
    </div>
  )
}