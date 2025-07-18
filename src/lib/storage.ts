import { Resume } from '@/types/resume'

// In-memory storage for development
let resumes: Resume[] = []
let nextId = 1

export const storage = {
  async create(resume: Resume): Promise<{ id: string }> {
    const id = nextId++
    const newResume = {
      ...resume,
      _id: id.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    resumes.push(newResume)
    return { id: id.toString() }
  },

  async findAll(): Promise<Resume[]> {
    return resumes
  },

  async findById(id: string): Promise<Resume | null> {
    return resumes.find(r => r._id === id) || null
  },

  async update(id: string, resume: Resume): Promise<boolean> {
    const index = resumes.findIndex(r => r._id === id)
    if (index === -1) return false
    
    resumes[index] = {
      ...resume,
      _id: id,
      updatedAt: new Date(),
    }
    return true
  },

  async delete(id: string): Promise<boolean> {
    const index = resumes.findIndex(r => r._id === id)
    if (index === -1) return false
    
    resumes.splice(index, 1)
    return true
  },
}