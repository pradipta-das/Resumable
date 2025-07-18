# Resumable - Resume Builder Application

A modern, drag-and-drop resume builder built with Next.js, TypeScript, and MongoDB.

## Features

- **Drag & Drop Interface**: Easily reorder resume sections with intuitive drag-and-drop functionality
- **Configurable Sections**: JSON-based schema system for defining available resume sections
- **Real-time Editing**: Edit resume content with instant preview updates
- **Multiple Templates**: Support for different resume templates (Modern, Classic, Creative)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Persistence**: Save and load resumes using MongoDB
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional interface built with Tailwind CSS

## Available Resume Sections

- **Personal Information** (Required): Name, email, phone, location, website, LinkedIn
- **Professional Summary**: Brief overview of your professional background
- **Work Experience**: Job history with company, position, dates, and descriptions
- **Education**: Academic background with institutions, degrees, and dates
- **Skills**: Categorized technical and soft skills
- **Projects**: Personal and professional projects with descriptions
- **Certifications**: Professional certifications and credentials
- **Languages**: Language proficiency levels

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Drag & Drop**: @dnd-kit/core for smooth drag-and-drop interactions
- **Database**: MongoDB with native MongoDB driver
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/resumable.git
cd resumable
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/resumable
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Resume

1. **Start with Personal Information**: The personal information section is required and added by default
2. **Add Sections**: Click on sections in the left panel to add them to your resume
3. **Fill in Details**: Click on any section to expand and edit its content
4. **Reorder Sections**: Drag sections by their handle to reorder them
5. **Duplicate Sections**: Use the copy button on repeatable sections (like Work Experience)
6. **Remove Sections**: Use the trash button to remove non-required sections
7. **Save Your Resume**: Click the "Save Resume" button to persist your changes

### Drag & Drop Features

- **Reorder Sections**: Drag sections up and down to change their order
- **Remove Sections**: Drag sections to the "Available Sections" panel to remove them
- **Visual Feedback**: Sections show visual feedback during drag operations

### Editing Content

- **Text Fields**: Click to edit text inputs directly
- **Dates**: Use date pickers for consistent date formatting
- **Checkboxes**: Toggle options like "Currently Working Here"
- **Textareas**: Multi-line text areas for descriptions and summaries

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   └── resumes/       # Resume CRUD operations
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AvailableSections.tsx
│   ├── FormField.tsx
│   ├── Icon.tsx
│   ├── ResumeBuilder.tsx
│   └── ResumeSection.tsx
├── config/               # Configuration files
│   └── resume-schema.json # Resume sections schema
├── lib/                  # Utility functions
│   ├── db.ts            # Database connection
│   ├── mongodb.ts       # MongoDB client
│   ├── models/          # Data models
│   ├── schema.ts        # Schema utilities
│   └── utils.ts         # General utilities
└── types/               # TypeScript type definitions
    └── resume.ts
```

## Schema Configuration

The resume sections are defined in `src/config/resume-schema.json`. You can customize:

- **Section Types**: Add new section types with custom fields
- **Field Types**: Support for text, email, date, textarea, checkbox, select, and array fields
- **Validation**: Required fields and validation rules
- **Templates**: Define different resume templates

### Adding a New Section

1. Add the section definition to `resume-schema.json`
2. Add the corresponding icon to the `Icon` component
3. The section will automatically appear in the available sections panel

## API Endpoints

- `GET /api/resumes` - Fetch all resumes
- `POST /api/resumes` - Create a new resume
- `GET /api/resumes/[id]` - Fetch a specific resume
- `PUT /api/resumes/[id]` - Update a resume
- `DELETE /api/resumes/[id]` - Delete a resume

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## Future Enhancements

- **PDF Export**: Generate PDF versions of resumes
- **Template Customization**: Visual template editor
- **User Authentication**: User accounts and resume management
- **Resume Templates**: More template options
- **Import/Export**: Import from LinkedIn, export to various formats
- **Collaboration**: Share and collaborate on resumes
- **Analytics**: Track resume views and downloads

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.