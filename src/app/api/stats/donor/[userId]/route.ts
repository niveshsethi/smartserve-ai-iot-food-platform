import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { donorStats } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

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

    // Query donorStats table for the specific user
    const stats = await db
      .select()
      .from(donorStats)
      .where(eq(donorStats.userId, userIdInt))
      .limit(1);

    // Return 404 if stats not found
    if (stats.length === 0) {
      return NextResponse.json(
        { 
          error: 'Donor statistics not found',
          code: 'STATS_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Return stats object
    return NextResponse.json(stats[0], { status: 200 });

  } catch (error) {
    console.error('GET donor stats error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message
      },
      { status: 500 }
    );
  }
}