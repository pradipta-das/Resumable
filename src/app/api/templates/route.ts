import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { CustomTemplate } from '@/types/template'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isPublic = searchParams.get('public') === 'true'
    
    // Try MongoDB first, fallback to default templates
    try {
      const { db } = await connectToDatabase()
      
      let query: any = {}
      if (category) query.category = category
      if (isPublic) query.isPublic = true
      
      const templates = await db.collection('templates').find(query).toArray()
      
      return NextResponse.json({ templates })
    } catch (mongoError) {
      console.warn('MongoDB not available, using default templates')
      
      // Return default templates
      const defaultTemplates: CustomTemplate[] = [
        {
          _id: '1',
          name: 'Modern Professional',
          description: 'Clean and modern design perfect for tech professionals',
          category: 'modern',
          style: {
            colors: {
              primary: '#2563eb',
              secondary: '#64748b',
              accent: '#0ea5e9',
              text: '#1e293b',
              background: '#ffffff',
              border: '#e2e8f0'
            },
            fonts: {
              heading: 'Inter',
              body: 'Inter',
              size: {
                h1: '2rem',
                h2: '1.5rem',
                h3: '1.25rem',
                body: '1rem',
                small: '0.875rem'
              }
            },
            spacing: {
              section: '2rem',
              paragraph: '1rem',
              line: '1.5'
            },
            layout: {
              maxWidth: '8.5in',
              columns: 1,
              headerHeight: '3rem'
            }
          },
          layout: 'single-column',
          preview: '/templates/modern-preview.png',
          isPublic: true,
          isPremium: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedAt: new Date(),
          downloads: 1250,
          rating: 4.8,
          tags: ['modern', 'professional', 'tech']
        },
        {
          _id: '2',
          name: 'Classic Executive',
          description: 'Traditional layout for senior executives and managers',
          category: 'classic',
          style: {
            colors: {
              primary: '#1f2937',
              secondary: '#6b7280',
              accent: '#374151',
              text: '#111827',
              background: '#ffffff',
              border: '#d1d5db'
            },
            fonts: {
              heading: 'Times New Roman',
              body: 'Times New Roman',
              size: {
                h1: '1.875rem',
                h2: '1.5rem',
                h3: '1.25rem',
                body: '1rem',
                small: '0.875rem'
              }
            },
            spacing: {
              section: '1.5rem',
              paragraph: '0.75rem',
              line: '1.4'
            },
            layout: {
              maxWidth: '8.5in',
              columns: 1,
              headerHeight: '2.5rem'
            }
          },
          layout: 'single-column',
          preview: '/templates/classic-preview.png',
          isPublic: true,
          isPremium: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedAt: new Date(),
          downloads: 890,
          rating: 4.6,
          tags: ['classic', 'executive', 'traditional']
        },
        {
          _id: '3',
          name: 'Creative Portfolio',
          description: 'Eye-catching design for creative professionals',
          category: 'creative',
          style: {
            colors: {
              primary: '#7c3aed',
              secondary: '#a78bfa',
              accent: '#c084fc',
              text: '#1f2937',
              background: '#ffffff',
              border: '#e5e7eb'
            },
            fonts: {
              heading: 'Poppins',
              body: 'Open Sans',
              size: {
                h1: '2.25rem',
                h2: '1.75rem',
                h3: '1.375rem',
                body: '1rem',
                small: '0.875rem'
              }
            },
            spacing: {
              section: '2.5rem',
              paragraph: '1.25rem',
              line: '1.6'
            },
            layout: {
              maxWidth: '8.5in',
              columns: 2,
              headerHeight: '4rem',
              sidebarWidth: '35%'
            }
          },
          layout: 'two-column',
          preview: '/templates/creative-preview.png',
          isPublic: true,
          isPremium: true,
          createdBy: 'system',
          createdAt: new Date(),
          updatedAt: new Date(),
          downloads: 650,
          rating: 4.9,
          tags: ['creative', 'portfolio', 'design']
        }
      ]
      
      let filteredTemplates = defaultTemplates
      if (category) {
        filteredTemplates = defaultTemplates.filter(t => t.category === category)
      }
      
      return NextResponse.json({ templates: filteredTemplates })
    }
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const template: Omit<CustomTemplate, '_id' | 'createdAt' | 'updatedAt'> = await request.json()
    
    // Try MongoDB first
    try {
      const { db } = await connectToDatabase()
      
      const result = await db.collection('templates').insertOne({
        ...template,
        createdBy: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        downloads: 0,
        rating: 0,
      })
      
      return NextResponse.json({
        message: 'Template created successfully',
        templateId: result.insertedId
      })
    } catch (mongoError) {
      console.warn('MongoDB not available, template creation requires database')
      return NextResponse.json(
        { error: 'Database required for template creation' },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    )
  }
}