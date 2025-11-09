import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Authenticate the request
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Extract and validate userId from URL params
    const { userId } = params;
    
    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json(
        { error: 'Valid user ID is required', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    const userIdInt = parseInt(userId);

    // Security: Users can only access their own notifications
    if (user.id !== userIdInt) {
      return NextResponse.json(
        { error: 'Access denied', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Extract query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const isReadParam = searchParams.get('isRead');

    // Build query with user scoping
    let query = db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userIdInt))
      .orderBy(desc(notifications.createdAt));

    // Apply isRead filter if provided
    if (isReadParam !== null) {
      const isRead = isReadParam === 'true';
      query = db
        .select()
        .from(notifications)
        .where(
          and(
            eq(notifications.userId, userIdInt),
            eq(notifications.isRead, isRead)
          )
        )
        .orderBy(desc(notifications.createdAt));
    }

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET /api/notifications/user/[userId] error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}