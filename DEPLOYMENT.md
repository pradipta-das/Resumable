# Deployment Guide

## Development Setup

The application is now ready for development and includes fallback storage for when MongoDB is not available.

### Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your MongoDB connection string (optional for development)

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Features Available

✅ **Drag & Drop Interface**: Fully functional drag-and-drop for reordering sections
✅ **Resume Sections**: All 8 resume sections (Personal, Summary, Experience, Education, Skills, Projects, Certifications, Languages)
✅ **Real-time Editing**: Edit resume content with instant updates
✅ **API Integration**: Save and load resumes (with fallback storage)
✅ **Responsive Design**: Works on desktop and mobile
✅ **TypeScript**: Full type safety
✅ **Modern UI**: Clean interface with Tailwind CSS

### Storage Options

1. **MongoDB (Production)**: Set `MONGODB_URI` in environment variables
2. **In-Memory (Development)**: Automatic fallback when MongoDB is unavailable

### API Endpoints

- `POST /api/resumes` - Create a new resume
- `GET /api/resumes` - Get all resumes
- `GET /api/resumes/[id]` - Get specific resume
- `PUT /api/resumes/[id]` - Update resume
- `DELETE /api/resumes/[id]` - Delete resume

### Production Deployment

1. **MongoDB Setup**: Ensure MongoDB is running and accessible
2. **Environment Variables**: Set production environment variables
3. **Build Application**: `npm run build`
4. **Start Production Server**: `npm start`

### Docker Deployment (Optional)

You can also deploy using Docker:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Database Schema

The application uses a flexible schema stored in `src/config/resume-schema.json`. You can customize:
- Available sections
- Field types and validation
- Resume templates

### Testing the Application

1. **Add Sections**: Click sections in the left panel to add them
2. **Edit Content**: Click on any section to expand and edit
3. **Drag to Reorder**: Use the drag handle to reorder sections
4. **Save Resume**: Click "Save Resume" to persist changes
5. **Remove Sections**: Drag sections to the left panel or use the trash button

### Troubleshooting

- **MongoDB Connection Issues**: The app will automatically use in-memory storage
- **Port Conflicts**: Change the port in `package.json` scripts if needed
- **Build Errors**: Ensure all dependencies are installed with `npm install`

### Next Steps

- Add PDF export functionality
- Implement user authentication
- Add more resume templates
- Add import/export features
- Add resume sharing capabilities