import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { sensorData } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deliveryId, phLevel, gasPpm, temperatureCelsius, bioSafetyPercent, status } = body;

    // Validate required fields
    if (!deliveryId) {
      return NextResponse.json(
        { error: 'deliveryId is required', code: 'MISSING_DELIVERY_ID' },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: 'status is required', code: 'MISSING_STATUS' },
        { status: 400 }
      );
    }

    // Validate deliveryId is valid integer
    const parsedDeliveryId = parseInt(deliveryId);
    if (isNaN(parsedDeliveryId)) {
      return NextResponse.json(
        { error: 'deliveryId must be a valid integer', code: 'INVALID_DELIVERY_ID' },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['normal', 'warning', 'critical'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'status must be one of: normal, warning, critical', code: 'INVALID_STATUS' },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData: any = {
      deliveryId: parsedDeliveryId,
      status,
      recordedAt: new Date().toISOString()
    };

    // Add optional fields if provided
    if (phLevel !== undefined && phLevel !== null) {
      insertData.phLevel = parseFloat(phLevel);
    }
    if (gasPpm !== undefined && gasPpm !== null) {
      insertData.gasPpm = parseFloat(gasPpm);
    }
    if (temperatureCelsius !== undefined && temperatureCelsius !== null) {
      insertData.temperatureCelsius = parseFloat(temperatureCelsius);
    }
    if (bioSafetyPercent !== undefined && bioSafetyPercent !== null) {
      insertData.bioSafetyPercent = parseFloat(bioSafetyPercent);
    }

    // Insert sensor data
    const newSensorData = await db.insert(sensorData)
      .values(insertData)
      .returning();

    return NextResponse.json(newSensorData[0], { status: 201 });

  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deliveryIdParam = searchParams.get('deliveryId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    let query = db.select().from(sensorData);

    // Filter by deliveryId if provided
    if (deliveryIdParam) {
      const parsedDeliveryId = parseInt(deliveryIdParam);
      if (isNaN(parsedDeliveryId)) {
        return NextResponse.json(
          { error: 'deliveryId must be a valid integer', code: 'INVALID_DELIVERY_ID' },
          { status: 400 }
        );
      }
      query = query.where(eq(sensorData.deliveryId, parsedDeliveryId));
    }

    // Order by recordedAt DESC, apply pagination
    const results = await query
      .orderBy(desc(sensorData.recordedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}