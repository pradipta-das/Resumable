import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '@/lib/db'
import { storage } from '@/lib/storage'
import { authOptions } from '@/lib/auth'
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

    // Generate HTML for PDF
    const html = generateResumeHTML(resume)
    
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

function generateResumeHTML(resume: any): string {
  const sections = resume.sections || []
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${resume.title || 'Resume'}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        
        .resume-container {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.5in;
        }
        
        .section {
          margin-bottom: 1.5rem;
          break-inside: avoid;
        }
        
        .section-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #2563eb;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 0.25rem;
          margin-bottom: 0.75rem;
        }
        
        .personal-info {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .personal-info h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
          color: #64748b;
        }
        
        .experience-item,
        .education-item,
        .project-item {
          margin-bottom: 1rem;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.25rem;
        }
        
        .item-title {
          font-weight: bold;
          color: #1e293b;
        }
        
        .item-subtitle {
          color: #64748b;
          font-style: italic;
        }
        
        .item-date {
          color: #64748b;
          font-size: 0.9rem;
        }
        
        .item-description {
          margin-top: 0.5rem;
          color: #374151;
        }
        
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .skill-category {
          margin-bottom: 0.5rem;
        }
        
        .skill-category-title {
          font-weight: bold;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        
        .skill-list {
          color: #374151;
          font-size: 0.9rem;
        }
        
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="resume-container">
        ${generateSectionsHTML(sections)}
      </div>
    </body>
    </html>
  `
}

function generateSectionsHTML(sections: any[]): string {
  return sections.map(section => {
    switch (section.sectionId) {
      case 'personal':
        return generatePersonalHTML(section.data)
      case 'summary':
        return generateSummaryHTML(section.data)
      case 'experience':
        return generateExperienceHTML(section.data)
      case 'education':
        return generateEducationHTML(section.data)
      case 'skills':
        return generateSkillsHTML(section.data)
      case 'projects':
        return generateProjectsHTML(section.data)
      case 'certifications':
        return generateCertificationsHTML(section.data)
      case 'languages':
        return generateLanguagesHTML(section.data)
      default:
        return ''
    }
  }).join('')
}

function generatePersonalHTML(data: any): string {
  const contactInfo = [
    data.email && `<span>📧 ${data.email}</span>`,
    data.phone && `<span>📞 ${data.phone}</span>`,
    data.location && `<span>📍 ${data.location}</span>`,
    data.website && `<span>🌐 ${data.website}</span>`,
    data.linkedin && `<span>💼 ${data.linkedin}</span>`
  ].filter(Boolean).join('')

  return `
    <div class="personal-info">
      <h1>${data.fullName || 'Your Name'}</h1>
      <div class="contact-info">
        ${contactInfo}
      </div>
    </div>
  `
}

function generateSummaryHTML(data: any): string {
  if (!data.content) return ''
  
  return `
    <div class="section">
      <h2 class="section-title">Professional Summary</h2>
      <p>${data.content}</p>
    </div>
  `
}

function generateExperienceHTML(data: any): string {
  const company = data.company || 'Company Name'
  const position = data.position || 'Position'
  const startDate = data.startDate ? new Date(data.startDate).toLocaleDateString() : ''
  const endDate = data.current ? 'Present' : (data.endDate ? new Date(data.endDate).toLocaleDateString() : '')
  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : ''
  
  return `
    <div class="section">
      <h2 class="section-title">Work Experience</h2>
      <div class="experience-item">
        <div class="item-header">
          <div>
            <div class="item-title">${position}</div>
            <div class="item-subtitle">${company}${data.location ? ` • ${data.location}` : ''}</div>
          </div>
          <div class="item-date">${dateRange}</div>
        </div>
        ${data.description ? `<div class="item-description">${data.description}</div>` : ''}
      </div>
    </div>
  `
}

function generateEducationHTML(data: any): string {
  const institution = data.institution || 'Institution'
  const degree = data.degree || 'Degree'
  const field = data.field || ''
  const startDate = data.startDate ? new Date(data.startDate).toLocaleDateString() : ''
  const endDate = data.endDate ? new Date(data.endDate).toLocaleDateString() : ''
  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : ''
  
  return `
    <div class="section">
      <h2 class="section-title">Education</h2>
      <div class="education-item">
        <div class="item-header">
          <div>
            <div class="item-title">${degree}${field ? ` in ${field}` : ''}</div>
            <div class="item-subtitle">${institution}</div>
          </div>
          <div class="item-date">${dateRange}</div>
        </div>
        ${data.gpa ? `<div class="item-description">GPA: ${data.gpa}</div>` : ''}
        ${data.description ? `<div class="item-description">${data.description}</div>` : ''}
      </div>
    </div>
  `
}

function generateSkillsHTML(data: any): string {
  if (!data.categories || !Array.isArray(data.categories)) return ''
  
  const skillsHTML = data.categories.map((cat: any) => `
    <div class="skill-category">
      <div class="skill-category-title">${cat.category || 'Skills'}</div>
      <div class="skill-list">${cat.skills || ''}</div>
    </div>
  `).join('')
  
  return `
    <div class="section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-container">
        ${skillsHTML}
      </div>
    </div>
  `
}

function generateProjectsHTML(data: any): string {
  const name = data.name || 'Project Name'
  const technologies = data.technologies || ''
  const startDate = data.startDate ? new Date(data.startDate).toLocaleDateString() : ''
  const endDate = data.endDate ? new Date(data.endDate).toLocaleDateString() : ''
  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : ''
  
  return `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      <div class="project-item">
        <div class="item-header">
          <div>
            <div class="item-title">${name}</div>
            ${technologies ? `<div class="item-subtitle">${technologies}</div>` : ''}
          </div>
          <div class="item-date">${dateRange}</div>
        </div>
        ${data.description ? `<div class="item-description">${data.description}</div>` : ''}
        ${data.url ? `<div class="item-description">URL: ${data.url}</div>` : ''}
      </div>
    </div>
  `
}

function generateCertificationsHTML(data: any): string {
  const name = data.name || 'Certification'
  const issuer = data.issuer || 'Issuer'
  const date = data.date ? new Date(data.date).toLocaleDateString() : ''
  const expiryDate = data.expiryDate ? new Date(data.expiryDate).toLocaleDateString() : ''
  
  return `
    <div class="section">
      <h2 class="section-title">Certifications</h2>
      <div class="experience-item">
        <div class="item-header">
          <div>
            <div class="item-title">${name}</div>
            <div class="item-subtitle">${issuer}</div>
          </div>
          <div class="item-date">${date}${expiryDate ? ` - ${expiryDate}` : ''}</div>
        </div>
        ${data.credentialId ? `<div class="item-description">Credential ID: ${data.credentialId}</div>` : ''}
        ${data.url ? `<div class="item-description">URL: ${data.url}</div>` : ''}
      </div>
    </div>
  `
}

function generateLanguagesHTML(data: any): string {
  if (!data.languages || !Array.isArray(data.languages)) return ''
  
  const languagesHTML = data.languages.map((lang: any) => `
    <div class="skill-category">
      <div class="skill-category-title">${lang.language || 'Language'}</div>
      <div class="skill-list">${lang.proficiency || ''}</div>
    </div>
  `).join('')
  
  return `
    <div class="section">
      <h2 class="section-title">Languages</h2>
      <div class="skills-container">
        ${languagesHTML}
      </div>
    </div>
  `
}