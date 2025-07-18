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
    heading: string
    body: string
    size: {
      h1: string
      h2: string
      h3: string
      body: string
      small: string
    }
  }
  spacing: {
    section: string
    paragraph: string
    line: string
  }
  layout: {
    maxWidth: string
    columns: number
    headerHeight: string
    sidebarWidth?: string
  }
}

export interface CustomTemplate {
  _id?: string
  name: string
  description: string
  category: 'professional' | 'creative' | 'modern' | 'classic'
  style: TemplateStyle
  layout: 'single-column' | 'two-column' | 'sidebar'
  preview: string
  isPublic: boolean
  isPremium: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
  downloads: number
  rating: number
  tags: string[]
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