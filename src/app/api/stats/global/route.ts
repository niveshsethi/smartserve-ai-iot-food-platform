import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { donations, users, deliveries, claims } from '@/db/schema';
import { eq, count, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Calculate total donations
    const totalDonationsResult = await db
      .select({ count: count() })
      .from(donations);
    const totalDonations = totalDonationsResult[0]?.count || 0;

    // Calculate total meals provided (sum of quantities)
    const totalMealsResult = await db
      .select({ 
        total: sql<number>`COALESCE(SUM(${donations.quantity}), 0)` 
      })
      .from(donations);
    const totalMealsProvided = totalMealsResult[0]?.total || 0;

    // Calculate total users
    const totalUsersResult = await db
      .select({ count: count() })
      .from(users);
    const totalUsers = totalUsersResult[0]?.count || 0;

    // Calculate active deliveries (in_transit or pickup_pending)
    const activeDeliveriesResult = await db
      .select({ count: count() })
      .from(deliveries)
      .where(
        sql`${deliveries.status} IN ('in_transit', 'pickup_pending')`
      );
    const activeDeliveries = activeDeliveriesResult[0]?.count || 0;

    // Calculate completed deliveries
    const completedDeliveriesResult = await db
      .select({ count: count() })
      .from(deliveries)
      .where(eq(deliveries.status, 'completed'));
    const completedDeliveries = completedDeliveriesResult[0]?.count || 0;

    // Calculate total claims
    const totalClaimsResult = await db
      .select({ count: count() })
      .from(claims);
    const totalClaims = totalClaimsResult[0]?.count || 0;

    // Calculate active donations
    const activeDonationsResult = await db
      .select({ count: count() })
      .from(donations)
      .where(eq(donations.status, 'available'));
    const activeDonations = activeDonationsResult[0]?.count || 0;

    // Return aggregated stats
    return NextResponse.json({
      totalDonations,
      totalMealsProvided,
      totalUsers,
      activeDeliveries,
      completedDeliveries,
      totalClaims,
      activeDonations
    }, { status: 200 });

  } catch (error) {
    console.error('GET global stats error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}