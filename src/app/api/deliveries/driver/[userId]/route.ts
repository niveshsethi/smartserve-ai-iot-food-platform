import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { deliveries } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const { searchParams } = new URL(request.url);

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

    const driverId = parseInt(userId);

    // Get pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Get status filter if provided
    const status = searchParams.get('status');

    // Build query
    let query = db.select()
      .from(deliveries)
      .where(eq(deliveries.driverId, driverId))
      .orderBy(desc(deliveries.createdAt))
      .limit(limit)
      .offset(offset);

    // Apply status filter if provided
    if (status) {
      query = db.select()
        .from(deliveries)
        .where(
          and(
            eq(deliveries.driverId, driverId),
            eq(deliveries.status, status)
          )
        )
        .orderBy(desc(deliveries.createdAt))
        .limit(limit)
        .offset(offset);
    }

    const results = await query;

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET deliveries by driver error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}