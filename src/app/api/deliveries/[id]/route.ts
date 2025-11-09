import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { deliveries } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    // Query single delivery
    const delivery = await db.select()
      .from(deliveries)
      .where(eq(deliveries.id, parseInt(id)))
      .limit(1);

    // Check if delivery exists
    if (delivery.length === 0) {
      return NextResponse.json(
        { 
          error: 'Delivery not found',
          code: 'DELIVERY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(delivery[0], { status: 200 });
  } catch (error) {
    console.error('GET delivery error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { status, pickupTime, deliveryTime, distanceKm } = body;

    // Check if delivery exists
    const existingDelivery = await db.select()
      .from(deliveries)
      .where(eq(deliveries.id, parseInt(id)))
      .limit(1);

    if (existingDelivery.length === 0) {
      return NextResponse.json(
        { 
          error: 'Delivery not found',
          code: 'DELIVERY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: {
      status?: string;
      pickupTime?: string;
      deliveryTime?: string;
      distanceKm?: number;
      updatedAt: string;
    } = {
      updatedAt: new Date().toISOString()
    };

    // Add fields if provided
    if (status !== undefined) {
      updateData.status = status;
    }
    if (pickupTime !== undefined) {
      updateData.pickupTime = pickupTime;
    }
    if (deliveryTime !== undefined) {
      updateData.deliveryTime = deliveryTime;
    }
    if (distanceKm !== undefined) {
      updateData.distanceKm = distanceKm;
    }

    // Update delivery
    const updated = await db.update(deliveries)
      .set(updateData)
      .where(eq(deliveries.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT delivery error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}