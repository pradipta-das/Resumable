import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db'
import { storage } from '@/lib/storage'
import { Resume } from '@/types/resume'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try MongoDB first, fallback to in-memory storage
    try {
      const { db } = await connectToDatabase()
      const resume = await db.collection('resumes').findOne({ 
        _id: new ObjectId(params.id) 
      })
      
      if (!resume) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ resume })
    } catch (mongoError) {
      console.warn('MongoDB not available, using in-memory storage')
      const resume = await storage.findById(params.id)
      
      if (!resume) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ resume })
    }
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resume: Resume = await request.json()
    
    // Try MongoDB first, fallback to in-memory storage
    try {
      const { db } = await connectToDatabase()
      const result = await db.collection('resumes').updateOne(
        { _id: new ObjectId(params.id) },
        { 
          $set: {
            ...resume,
            updatedAt: new Date(),
          }
        }
      )
      
      if (result.matchedCount === 0) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ 
        message: 'Resume updated successfully' 
      })
    } catch (mongoError) {
      console.warn('MongoDB not available, using in-memory storage')
      const success = await storage.update(params.id, resume)
      
      if (!success) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ 
        message: 'Resume updated successfully (in-memory)' 
      })
    }
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try MongoDB first, fallback to in-memory storage
    try {
      const { db } = await connectToDatabase()
      const result = await db.collection('resumes').deleteOne({ 
        _id: new ObjectId(params.id) 
      })
      
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ 
        message: 'Resume deleted successfully' 
      })
    } catch (mongoError) {
      console.warn('MongoDB not available, using in-memory storage')
      const success = await storage.delete(params.id)
      
      if (!success) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ 
        message: 'Resume deleted successfully (in-memory)' 
      })
    }
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}