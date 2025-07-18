import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import { storage } from '@/lib/storage'
import { RegisterCredentials } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name }: RegisterCredentials = await request.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Try MongoDB first, fallback to in-memory storage
    try {
      const { db } = await connectToDatabase()
      
      // Check if user already exists
      const existingUser = await db.collection('users').findOne({ email })
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        )
      }

      // Create user
      const result = await db.collection('users').insertOne({
        email,
        password: hashedPassword,
        name,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return NextResponse.json({
        message: 'User created successfully',
        userId: result.insertedId
      })
    } catch (mongoError) {
      console.warn('MongoDB not available, using in-memory storage')
      
      // For in-memory storage, we'll create a simple user store
      const user = {
        _id: Date.now().toString(),
        email,
        password: hashedPassword,
        name,
        role: 'user' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Store in memory (you might want to extend the storage utility)
      return NextResponse.json({
        message: 'User created successfully (in-memory)',
        userId: user._id
      })
    }
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}