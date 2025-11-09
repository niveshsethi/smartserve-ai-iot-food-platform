import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { claims } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ALLOWED_STATUSES = ['pending', 'accepted', 'completed', 'cancelled'] as const;
type ClaimStatus = typeof ALLOWED_STATUSES[number];

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID is valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    const claimId = parseInt(id);

    // Parse request body
    const body = await request.json();
    const { status } = body;

    // Validate status is provided
    if (!status) {
      return NextResponse.json(
        { 
          error: 'Status is required',
          code: 'MISSING_STATUS'
        },
        { status: 400 }
      );
    }

    // Validate status is one of allowed values
    if (!ALLOWED_STATUSES.includes(status as ClaimStatus)) {
      return NextResponse.json(
        { 
          error: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS'
        },
        { status: 400 }
      );
    }

    // Check if claim exists
    const existingClaim = await db.select()
      .from(claims)
      .where(eq(claims.id, claimId))
      .limit(1);

    if (existingClaim.length === 0) {
      return NextResponse.json(
        { 
          error: 'Claim not found',
          code: 'CLAIM_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Update claim
    const updatedClaim = await db.update(claims)
      .set({
        status: status as ClaimStatus,
        updatedAt: new Date().toISOString()
      })
      .where(eq(claims.id, claimId))
      .returning();

    return NextResponse.json(updatedClaim[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}