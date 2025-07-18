import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '@/lib/db'
import { storage } from '@/lib/storage'
import { authOptions } from '@/lib/auth'
import { Resume } from '@/types/resume'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Try MongoDB first, fallback to in-memory storage
    try {
      const { db } = await connectToDatabase()
      const resumes = await db.collection('resumes').find({ 
        userId: session.user.id 
      }).toArray()
      return NextResponse.json({ resumes })
    } catch (mongoError) {
      console.warn('MongoDB not available, using in-memory storage')
      const resumes = await storage.findAll()
      return NextResponse.json({ resumes })
    }
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
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

    const resume: Resume = await request.json()
    
    // Try MongoDB first, fallback to in-memory storage
    try {
      const { db } = await connectToDatabase()
      const result = await db.collection('resumes').insertOne({
        ...resume,
        userId: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      
      return NextResponse.json({ 
        id: result.insertedId,
        message: 'Resume created successfully' 
      })
    } catch (mongoError) {
      console.warn('MongoDB not available, using in-memory storage')
      const result = await storage.create({
        ...resume,
        userId: session.user.id,
      })
      return NextResponse.json({ 
        id: result.id,
        message: 'Resume created successfully (in-memory)' 
      })
    }
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    )
  }
}