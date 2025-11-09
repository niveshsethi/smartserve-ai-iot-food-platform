import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { donations } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const donation = await db.select()
        .from(donations)
        .where(eq(donations.id, parseInt(id)))
        .limit(1);

      if (donation.length === 0) {
        return NextResponse.json({ 
          error: 'Donation not found',
          code: "NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(donation[0], { status: 200 });
    }

    // List with pagination, search, filtering, and sorting
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const aiCategory = searchParams.get('aiCategory');
    const foodType = searchParams.get('foodType');
    const sortField = searchParams.get('sort') ?? 'createdAt';
    const sortOrder = searchParams.get('order') ?? 'desc';

    let query = db.select().from(donations);

    // Build WHERE conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(donations.title, `%${search}%`),
          like(donations.description, `%${search}%`),
          like(donations.pickupLocation, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(donations.status, status));
    }

    if (aiCategory) {
      conditions.push(eq(donations.aiCategory, aiCategory));
    }

    if (foodType) {
      conditions.push(eq(donations.foodType, foodType));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const sortColumn = sortField === 'distance' ? donations.distance :
                      sortField === 'expiryDate' ? donations.expiryDate :
                      donations.createdAt;
    
    query = sortOrder === 'asc' 
      ? query.orderBy(asc(sortColumn))
      : query.orderBy(desc(sortColumn));

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      donorId, 
      foodType, 
      title, 
      quantity, 
      unit, 
      expiryDate, 
      pickupLocation,
      description,
      imageUrl,
      aiCategory,
      aiConfidence,
      isRecurring,
      distance
    } = body;

    // Validate required fields
    if (!donorId) {
      return NextResponse.json({ 
        error: "donorId is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!foodType) {
      return NextResponse.json({ 
        error: "foodType is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ 
        error: "title is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (quantity === undefined || quantity === null) {
      return NextResponse.json({ 
        error: "quantity is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!unit) {
      return NextResponse.json({ 
        error: "unit is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!expiryDate) {
      return NextResponse.json({ 
        error: "expiryDate is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!pickupLocation) {
      return NextResponse.json({ 
        error: "pickupLocation is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Validate donorId is a valid integer
    if (isNaN(parseInt(donorId))) {
      return NextResponse.json({ 
        error: "donorId must be a valid integer",
        code: "INVALID_DONOR_ID" 
      }, { status: 400 });
    }

    // Validate quantity is positive
    if (quantity <= 0) {
      return NextResponse.json({ 
        error: "quantity must be a positive number",
        code: "INVALID_QUANTITY" 
      }, { status: 400 });
    }

    // Validate foodType
    const validFoodTypes = ['cooked', 'packaged', 'produce', 'bakery', 'dairy', 'other'];
    if (!validFoodTypes.includes(foodType)) {
      return NextResponse.json({ 
        error: "foodType must be one of: " + validFoodTypes.join(', '),
        code: "INVALID_FOOD_TYPE" 
      }, { status: 400 });
    }

    // Validate unit
    const validUnits = ['kg', 'servings', 'items'];
    if (!validUnits.includes(unit)) {
      return NextResponse.json({ 
        error: "unit must be one of: " + validUnits.join(', '),
        code: "INVALID_UNIT" 
      }, { status: 400 });
    }

    // Prepare insert data
    const now = new Date().toISOString();
    const insertData: any = {
      donorId: parseInt(donorId),
      foodType: foodType.trim(),
      title: title.trim(),
      quantity: parseInt(quantity),
      unit: unit.trim(),
      expiryDate,
      pickupLocation: pickupLocation.trim(),
      status: 'available',
      isRecurring: isRecurring ?? false,
      createdAt: now,
      updatedAt: now
    };

    // Add optional fields if provided
    if (description) insertData.description = description.trim();
    if (imageUrl) insertData.imageUrl = imageUrl.trim();
    if (aiCategory) insertData.aiCategory = aiCategory.trim();
    if (aiConfidence !== undefined && aiConfidence !== null) insertData.aiConfidence = parseFloat(aiConfidence);
    if (distance !== undefined && distance !== null) insertData.distance = parseFloat(distance);

    const newDonation = await db.insert(donations)
      .values(insertData)
      .returning();

    return NextResponse.json(newDonation[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if donation exists
    const existing = await db.select()
      .from(donations)
      .where(eq(donations.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Donation not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const { 
      foodType,
      title,
      quantity,
      unit,
      expiryDate,
      pickupLocation,
      description,
      imageUrl,
      aiCategory,
      aiConfidence,
      status,
      isRecurring,
      distance
    } = body;

    // Build update object with only provided fields
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (foodType !== undefined) {
      const validFoodTypes = ['cooked', 'packaged', 'produce', 'bakery', 'dairy', 'other'];
      if (!validFoodTypes.includes(foodType)) {
        return NextResponse.json({ 
          error: "foodType must be one of: " + validFoodTypes.join(', '),
          code: "INVALID_FOOD_TYPE" 
        }, { status: 400 });
      }
      updates.foodType = foodType.trim();
    }

    if (title !== undefined) updates.title = title.trim();

    if (quantity !== undefined) {
      if (quantity <= 0) {
        return NextResponse.json({ 
          error: "quantity must be a positive number",
          code: "INVALID_QUANTITY" 
        }, { status: 400 });
      }
      updates.quantity = parseInt(quantity);
    }

    if (unit !== undefined) {
      const validUnits = ['kg', 'servings', 'items'];
      if (!validUnits.includes(unit)) {
        return NextResponse.json({ 
          error: "unit must be one of: " + validUnits.join(', '),
          code: "INVALID_UNIT" 
        }, { status: 400 });
      }
      updates.unit = unit.trim();
    }

    if (expiryDate !== undefined) updates.expiryDate = expiryDate;
    if (pickupLocation !== undefined) updates.pickupLocation = pickupLocation.trim();
    if (description !== undefined) updates.description = description ? description.trim() : null;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl ? imageUrl.trim() : null;
    if (aiCategory !== undefined) updates.aiCategory = aiCategory ? aiCategory.trim() : null;
    if (aiConfidence !== undefined) updates.aiConfidence = aiConfidence !== null ? parseFloat(aiConfidence) : null;
    
    if (status !== undefined) {
      const validStatuses = ['available', 'claimed', 'in_transit', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ 
          error: "status must be one of: " + validStatuses.join(', '),
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
      updates.status = status;
    }

    if (isRecurring !== undefined) updates.isRecurring = Boolean(isRecurring);
    if (distance !== undefined) updates.distance = distance !== null ? parseFloat(distance) : null;

    const updated = await db.update(donations)
      .set(updates)
      .where(eq(donations.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if donation exists
    const existing = await db.select()
      .from(donations)
      .where(eq(donations.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Donation not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const deleted = await db.delete(donations)
      .where(eq(donations.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Donation deleted successfully',
      donation: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}