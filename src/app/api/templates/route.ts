import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Template } from '@/types/template';
import { 
  getAllTemplates, 
  getTemplatesByCategory, 
  getFreeTemplates, 
  getPremiumTemplates,
  getPublicTemplates 
} from '@/lib/templates';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isPremium = searchParams.get('premium') === 'true';
    const isFree = searchParams.get('free') === 'true';
    const isPublic = searchParams.get('public') === 'true';
    
    let templates: Template[] = [];
    
    // Get templates based on filters
    if (category) {
      templates = getTemplatesByCategory(category);
    } else if (isPremium) {
      templates = getPremiumTemplates();
    } else if (isFree) {
      templates = getFreeTemplates();
    } else if (isPublic) {
      templates = getPublicTemplates();
    } else {
      templates = getAllTemplates();
    }
    
    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user is admin for creating templates
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const templateData = await request.json();
    
    // For now, return a success message since we're using static templates
    // In a real implementation, this would save to database
    return NextResponse.json(
      { message: 'Template creation not implemented in static mode' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user is admin for updating templates
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const templateData = await request.json();
    
    // For now, return a success message since we're using static templates
    // In a real implementation, this would update in database
    return NextResponse.json(
      { message: 'Template update not implemented in static mode' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user is admin for deleting templates
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get('id');
    
    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID required' },
        { status: 400 }
      );
    }
    
    // For now, return a success message since we're using static templates
    // In a real implementation, this would delete from database
    return NextResponse.json(
      { message: 'Template deletion not implemented in static mode' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}