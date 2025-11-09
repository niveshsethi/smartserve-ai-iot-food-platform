import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { deliveries } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donationId, claimId, driverId, pickupAddress, deliveryAddress, pickupTime, deliveryTime, distanceKm } = body;

    // Validate required fields
    if (!donationId) {
      return NextResponse.json({ 
        error: "Donation ID is required",
        code: "MISSING_DONATION_ID" 
      }, { status: 400 });
    }

    if (!claimId) {
      return NextResponse.json({ 
        error: "Claim ID is required",
        code: "MISSING_CLAIM_ID" 
      }, { status: 400 });
    }

    if (!driverId) {
      return NextResponse.json({ 
        error: "Driver ID is required",
        code: "MISSING_DRIVER_ID" 
      }, { status: 400 });
    }

    if (!pickupAddress || pickupAddress.trim() === '') {
      return NextResponse.json({ 
        error: "Pickup address is required",
        code: "MISSING_PICKUP_ADDRESS" 
      }, { status: 400 });
    }

    if (!deliveryAddress || deliveryAddress.trim() === '') {
      return NextResponse.json({ 
        error: "Delivery address is required",
        code: "MISSING_DELIVERY_ADDRESS" 
      }, { status: 400 });
    }

    // Validate IDs are valid integers
    if (isNaN(parseInt(donationId))) {
      return NextResponse.json({ 
        error: "Donation ID must be a valid integer",
        code: "INVALID_DONATION_ID" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(claimId))) {
      return NextResponse.json({ 
        error: "Claim ID must be a valid integer",
        code: "INVALID_CLAIM_ID" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(driverId))) {
      return NextResponse.json({ 
        error: "Driver ID must be a valid integer",
        code: "INVALID_DRIVER_ID" 
      }, { status: 400 });
    }

    // Prepare insert data
    const now = new Date().toISOString();
    const insertData: any = {
      donationId: parseInt(donationId),
      claimId: parseInt(claimId),
      driverId: parseInt(driverId),
      pickupAddress: pickupAddress.trim(),
      deliveryAddress: deliveryAddress.trim(),
      status: 'pickup_pending',
      createdAt: now,
      updatedAt: now
    };

    // Add optional fields if provided
    if (pickupTime) {
      insertData.pickupTime = pickupTime;
    }

    if (deliveryTime) {
      insertData.deliveryTime = deliveryTime;
    }

    if (distanceKm !== undefined && distanceKm !== null) {
      insertData.distanceKm = parseFloat(distanceKm);
    }

    // Insert delivery
    const newDelivery = await db.insert(deliveries)
      .values(insertData)
      .returning();

    return NextResponse.json(newDelivery[0], { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Filter parameters
    const status = searchParams.get('status');
    const driverId = searchParams.get('driverId');
    const donationId = searchParams.get('donationId');
    const claimId = searchParams.get('claimId');
    const id = searchParams.get('id');

    // Single record fetch by ID
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const delivery = await db.select()
        .from(deliveries)
        .where(eq(deliveries.id, parseInt(id)))
        .limit(1);

      if (delivery.length === 0) {
        return NextResponse.json({ 
          error: 'Delivery not found',
          code: "DELIVERY_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(delivery[0]);
    }

    // Build query with filters
    let query = db.select().from(deliveries);
    
    const conditions = [];

    if (status) {
      conditions.push(eq(deliveries.status, status));
    }

    if (driverId) {
      if (isNaN(parseInt(driverId))) {
        return NextResponse.json({ 
          error: "Driver ID must be a valid integer",
          code: "INVALID_DRIVER_ID" 
        }, { status: 400 });
      }
      conditions.push(eq(deliveries.driverId, parseInt(driverId)));
    }

    if (donationId) {
      if (isNaN(parseInt(donationId))) {
        return NextResponse.json({ 
          error: "Donation ID must be a valid integer",
          code: "INVALID_DONATION_ID" 
        }, { status: 400 });
      }
      conditions.push(eq(deliveries.donationId, parseInt(donationId)));
    }

    if (claimId) {
      if (isNaN(parseInt(claimId))) {
        return NextResponse.json({ 
          error: "Claim ID must be a valid integer",
          code: "INVALID_CLAIM_ID" 
        }, { status: 400 });
      }
      conditions.push(eq(deliveries.claimId, parseInt(claimId)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Order by createdAt DESC and apply pagination
    const results = await query
      .orderBy(desc(deliveries.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('GET error:', error);
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

    // Check if delivery exists
    const existing = await db.select()
      .from(deliveries)
      .where(eq(deliveries.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Delivery not found',
        code: "DELIVERY_NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    // Update allowed fields
    if (body.donationId !== undefined) {
      if (isNaN(parseInt(body.donationId))) {
        return NextResponse.json({ 
          error: "Donation ID must be a valid integer",
          code: "INVALID_DONATION_ID" 
        }, { status: 400 });
      }
      updates.donationId = parseInt(body.donationId);
    }

    if (body.claimId !== undefined) {
      if (isNaN(parseInt(body.claimId))) {
        return NextResponse.json({ 
          error: "Claim ID must be a valid integer",
          code: "INVALID_CLAIM_ID" 
        }, { status: 400 });
      }
      updates.claimId = parseInt(body.claimId);
    }

    if (body.driverId !== undefined) {
      if (isNaN(parseInt(body.driverId))) {
        return NextResponse.json({ 
          error: "Driver ID must be a valid integer",
          code: "INVALID_DRIVER_ID" 
        }, { status: 400 });
      }
      updates.driverId = parseInt(body.driverId);
    }

    if (body.pickupAddress !== undefined) {
      if (!body.pickupAddress || body.pickupAddress.trim() === '') {
        return NextResponse.json({ 
          error: "Pickup address cannot be empty",
          code: "INVALID_PICKUP_ADDRESS" 
        }, { status: 400 });
      }
      updates.pickupAddress = body.pickupAddress.trim();
    }

    if (body.deliveryAddress !== undefined) {
      if (!body.deliveryAddress || body.deliveryAddress.trim() === '') {
        return NextResponse.json({ 
          error: "Delivery address cannot be empty",
          code: "INVALID_DELIVERY_ADDRESS" 
        }, { status: 400 });
      }
      updates.deliveryAddress = body.deliveryAddress.trim();
    }

    if (body.pickupTime !== undefined) {
      updates.pickupTime = body.pickupTime;
    }

    if (body.deliveryTime !== undefined) {
      updates.deliveryTime = body.deliveryTime;
    }

    if (body.distanceKm !== undefined) {
      updates.distanceKm = body.distanceKm !== null ? parseFloat(body.distanceKm) : null;
    }

    if (body.status !== undefined) {
      const validStatuses = ['pickup_pending', 'in_transit', 'completed', 'cancelled'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json({ 
          error: "Invalid status. Must be one of: pickup_pending, in_transit, completed, cancelled",
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
      updates.status = body.status;
    }

    // Update delivery
    const updated = await db.update(deliveries)
      .set(updates)
      .where(eq(deliveries.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error: any) {
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

    // Check if delivery exists
    const existing = await db.select()
      .from(deliveries)
      .where(eq(deliveries.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Delivery not found',
        code: "DELIVERY_NOT_FOUND" 
      }, { status: 404 });
    }

    // Delete delivery
    const deleted = await db.delete(deliveries)
      .where(eq(deliveries.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Delivery deleted successfully',
      delivery: deleted[0] 
    });
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}