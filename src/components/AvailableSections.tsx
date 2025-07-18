import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { getAvailableSections } from '@/lib/schema'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

interface AvailableSectionsProps {
  usedSections: string[]
  onAddSection: (sectionId: string) => void
}

export function AvailableSections({ usedSections, onAddSection }: AvailableSectionsProps) {
  const availableSections = getAvailableSections()
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'available-sections',
    data: {
      type: 'available-sections',
    },
  })

  const getAvailableCount = (sectionId: string) => {
    const section = availableSections.find(s => s.id === sectionId)
    if (!section) return 0
    
    if (section.repeatable) {
      return Infinity // Can add unlimited instances
    }
    
    const usedCount = usedSections.filter(id => id === sectionId).length
    return section.required ? 0 : (usedCount > 0 ? 0 : 1)
  }

  return (
    <div className="w-80 bg-card border-r border-border p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Available Sections</h2>
      
      <div
        ref={setNodeRef}
        className={cn(
          'space-y-2 min-h-[200px] p-2 rounded-lg border-2 border-dashed transition-colors',
          isOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        )}
      >
        {availableSections.map((section) => {
          const availableCount = getAvailableCount(section.id)
          const canAdd = availableCount > 0
          
          return (
            <div
              key={section.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border transition-colors',
                canAdd
                  ? 'bg-background border-border hover:bg-accent cursor-pointer'
                  : 'bg-muted border-muted text-muted-foreground cursor-not-allowed'
              )}
              onClick={() => canAdd && onAddSection(section.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon name={section.icon} size={20} className={canAdd ? 'text-primary' : 'text-muted-foreground'} />
                <div>
                  <h3 className="font-medium">{section.title}</h3>
                  {section.required && (
                    <span className="text-xs text-muted-foreground">Required</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {section.repeatable && (
                  <span className="text-xs text-muted-foreground">Repeatable</span>
                )}
                {canAdd && (
                  <Icon name="plus" size={16} className="text-primary" />
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Click on a section to add it to your resume, or drag sections from your resume here to remove them.</p>
      </div>
    </div>
  )
}