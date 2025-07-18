'use client'

import React, { useState, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { Resume, ResumeSectionData, DragItem } from '@/types/resume'
import { getSectionById } from '@/lib/schema'
import { generateId } from '@/lib/utils'
import { ResumeSection } from './ResumeSection'
import { AvailableSections } from './AvailableSections'
import { Icon } from './Icon'

interface ResumeBuilderProps {
  initialResume?: Resume
  onSave: (resume: Resume) => void
}

export function ResumeBuilder({ initialResume, onSave }: ResumeBuilderProps) {
  const [resume, setResume] = useState<Resume>(() => {
    if (initialResume) {
      return initialResume
    }
    
    // Create a new resume with required sections
    const personalSection: ResumeSectionData = {
      id: generateId(),
      sectionId: 'personal',
      order: 0,
      data: {},
    }
    
    return {
      title: 'My Resume',
      template: 'modern',
      sections: [personalSection],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  const [activeId, setActiveId] = useState<string | null>(null)
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
    
    const section = resume.sections.find(s => s.id === active.id)
    if (section) {
      setDraggedItem({
        id: section.id,
        type: 'section',
        sectionId: section.sectionId,
        order: section.order,
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setDraggedItem(null)

    if (!over) return

    // Handle dropping section back to available sections (remove it)
    if (over.id === 'available-sections') {
      const sectionToRemove = resume.sections.find(s => s.id === active.id)
      if (sectionToRemove) {
        const sectionSchema = getSectionById(sectionToRemove.sectionId)
        if (sectionSchema && !sectionSchema.required) {
          handleDeleteSection(sectionToRemove.id)
        }
      }
      return
    }

    // Handle reordering sections
    if (active.id !== over.id) {
      const oldIndex = resume.sections.findIndex(s => s.id === active.id)
      const newIndex = resume.sections.findIndex(s => s.id === over.id)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newSections = arrayMove(resume.sections, oldIndex, newIndex)
        const updatedSections = newSections.map((section, index) => ({
          ...section,
          order: index,
        }))
        
        setResume(prev => ({
          ...prev,
          sections: updatedSections,
          updatedAt: new Date(),
        }))
      }
    }
  }

  const handleAddSection = (sectionId: string) => {
    const newSection: ResumeSectionData = {
      id: generateId(),
      sectionId,
      order: resume.sections.length,
      data: {},
    }
    
    setResume(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
      updatedAt: new Date(),
    }))
  }

  const handleUpdateSection = (updatedSection: ResumeSectionData) => {
    setResume(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === updatedSection.id ? updatedSection : section
      ),
      updatedAt: new Date(),
    }))
  }

  const handleDeleteSection = (sectionId: string) => {
    setResume(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId),
      updatedAt: new Date(),
    }))
  }

  const handleDuplicateSection = (sectionData: ResumeSectionData) => {
    const duplicatedSection = {
      ...sectionData,
      id: generateId(),
      order: resume.sections.length,
    }
    
    setResume(prev => ({
      ...prev,
      sections: [...prev.sections, duplicatedSection],
      updatedAt: new Date(),
    }))
  }

  const handleSave = () => {
    onSave(resume)
  }

  const usedSections = resume.sections.map(section => section.sectionId)

  return (
    <div className="flex h-screen bg-background">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Available Sections Panel */}
        <AvailableSections
          usedSections={usedSections}
          onAddSection={handleAddSection}
        />

        {/* Main Resume Builder */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-border p-4 bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={resume.title}
                  onChange={(e) => setResume(prev => ({ ...prev, title: e.target.value }))}
                  className="text-xl font-bold bg-transparent border-none outline-none focus:bg-muted rounded px-2 py-1"
                  placeholder="Resume Title"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  <Icon name="save" size={16} className="mr-2" />
                  Save Resume
                </button>
                
                <button className="btn btn-outline">
                  <Icon name="eye" size={16} className="mr-2" />
                  Preview
                </button>
                
                <button className="btn btn-outline">
                  <Icon name="download" size={16} className="mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* Resume Sections */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <SortableContext
                items={resume.sections.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {resume.sections.map((section) => (
                  <ResumeSection
                    key={section.id}
                    sectionData={section}
                    onUpdate={handleUpdateSection}
                    onDelete={handleDeleteSection}
                    onDuplicate={handleDuplicateSection}
                  />
                ))}
              </SortableContext>
              
              {resume.sections.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="file-text" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No sections added yet. Add sections from the left panel to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId && draggedItem ? (
            <div className="section-container opacity-90 rotate-3 shadow-lg">
              <div className="section-header">
                <div className="flex items-center space-x-3">
                  <Icon name="grip-vertical" size={16} className="text-muted-foreground" />
                  <Icon name={getSectionById(draggedItem.sectionId)?.icon || 'file-text'} size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold">
                    {getSectionById(draggedItem.sectionId)?.title}
                  </h3>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}