import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { donations } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // Validate userId
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
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const status = searchParams.get('status');

    // Build query
    let query = db
      .select()
      .from(donations)
      .where(eq(donations.donorId, userIdInt))
      .orderBy(desc(donations.createdAt))
      .limit(limit)
      .offset(offset);

    // Apply status filter if provided
    if (status) {
      query = db
        .select()
        .from(donations)
        .where(
          and(
            eq(donations.donorId, userIdInt),
            eq(donations.status, status)
          )
        )
        .orderBy(desc(donations.createdAt))
        .limit(limit)
        .offset(offset);
    }

    const results = await query;

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET donations by donor error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message
      },
      { status: 500 }
    );
  }
}