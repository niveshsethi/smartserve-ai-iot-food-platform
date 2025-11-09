import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { claims } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // Validate userId is a valid integer
    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json(
        {
          error: 'Valid user ID is required',
          code: 'INVALID_USER_ID'
        },
        { status: 400 }
      );
    }

    const userIdInt = parseInt(userId);

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const status = searchParams.get('status');

    // Build query
    let query = db
      .select()
      .from(claims)
      .where(eq(claims.recipientId, userIdInt))
      .orderBy(desc(claims.claimedAt))
      .limit(limit)
      .offset(offset);

    // Add status filter if provided
    if (status) {
      query = db
        .select()
        .from(claims)
        .where(
          and(
            eq(claims.recipientId, userIdInt),
            eq(claims.status, status)
          )
        )
        .orderBy(desc(claims.claimedAt))
        .limit(limit)
        .offset(offset);
    }

    const results = await query;

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}