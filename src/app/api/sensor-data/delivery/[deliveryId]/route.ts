import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sensorData } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { deliveryId: string } }
) {
  try {
    const { deliveryId } = params;
    const { searchParams } = new URL(request.url);

    // Validate deliveryId
    if (!deliveryId || isNaN(parseInt(deliveryId))) {
      return NextResponse.json(
        {
          error: 'Valid delivery ID is required',
          code: 'INVALID_DELIVERY_ID'
        },
        { status: 400 }
      );
    }

    const parsedDeliveryId = parseInt(deliveryId);

    // Get pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Query sensor data for the specific delivery
    const readings = await db
      .select()
      .from(sensorData)
      .where(eq(sensorData.deliveryId, parsedDeliveryId))
      .orderBy(desc(sensorData.recordedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(readings, { status: 200 });
  } catch (error) {
    console.error('GET sensor data by delivery error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message
      },
      { status: 500 }
    );
  }
}