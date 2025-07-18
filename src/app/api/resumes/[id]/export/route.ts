import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '@/lib/db'
import { storage } from '@/lib/storage'
import { authOptions } from '@/lib/auth'
import { generateTemplateHTML, getTemplateById } from '@/lib/templates'
import puppeteer from 'puppeteer'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get resume data
    let resume
    try {
      const { db } = await connectToDatabase()
      resume = await db.collection('resumes').findOne({ 
        _id: params.id,
        userId: session.user.id 
      })
    } catch (mongoError) {
      console.warn('MongoDB not available, using in-memory storage')
      resume = await storage.findById(params.id)
    }

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    // Generate HTML for PDF using template system
    const templateId = resume.template || 'modern-professional'
    const template = getTemplateById(templateId)
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }
    
    const html = generateTemplateHTML(resume, template)
    
    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    })
    
    await browser.close()

    // Return PDF as response
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resume.title || 'resume'}.pdf"`
      }
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}

