import { ResumeSchema } from '@/types/resume'
import resumeSchemaData from '@/config/resume-schema.json'

export const resumeSchema: ResumeSchema = resumeSchemaData as ResumeSchema

export function getAvailableSections() {
  return Object.values(resumeSchema.sections)
}

export function getSectionById(sectionId: string) {
  return resumeSchema.sections[sectionId]
}

export function getAvailableTemplates() {
  return Object.values(resumeSchema.templates)
}

export function getTemplateById(templateId: string) {
  return resumeSchema.templates[templateId]
}