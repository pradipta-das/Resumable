import React from 'react'
import { ResumeField } from '@/types/resume'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  field: ResumeField
  value: any
  onChange: (value: any) => void
  className?: string
}

export function FormField({ field, value, onChange, className }: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = field.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    onChange(newValue)
  }

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className="form-textarea"
          />
        )
      
      case 'select':
        return (
          <select
            id={field.id}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className="form-input"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              id={field.id}
              type="checkbox"
              checked={value || false}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={field.id} className="text-sm font-medium leading-none">
              {field.label}
            </label>
          </div>
        )
      
      default:
        return (
          <input
            id={field.id}
            type={field.type}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className="form-input"
          />
        )
    }
  }

  if (field.type === 'checkbox') {
    return (
      <div className={cn('form-field', className)}>
        {renderField()}
      </div>
    )
  }

  return (
    <div className={cn('form-field', className)}>
      <label htmlFor={field.id} className="form-label">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </label>
      {renderField()}
    </div>
  )
}