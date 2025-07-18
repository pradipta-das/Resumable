import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ResumeSection as ResumeSectionType, ResumeSectionData } from '@/types/resume'
import { getSectionById } from '@/lib/schema'
import { FormField } from './FormField'
import { Icon } from './Icon'
import { cn, generateId } from '@/lib/utils'

interface ResumeSectionProps {
  sectionData: ResumeSectionData
  onUpdate: (sectionData: ResumeSectionData) => void
  onDelete: (sectionId: string) => void
  onDuplicate?: (sectionData: ResumeSectionData) => void
}

export function ResumeSection({ sectionData, onUpdate, onDelete, onDuplicate }: ResumeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const sectionSchema = getSectionById(sectionData.sectionId)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sectionData.id,
    data: {
      type: 'section',
      sectionId: sectionData.sectionId,
      order: sectionData.order,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  if (!sectionSchema) {
    return null
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    const updatedData = {
      ...sectionData,
      data: {
        ...sectionData.data,
        [fieldId]: value,
      },
    }
    onUpdate(updatedData)
  }

  const handleDuplicate = () => {
    if (onDuplicate) {
      const duplicatedData = {
        ...sectionData,
        id: generateId(),
        data: { ...sectionData.data },
      }
      onDuplicate(duplicatedData)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'section-container',
        isDragging && 'shadow-lg ring-2 ring-primary ring-opacity-50'
      )}
    >
      <div className="section-header">
        <div className="flex items-center space-x-3">
          <div
            {...attributes}
            {...listeners}
            className="drag-handle p-1 rounded hover:bg-muted"
          >
            <Icon name="grip-vertical" size={16} className="text-muted-foreground" />
          </div>
          <Icon name={sectionSchema.icon} size={20} className="text-primary" />
          <h3 className="text-lg font-semibold">{sectionSchema.title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-ghost btn-sm"
          >
            <Icon name={isExpanded ? 'minus' : 'plus'} size={16} />
          </button>
          
          {sectionSchema.repeatable && (
            <button
              onClick={handleDuplicate}
              className="btn btn-ghost btn-sm"
              title="Duplicate section"
            >
              <Icon name="copy" size={16} />
            </button>
          )}
          
          {!sectionSchema.required && (
            <button
              onClick={() => onDelete(sectionData.id)}
              className="btn btn-ghost btn-sm text-destructive hover:text-destructive"
              title="Delete section"
            >
              <Icon name="trash" size={16} />
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {sectionSchema.fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              value={sectionData.data[field.id]}
              onChange={(value) => handleFieldChange(field.id, value)}
            />
          ))}
        </div>
      )}
    </div>
  )
}