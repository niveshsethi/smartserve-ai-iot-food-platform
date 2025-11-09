import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { recipientStats } from '@/db/schema';
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

    // Query recipientStats by userId
    const stats = await db.select()
      .from(recipientStats)
      .where(eq(recipientStats.userId, userIdInt))
      .limit(1);

    // Return 404 if stats not found
    if (stats.length === 0) {
      return NextResponse.json(
        { 
          error: 'Recipient statistics not found',
          code: 'STATS_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Return the stats object
    return NextResponse.json(stats[0], { status: 200 });

  } catch (error) {
    console.error('GET recipient stats error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}