'use client'

import React, { useState, useEffect } from 'react'
import { CustomTemplate } from '@/types/template'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
  onCustomizeTemplate: (template: CustomTemplate) => void
}

export function TemplateSelector({ 
  selectedTemplate, 
  onTemplateChange, 
  onCustomizeTemplate 
}: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<CustomTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates?public=true')
      const data = await response.json()
      setTemplates(data.templates || [])
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'creative', name: 'Creative' },
    { id: 'professional', name: 'Professional' }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon name="settings" className="animate-spin" size={24} />
        <span className="ml-2">Loading templates...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template._id}
            className={cn(
              'relative border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md',
              selectedTemplate === template._id
                ? 'border-primary ring-2 ring-primary ring-opacity-50'
                : 'border-border hover:border-primary/50'
            )}
            onClick={() => onTemplateChange(template._id!)}
          >
            {/* Template Preview */}
            <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <div 
                className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${template.style.colors.background} 0%, ${template.style.colors.primary}10 100%)`
                }}
              >
                <div className="text-center p-4">
                  <div 
                    className="w-full h-2 rounded mb-2"
                    style={{ backgroundColor: template.style.colors.primary }}
                  />
                  <div className="space-y-1">
                    <div className="w-3/4 h-1 bg-gray-400 rounded mx-auto" />
                    <div className="w-1/2 h-1 bg-gray-300 rounded mx-auto" />
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="w-full h-1 bg-gray-300 rounded" />
                    <div className="w-5/6 h-1 bg-gray-300 rounded" />
                    <div className="w-4/6 h-1 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{template.name}</h4>
                {template.isPremium && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Premium
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">{template.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center">
                  <Icon name="download" size={12} className="mr-1" />
                  {template.downloads}
                </span>
                <span className="flex items-center">
                  <Icon name="star" size={12} className="mr-1" />
                  {template.rating}
                </span>
              </div>

              {/* Template Tags */}
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Customize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCustomizeTemplate(template)
              }}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              title="Customize Template"
            >
              <Icon name="settings" size={16} />
            </button>

            {/* Selected Indicator */}
            {selectedTemplate === template._id && (
              <div className="absolute top-2 left-2 p-1 bg-primary rounded-full">
                <Icon name="check" size={12} className="text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="folder" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No templates found in this category.</p>
        </div>
      )}
    </div>
  )
}

// Add missing icons to the Icon component
const additionalIcons = {
  star: '⭐',
  check: '✓',
}