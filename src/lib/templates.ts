import { Template, TemplateStyle } from '@/types/template';
import { Resume } from '@/types/resume';

// Default template styles
export const defaultTemplates: Template[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean, modern design with blue accents perfect for tech and business professionals',
    category: 'Modern',
    style: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#3b82f6',
        text: '#1e293b',
        background: '#ffffff',
        border: '#e2e8f0'
      },
      fonts: {
        primary: 'Inter, sans-serif',
        secondary: 'Inter, sans-serif',
        headings: 'Inter, sans-serif'
      },
      spacing: {
        section: '24px',
        item: '16px',
        compact: '8px'
      },
      layout: {
        columns: 1,
        sidebar: false,
        headerStyle: 'centered'
      }
    },
    isPublic: true,
    isPremium: false,
    createdBy: 'system',
    downloads: 1250,
    rating: 4.8,
    tags: ['professional', 'modern', 'clean', 'blue'],
    preview: '/templates/modern-professional.png',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'classic-executive',
    name: 'Classic Executive',
    description: 'Traditional, elegant design with serif fonts ideal for executive and senior positions',
    category: 'Classic',
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
        primary: 'Georgia, serif',
        secondary: 'Georgia, serif',
        headings: 'Georgia, serif'
      },
      spacing: {
        section: '28px',
        item: '18px',
        compact: '10px'
      },
      layout: {
        columns: 1,
        sidebar: false,
        headerStyle: 'traditional'
      }
    },
    isPublic: true,
    isPremium: false,
    createdBy: 'system',
    downloads: 980,
    rating: 4.6,
    tags: ['classic', 'executive', 'traditional', 'serif'],
    preview: '/templates/classic-executive.png',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Vibrant, creative design with purple accents perfect for designers and creative professionals',
    category: 'Creative',
    style: {
      colors: {
        primary: '#7c3aed',
        secondary: '#a78bfa',
        accent: '#8b5cf6',
        text: '#1f2937',
        background: '#ffffff',
        border: '#e5e7eb'
      },
      fonts: {
        primary: 'Poppins, sans-serif',
        secondary: 'Poppins, sans-serif',
        headings: 'Poppins, sans-serif'
      },
      spacing: {
        section: '32px',
        item: '20px',
        compact: '12px'
      },
      layout: {
        columns: 2,
        sidebar: true,
        headerStyle: 'creative'
      }
    },
    isPublic: true,
    isPremium: false,
    createdBy: 'system',
    downloads: 750,
    rating: 4.7,
    tags: ['creative', 'portfolio', 'colorful', 'designer'],
    preview: '/templates/creative-portfolio.png',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    description: 'Ultra-clean, minimal design with subtle accents for a sophisticated look',
    category: 'Modern',
    style: {
      colors: {
        primary: '#000000',
        secondary: '#666666',
        accent: '#333333',
        text: '#000000',
        background: '#ffffff',
        border: '#e0e0e0'
      },
      fonts: {
        primary: 'Helvetica, Arial, sans-serif',
        secondary: 'Helvetica, Arial, sans-serif',
        headings: 'Helvetica, Arial, sans-serif'
      },
      spacing: {
        section: '36px',
        item: '14px',
        compact: '6px'
      },
      layout: {
        columns: 1,
        sidebar: false,
        headerStyle: 'minimal'
      }
    },
    isPublic: true,
    isPremium: true,
    createdBy: 'system',
    downloads: 420,
    rating: 4.9,
    tags: ['minimal', 'clean', 'black', 'sophisticated'],
    preview: '/templates/minimalist-clean.png',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Template rendering functions
export const generateTemplateHTML = (resume: Resume, template: Template): string => {
  const { style } = template;
  
  switch (template.id) {
    case 'modern-professional':
      return generateModernProfessionalHTML(resume, style);
    case 'classic-executive':
      return generateClassicExecutiveHTML(resume, style);
    case 'creative-portfolio':
      return generateCreativePortfolioHTML(resume, style);
    case 'minimalist-clean':
      return generateMinimalistCleanHTML(resume, style);
    default:
      return generateModernProfessionalHTML(resume, style);
  }
};

// Modern Professional Template
const generateModernProfessionalHTML = (resume: Resume, style: TemplateStyle): string => {
  const personalInfo = resume.sections.find(s => s.type === 'personal-information')?.data;
  const summary = resume.sections.find(s => s.type === 'professional-summary')?.data;
  const experience = resume.sections.find(s => s.type === 'work-experience')?.data;
  const education = resume.sections.find(s => s.type === 'education')?.data;
  const skills = resume.sections.find(s => s.type === 'skills')?.data;
  const projects = resume.sections.find(s => s.type === 'projects')?.data;
  const certifications = resume.sections.find(s => s.type === 'certifications')?.data;
  const languages = resume.sections.find(s => s.type === 'languages')?.data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo?.fullName || 'Resume'}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: ${style.fonts.primary};
          font-size: 11px;
          line-height: 1.4;
          color: ${style.colors.text};
          background: ${style.colors.background};
        }
        
        .container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20mm;
          background: ${style.colors.background};
        }
        
        .header {
          text-align: center;
          margin-bottom: ${style.spacing.section};
          padding-bottom: 20px;
          border-bottom: 2px solid ${style.colors.primary};
        }
        
        .name {
          font-size: 28px;
          font-weight: 700;
          color: ${style.colors.primary};
          margin-bottom: 8px;
          font-family: ${style.fonts.headings};
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          color: ${style.colors.secondary};
          font-size: 10px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .section {
          margin-bottom: ${style.spacing.section};
        }
        
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: ${style.colors.primary};
          margin-bottom: 12px;
          padding-bottom: 4px;
          border-bottom: 1px solid ${style.colors.border};
          font-family: ${style.fonts.headings};
        }
        
        .summary {
          font-size: 11px;
          line-height: 1.5;
          color: ${style.colors.text};
          text-align: justify;
        }
        
        .experience-item, .education-item, .project-item, .cert-item {
          margin-bottom: ${style.spacing.item};
          padding-bottom: 12px;
          border-bottom: 1px solid ${style.colors.border};
        }
        
        .experience-item:last-child, .education-item:last-child, .project-item:last-child, .cert-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
        }
        
        .item-title {
          font-size: 13px;
          font-weight: 600;
          color: ${style.colors.primary};
        }
        
        .item-company, .item-school {
          font-size: 11px;
          color: ${style.colors.secondary};
          font-weight: 500;
        }
        
        .item-date {
          font-size: 10px;
          color: ${style.colors.secondary};
          font-weight: 400;
        }
        
        .item-description {
          font-size: 10px;
          line-height: 1.4;
          color: ${style.colors.text};
          margin-top: 4px;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }
        
        .skill-category {
          background: ${style.colors.background};
          border: 1px solid ${style.colors.border};
          border-radius: 4px;
          padding: 8px;
        }
        
        .skill-category-title {
          font-size: 11px;
          font-weight: 600;
          color: ${style.colors.primary};
          margin-bottom: 4px;
        }
        
        .skill-list {
          font-size: 10px;
          color: ${style.colors.text};
          line-height: 1.3;
        }
        
        .languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 8px;
        }
        
        .language-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 8px;
          background: ${style.colors.background};
          border: 1px solid ${style.colors.border};
          border-radius: 4px;
        }
        
        .language-name {
          font-size: 10px;
          font-weight: 500;
          color: ${style.colors.text};
        }
        
        .language-level {
          font-size: 9px;
          color: ${style.colors.secondary};
        }
        
        @media print {
          .container {
            margin: 0;
            padding: 15mm;
          }
          
          body {
            font-size: 10px;
          }
          
          .name {
            font-size: 24px;
          }
          
          .section-title {
            font-size: 14px;
          }
          
          .item-title {
            font-size: 12px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${personalInfo ? `
          <div class="header">
            <h1 class="name">${personalInfo.fullName}</h1>
            <div class="contact-info">
              ${personalInfo.email ? `<div class="contact-item">📧 ${personalInfo.email}</div>` : ''}
              ${personalInfo.phone ? `<div class="contact-item">📞 ${personalInfo.phone}</div>` : ''}
              ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
              ${personalInfo.website ? `<div class="contact-item">🌐 ${personalInfo.website}</div>` : ''}
              ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
            </div>
          </div>
        ` : ''}
        
        ${summary?.summary ? `
          <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <div class="summary">${summary.summary}</div>
          </div>
        ` : ''}
        
        ${experience?.experiences?.length ? `
          <div class="section">
            <h2 class="section-title">Work Experience</h2>
            ${experience.experiences.map((exp: any) => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company}</div>
                  </div>
                  <div class="item-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                </div>
                ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${education?.education?.length ? `
          <div class="section">
            <h2 class="section-title">Education</h2>
            ${education.education.map((edu: any) => `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-school">${edu.school}</div>
                  </div>
                  <div class="item-date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
                </div>
                ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${skills?.skillCategories?.length ? `
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
              ${skills.skillCategories.map((category: any) => `
                <div class="skill-category">
                  <div class="skill-category-title">${category.category}</div>
                  <div class="skill-list">${category.skills.join(', ')}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        ${projects?.projects?.length ? `
          <div class="section">
            <h2 class="section-title">Projects</h2>
            ${projects.projects.map((project: any) => `
              <div class="project-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${project.name}</div>
                    ${project.technologies ? `<div class="item-company">${project.technologies}</div>` : ''}
                  </div>
                  ${project.date ? `<div class="item-date">${project.date}</div>` : ''}
                </div>
                ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${certifications?.certifications?.length ? `
          <div class="section">
            <h2 class="section-title">Certifications</h2>
            ${certifications.certifications.map((cert: any) => `
              <div class="cert-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${cert.name}</div>
                    <div class="item-company">${cert.issuer}</div>
                  </div>
                  <div class="item-date">${cert.date}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${languages?.languages?.length ? `
          <div class="section">
            <h2 class="section-title">Languages</h2>
            <div class="languages-grid">
              ${languages.languages.map((lang: any) => `
                <div class="language-item">
                  <span class="language-name">${lang.language}</span>
                  <span class="language-level">${lang.proficiency}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
};

// Classic Executive Template
const generateClassicExecutiveHTML = (resume: Resume, style: TemplateStyle): string => {
  const personalInfo = resume.sections.find(s => s.type === 'personal-information')?.data;
  const summary = resume.sections.find(s => s.type === 'professional-summary')?.data;
  const experience = resume.sections.find(s => s.type === 'work-experience')?.data;
  const education = resume.sections.find(s => s.type === 'education')?.data;
  const skills = resume.sections.find(s => s.type === 'skills')?.data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo?.fullName || 'Resume'}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: ${style.fonts.primary};
          font-size: 12px;
          line-height: 1.5;
          color: ${style.colors.text};
          background: ${style.colors.background};
        }
        
        .container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 25mm;
          background: ${style.colors.background};
        }
        
        .header {
          text-align: center;
          margin-bottom: ${style.spacing.section};
          padding-bottom: 20px;
          border-bottom: 3px double ${style.colors.primary};
        }
        
        .name {
          font-size: 32px;
          font-weight: 400;
          color: ${style.colors.primary};
          margin-bottom: 12px;
          font-family: ${style.fonts.headings};
          letter-spacing: 1px;
        }
        
        .contact-info {
          color: ${style.colors.secondary};
          font-size: 11px;
          line-height: 1.4;
        }
        
        .section {
          margin-bottom: ${style.spacing.section};
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 400;
          color: ${style.colors.primary};
          margin-bottom: 16px;
          padding-bottom: 6px;
          border-bottom: 2px solid ${style.colors.primary};
          font-family: ${style.fonts.headings};
          letter-spacing: 0.5px;
        }
        
        .summary {
          font-size: 12px;
          line-height: 1.6;
          color: ${style.colors.text};
          text-align: justify;
          font-style: italic;
        }
        
        .experience-item, .education-item {
          margin-bottom: ${style.spacing.item};
          padding-bottom: 16px;
        }
        
        .item-header {
          margin-bottom: 8px;
        }
        
        .item-title {
          font-size: 14px;
          font-weight: 600;
          color: ${style.colors.primary};
          margin-bottom: 4px;
        }
        
        .item-company, .item-school {
          font-size: 12px;
          color: ${style.colors.secondary};
          font-weight: 500;
          font-style: italic;
        }
        
        .item-date {
          font-size: 11px;
          color: ${style.colors.secondary};
          float: right;
          margin-top: -20px;
        }
        
        .item-description {
          font-size: 11px;
          line-height: 1.5;
          color: ${style.colors.text};
          margin-top: 8px;
          text-align: justify;
        }
        
        .skills-list {
          font-size: 11px;
          line-height: 1.6;
          color: ${style.colors.text};
        }
        
        @media print {
          .container {
            margin: 0;
            padding: 20mm;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${personalInfo ? `
          <div class="header">
            <h1 class="name">${personalInfo.fullName}</h1>
            <div class="contact-info">
              ${personalInfo.email || ''} ${personalInfo.phone ? '• ' + personalInfo.phone : ''}<br>
              ${personalInfo.location || ''} ${personalInfo.website ? '• ' + personalInfo.website : ''}
            </div>
          </div>
        ` : ''}
        
        ${summary?.summary ? `
          <div class="section">
            <h2 class="section-title">Executive Summary</h2>
            <div class="summary">${summary.summary}</div>
          </div>
        ` : ''}
        
        ${experience?.experiences?.length ? `
          <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${experience.experiences.map((exp: any) => `
              <div class="experience-item">
                <div class="item-header">
                  <div class="item-title">${exp.position}</div>
                  <div class="item-company">${exp.company}</div>
                  <div class="item-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                </div>
                ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${education?.education?.length ? `
          <div class="section">
            <h2 class="section-title">Education</h2>
            ${education.education.map((edu: any) => `
              <div class="education-item">
                <div class="item-header">
                  <div class="item-title">${edu.degree}</div>
                  <div class="item-school">${edu.school}</div>
                  <div class="item-date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
                </div>
                ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${skills?.skillCategories?.length ? `
          <div class="section">
            <h2 class="section-title">Core Competencies</h2>
            <div class="skills-list">
              ${skills.skillCategories.map((category: any) => `
                <strong>${category.category}:</strong> ${category.skills.join(', ')}<br>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
};

// Creative Portfolio Template
const generateCreativePortfolioHTML = (resume: Resume, style: TemplateStyle): string => {
  const personalInfo = resume.sections.find(s => s.type === 'personal-information')?.data;
  const summary = resume.sections.find(s => s.type === 'professional-summary')?.data;
  const experience = resume.sections.find(s => s.type === 'work-experience')?.data;
  const education = resume.sections.find(s => s.type === 'education')?.data;
  const skills = resume.sections.find(s => s.type === 'skills')?.data;
  const projects = resume.sections.find(s => s.type === 'projects')?.data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo?.fullName || 'Resume'}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: ${style.fonts.primary};
          font-size: 11px;
          line-height: 1.4;
          color: ${style.colors.text};
          background: ${style.colors.background};
        }
        
        .container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20mm;
          background: ${style.colors.background};
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
        }
        
        .sidebar {
          background: linear-gradient(135deg, ${style.colors.primary}15, ${style.colors.accent}15);
          padding: 20px;
          border-radius: 10px;
          border-left: 4px solid ${style.colors.primary};
        }
        
        .main-content {
          padding: 10px;
        }
        
        .header {
          text-align: left;
          margin-bottom: 30px;
        }
        
        .name {
          font-size: 26px;
          font-weight: 700;
          color: ${style.colors.primary};
          margin-bottom: 8px;
          font-family: ${style.fonts.headings};
        }
        
        .contact-info {
          color: ${style.colors.secondary};
          font-size: 10px;
          line-height: 1.6;
        }
        
        .section {
          margin-bottom: 25px;
        }
        
        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: ${style.colors.primary};
          margin-bottom: 12px;
          padding: 8px 12px;
          background: linear-gradient(90deg, ${style.colors.primary}20, transparent);
          border-left: 3px solid ${style.colors.primary};
          font-family: ${style.fonts.headings};
        }
        
        .sidebar .section-title {
          font-size: 12px;
          background: ${style.colors.primary}30;
          border-radius: 6px;
          border-left: none;
        }
        
        .summary {
          font-size: 11px;
          line-height: 1.5;
          color: ${style.colors.text};
          text-align: justify;
        }
        
        .experience-item, .education-item, .project-item {
          margin-bottom: 16px;
          padding: 12px;
          background: ${style.colors.background};
          border-radius: 6px;
          border-left: 3px solid ${style.colors.accent};
        }
        
        .item-title {
          font-size: 12px;
          font-weight: 600;
          color: ${style.colors.primary};
          margin-bottom: 4px;
        }
        
        .item-company, .item-school {
          font-size: 10px;
          color: ${style.colors.secondary};
          font-weight: 500;
          margin-bottom: 2px;
        }
        
        .item-date {
          font-size: 9px;
          color: ${style.colors.secondary};
          background: ${style.colors.primary}20;
          padding: 2px 6px;
          border-radius: 3px;
          display: inline-block;
          margin-bottom: 6px;
        }
        
        .item-description {
          font-size: 10px;
          line-height: 1.4;
          color: ${style.colors.text};
        }
        
        .skills-grid {
          display: grid;
          gap: 8px;
        }
        
        .skill-category {
          background: ${style.colors.primary}10;
          border-radius: 6px;
          padding: 8px;
          border: 1px solid ${style.colors.primary}30;
        }
        
        .skill-category-title {
          font-size: 10px;
          font-weight: 600;
          color: ${style.colors.primary};
          margin-bottom: 4px;
        }
        
        .skill-list {
          font-size: 9px;
          color: ${style.colors.text};
          line-height: 1.3;
        }
        
        @media print {
          .container {
            margin: 0;
            padding: 15mm;
            gap: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="sidebar">
          ${personalInfo ? `
            <div class="header">
              <h1 class="name">${personalInfo.fullName}</h1>
              <div class="contact-info">
                ${personalInfo.email ? `📧 ${personalInfo.email}<br>` : ''}
                ${personalInfo.phone ? `📞 ${personalInfo.phone}<br>` : ''}
                ${personalInfo.location ? `📍 ${personalInfo.location}<br>` : ''}
                ${personalInfo.website ? `🌐 ${personalInfo.website}<br>` : ''}
              </div>
            </div>
          ` : ''}
          
          ${skills?.skillCategories?.length ? `
            <div class="section">
              <h2 class="section-title">Skills</h2>
              <div class="skills-grid">
                ${skills.skillCategories.map((category: any) => `
                  <div class="skill-category">
                    <div class="skill-category-title">${category.category}</div>
                    <div class="skill-list">${category.skills.join(', ')}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${education?.education?.length ? `
            <div class="section">
              <h2 class="section-title">Education</h2>
              ${education.education.map((edu: any) => `
                <div class="education-item">
                  <div class="item-title">${edu.degree}</div>
                  <div class="item-school">${edu.school}</div>
                  <div class="item-date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
        
        <div class="main-content">
          ${summary?.summary ? `
            <div class="section">
              <h2 class="section-title">Creative Summary</h2>
              <div class="summary">${summary.summary}</div>
            </div>
          ` : ''}
          
          ${experience?.experiences?.length ? `
            <div class="section">
              <h2 class="section-title">Experience</h2>
              ${experience.experiences.map((exp: any) => `
                <div class="experience-item">
                  <div class="item-title">${exp.position}</div>
                  <div class="item-company">${exp.company}</div>
                  <div class="item-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                  ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${projects?.projects?.length ? `
            <div class="section">
              <h2 class="section-title">Featured Projects</h2>
              ${projects.projects.map((project: any) => `
                <div class="project-item">
                  <div class="item-title">${project.name}</div>
                  ${project.technologies ? `<div class="item-company">${project.technologies}</div>` : ''}
                  ${project.date ? `<div class="item-date">${project.date}</div>` : ''}
                  ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
};

// Minimalist Clean Template
const generateMinimalistCleanHTML = (resume: Resume, style: TemplateStyle): string => {
  const personalInfo = resume.sections.find(s => s.type === 'personal-information')?.data;
  const summary = resume.sections.find(s => s.type === 'professional-summary')?.data;
  const experience = resume.sections.find(s => s.type === 'work-experience')?.data;
  const education = resume.sections.find(s => s.type === 'education')?.data;
  const skills = resume.sections.find(s => s.type === 'skills')?.data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo?.fullName || 'Resume'}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: ${style.fonts.primary};
          font-size: 11px;
          line-height: 1.6;
          color: ${style.colors.text};
          background: ${style.colors.background};
        }
        
        .container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 30mm;
          background: ${style.colors.background};
        }
        
        .header {
          margin-bottom: 40px;
        }
        
        .name {
          font-size: 24px;
          font-weight: 300;
          color: ${style.colors.primary};
          margin-bottom: 10px;
          font-family: ${style.fonts.headings};
          letter-spacing: 2px;
        }
        
        .contact-info {
          color: ${style.colors.secondary};
          font-size: 10px;
          font-weight: 300;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section-title {
          font-size: 12px;
          font-weight: 400;
          color: ${style.colors.primary};
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: ${style.fonts.headings};
        }
        
        .summary {
          font-size: 11px;
          line-height: 1.7;
          color: ${style.colors.text};
          font-weight: 300;
        }
        
        .experience-item, .education-item {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid ${style.colors.border};
        }
        
        .experience-item:last-child, .education-item:last-child {
          border-bottom: none;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 5px;
        }
        
        .item-title {
          font-size: 12px;
          font-weight: 400;
          color: ${style.colors.primary};
        }
        
        .item-company, .item-school {
          font-size: 10px;
          color: ${style.colors.secondary};
          font-weight: 300;
        }
        
        .item-date {
          font-size: 9px;
          color: ${style.colors.secondary};
          font-weight: 300;
        }
        
        .item-description {
          font-size: 10px;
          line-height: 1.6;
          color: ${style.colors.text};
          font-weight: 300;
          margin-top: 8px;
        }
        
        .skills-list {
          font-size: 10px;
          line-height: 1.8;
          color: ${style.colors.text};
          font-weight: 300;
        }
        
        @media print {
          .container {
            margin: 0;
            padding: 25mm;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${personalInfo ? `
          <div class="header">
            <h1 class="name">${personalInfo.fullName}</h1>
            <div class="contact-info">
              ${personalInfo.email || ''} ${personalInfo.phone ? ' / ' + personalInfo.phone : ''} ${personalInfo.location ? ' / ' + personalInfo.location : ''}
            </div>
          </div>
        ` : ''}
        
        ${summary?.summary ? `
          <div class="section">
            <h2 class="section-title">Summary</h2>
            <div class="summary">${summary.summary}</div>
          </div>
        ` : ''}
        
        ${experience?.experiences?.length ? `
          <div class="section">
            <h2 class="section-title">Experience</h2>
            ${experience.experiences.map((exp: any) => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company}</div>
                  </div>
                  <div class="item-date">${exp.startDate} — ${exp.endDate || 'Present'}</div>
                </div>
                ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${education?.education?.length ? `
          <div class="section">
            <h2 class="section-title">Education</h2>
            ${education.education.map((edu: any) => `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-school">${edu.school}</div>
                  </div>
                  <div class="item-date">${edu.startDate} — ${edu.endDate || 'Present'}</div>
                </div>
                ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${skills?.skillCategories?.length ? `
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-list">
              ${skills.skillCategories.map((category: any) => `
                ${category.category}: ${category.skills.join(', ')}<br>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
};

// Template utility functions
export const getTemplateById = (id: string): Template | undefined => {
  return defaultTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return defaultTemplates.filter(template => template.category === category);
};

export const getAllTemplates = (): Template[] => {
  return defaultTemplates;
};

export const getPublicTemplates = (): Template[] => {
  return defaultTemplates.filter(template => template.isPublic);
};

export const getPremiumTemplates = (): Template[] => {
  return defaultTemplates.filter(template => template.isPremium);
};

export const getFreeTemplates = (): Template[] => {
  return defaultTemplates.filter(template => !template.isPremium);
};