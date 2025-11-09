import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { partnerships } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationName, contactName, email, phone, city, partnershipType, message } = body;

    // Validate required fields
    if (!organizationName || !organizationName.trim()) {
      return NextResponse.json(
        { error: 'Organization name is required', code: 'MISSING_ORGANIZATION_NAME' },
        { status: 400 }
      );
    }

    if (!contactName || !contactName.trim()) {
      return NextResponse.json(
        { error: 'Contact name is required', code: 'MISSING_CONTACT_NAME' },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    if (!city || !city.trim()) {
      return NextResponse.json(
        { error: 'City is required', code: 'MISSING_CITY' },
        { status: 400 }
      );
    }

    if (!partnershipType || !partnershipType.trim()) {
      return NextResponse.json(
        { error: 'Partnership type is required', code: 'MISSING_PARTNERSHIP_TYPE' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format', code: 'INVALID_EMAIL_FORMAT' },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const insertData: any = {
      organizationName: organizationName.trim(),
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      city: city.trim(),
      partnershipType: partnershipType.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Add optional fields if provided
    if (phone && phone.trim()) {
      insertData.phone = phone.trim();
    }

    if (message && message.trim()) {
      insertData.message = message.trim();
    }

    // Insert partnership application
    const newPartnership = await db.insert(partnerships)
      .values(insertData)
      .returning();

    return NextResponse.json(newPartnership[0], { status: 201 });

  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Filtering by status
    const statusFilter = searchParams.get('status');

    let query = db.select().from(partnerships);

    // Apply status filter if provided
    if (statusFilter) {
      const validStatuses = ['pending', 'approved', 'rejected'];
      if (validStatuses.includes(statusFilter)) {
        query = query.where(eq(partnerships.status, statusFilter));
      }
    }

    // Order by createdAt DESC and apply pagination
    const results = await query
      .orderBy(desc(partnerships.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}