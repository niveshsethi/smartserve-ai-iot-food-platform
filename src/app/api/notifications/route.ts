import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

const ALLOWED_TYPES = ['new_donation', 'claim_accepted', 'delivery_update', 'alert'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const isRead = searchParams.get('isRead');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    let query = db.select().from(notifications);

    const conditions = [];

    if (userId) {
      const parsedUserId = parseInt(userId);
      if (isNaN(parsedUserId)) {
        return NextResponse.json({ 
          error: "Valid userId is required",
          code: "INVALID_USER_ID" 
        }, { status: 400 });
      }
      conditions.push(eq(notifications.userId, parsedUserId));
    }

    if (isRead !== null && isRead !== undefined) {
      const isReadBool = isRead === 'true';
      conditions.push(eq(notifications.isRead, isReadBool));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, message, type } = body;

    if (!userId) {
      return NextResponse.json({ 
        error: "userId is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ 
        error: "title is required and must be a non-empty string",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ 
        error: "message is required and must be a non-empty string",
        code: "MISSING_MESSAGE" 
      }, { status: 400 });
    }

    if (!type || typeof type !== 'string') {
      return NextResponse.json({ 
        error: "type is required",
        code: "MISSING_TYPE" 
      }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ 
        error: `type must be one of: ${ALLOWED_TYPES.join(', ')}`,
        code: "INVALID_TYPE" 
      }, { status: 400 });
    }

    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      return NextResponse.json({ 
        error: "userId must be a valid integer",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    const newNotification = await db.insert(notifications)
      .values({
        userId: parsedUserId,
        title: title.trim(),
        message: message.trim(),
        type,
        isRead: false,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newNotification[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const body = await request.json();
    const updates: any = {};

    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || body.title.trim() === '') {
        return NextResponse.json({ 
          error: "title must be a non-empty string",
          code: "INVALID_TITLE" 
        }, { status: 400 });
      }
      updates.title = body.title.trim();
    }

    if (body.message !== undefined) {
      if (typeof body.message !== 'string' || body.message.trim() === '') {
        return NextResponse.json({ 
          error: "message must be a non-empty string",
          code: "INVALID_MESSAGE" 
        }, { status: 400 });
      }
      updates.message = body.message.trim();
    }

    if (body.type !== undefined) {
      if (!ALLOWED_TYPES.includes(body.type)) {
        return NextResponse.json({ 
          error: `type must be one of: ${ALLOWED_TYPES.join(', ')}`,
          code: "INVALID_TYPE" 
        }, { status: 400 });
      }
      updates.type = body.type;
    }

    if (body.isRead !== undefined) {
      if (typeof body.isRead !== 'boolean') {
        return NextResponse.json({ 
          error: "isRead must be a boolean",
          code: "INVALID_IS_READ" 
        }, { status: 400 });
      }
      updates.isRead = body.isRead;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ 
        error: "No valid fields to update",
        code: "NO_UPDATE_FIELDS" 
      }, { status: 400 });
    }

    const existing = await db.select()
      .from(notifications)
      .where(eq(notifications.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Notification not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const updated = await db.update(notifications)
      .set(updates)
      .where(eq(notifications.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const existing = await db.select()
      .from(notifications)
      .where(eq(notifications.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Notification not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const deleted = await db.delete(notifications)
      .where(eq(notifications.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Notification deleted successfully',
      notification: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}