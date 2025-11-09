import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { claims } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donationId, recipientId } = body;

    // Validate required fields
    if (!donationId) {
      return NextResponse.json(
        { error: 'donationId is required', code: 'MISSING_DONATION_ID' },
        { status: 400 }
      );
    }

    if (!recipientId) {
      return NextResponse.json(
        { error: 'recipientId is required', code: 'MISSING_RECIPIENT_ID' },
        { status: 400 }
      );
    }

    // Validate field types
    if (isNaN(parseInt(donationId))) {
      return NextResponse.json(
        { error: 'donationId must be a valid integer', code: 'INVALID_DONATION_ID' },
        { status: 400 }
      );
    }

    if (isNaN(parseInt(recipientId))) {
      return NextResponse.json(
        { error: 'recipientId must be a valid integer', code: 'INVALID_RECIPIENT_ID' },
        { status: 400 }
      );
    }

    // Create claim with auto-generated fields
    const newClaim = await db.insert(claims)
      .values({
        donationId: parseInt(donationId),
        recipientId: parseInt(recipientId),
        claimedAt: new Date().toISOString(),
        status: 'pending'
      })
      .returning();

    return NextResponse.json(newClaim[0], { status: 201 });
  } catch (error) {
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
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Filter parameters
    const status = searchParams.get('status');
    const recipientId = searchParams.get('recipientId');

    // Build query with filters
    let query = db.select().from(claims);

    // Apply filters
    const filters = [];
    
    if (status) {
      filters.push(eq(claims.status, status));
    }
    
    if (recipientId) {
      const recipientIdNum = parseInt(recipientId);
      if (!isNaN(recipientIdNum)) {
        filters.push(eq(claims.recipientId, recipientIdNum));
      }
    }

    if (filters.length > 0) {
      query = query.where(and(...filters));
    }

    // Apply ordering and pagination
    const results = await query
      .orderBy(desc(claims.claimedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existing = await db.select()
      .from(claims)
      .where(eq(claims.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Claim not found', code: 'CLAIM_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { status: newStatus, donationId, recipientId } = body;

    // Build update object
    const updates: any = {};

    if (newStatus !== undefined) {
      // Validate status value
      const validStatuses = ['pending', 'accepted', 'completed', 'cancelled'];
      if (!validStatuses.includes(newStatus)) {
        return NextResponse.json(
          { error: 'Invalid status value. Must be one of: pending, accepted, completed, cancelled', code: 'INVALID_STATUS' },
          { status: 400 }
        );
      }
      updates.status = newStatus;
    }

    if (donationId !== undefined) {
      if (isNaN(parseInt(donationId))) {
        return NextResponse.json(
          { error: 'donationId must be a valid integer', code: 'INVALID_DONATION_ID' },
          { status: 400 }
        );
      }
      updates.donationId = parseInt(donationId);
    }

    if (recipientId !== undefined) {
      if (isNaN(parseInt(recipientId))) {
        return NextResponse.json(
          { error: 'recipientId must be a valid integer', code: 'INVALID_RECIPIENT_ID' },
          { status: 400 }
        );
      }
      updates.recipientId = parseInt(recipientId);
    }

    // Update the record
    const updated = await db.update(claims)
      .set(updates)
      .where(eq(claims.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existing = await db.select()
      .from(claims)
      .where(eq(claims.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Claim not found', code: 'CLAIM_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the record
    const deleted = await db.delete(claims)
      .where(eq(claims.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      { message: 'Claim deleted successfully', claim: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}