import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { logisticsStats } from '@/db/schema';
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

    // Query logisticsStats table for the specific user
    const stats = await db.select()
      .from(logisticsStats)
      .where(eq(logisticsStats.userId, userIdInt))
      .limit(1);

    // Return 404 if no stats found for this user
    if (stats.length === 0) {
      return NextResponse.json(
        { 
          error: 'Logistics stats not found for this user',
          code: 'STATS_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Return the stats object
    return NextResponse.json(stats[0], { status: 200 });

  } catch (error) {
    console.error('GET logistics stats error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}