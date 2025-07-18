export interface TemplateStyle {
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    border: string
  }
  fonts: {
    primary: string
    secondary: string
    headings: string
  }
  spacing: {
    section: string
    item: string
    compact: string
  }
  layout: {
    columns: number
    sidebar: boolean
    headerStyle: string
  }
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  style: TemplateStyle
  isPublic: boolean
  isPremium: boolean
  createdBy: string
  downloads: number
  rating: number
  tags: string[]
  preview: string
  createdAt: Date
  updatedAt: Date
}

export interface TemplatePreview {
  id: string
  name: string
  preview: string
  category: string
  isPremium: boolean
  rating: number
  downloads: number
}

export interface TemplateCustomization {
  templateId: string
  userId: string
  customStyle: Partial<TemplateStyle>
  name: string
  createdAt: Date
  updatedAt: Date
}