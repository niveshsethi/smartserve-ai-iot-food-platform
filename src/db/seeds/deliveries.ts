import { db } from '@/db';
import { deliveries } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const sampleDeliveries = [
        {
            donationId: 4,
            claimId: 2,
            driverId: 7,
            pickupAddress: 'Andheri West, Mumbai - Restaurant "Spice Garden", Shop 12, Linking Road, Near Metro Station',
            deliveryAddress: 'Malad West, Mumbai - Hope Foundation NGO, Building 5, SV Road, Near Police Station',
            pickupTime: null,
            deliveryTime: null,
            distanceKm: 5.2,
            status: 'pickup_pending',
            createdAt: new Date(now.getTime() - 1.5 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 1.5 * 60 * 60 * 1000).toISOString(),
        },
        {
            donationId: 5,
            claimId: 3,
            driverId: 8,
            pickupAddress: 'Connaught Place, Delhi - Grand Hotel Banquet Hall, Block A, Inner Circle, Near Rajiv Chowk Metro',
            deliveryAddress: 'Karol Bagh, Delhi - Seva Shelter Home, WEA Road, Near District Center',
            pickupTime: null,
            deliveryTime: null,
            distanceKm: 3.8,
            status: 'pickup_pending',
            createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        },
        {
            donationId: 6,
            claimId: 4,
            driverId: 7,
            pickupAddress: 'Bandra West, Mumbai - Cafe "Morning Delight", Hill Road, Near Bandstand Promenade',
            deliveryAddress: 'Worli, Mumbai - Children Care NGO, Annie Besant Road, Near Sea Link',
            pickupTime: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
            deliveryTime: null,
            distanceKm: 7.5,
            status: 'in_transit',
            createdAt: new Date(now.getTime() - 2.5 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
        },
        {
            donationId: 8,
            claimId: 5,
            driverId: 8,
            pickupAddress: 'Saket, Delhi - "The Food Court" Mall, Press Enclave Road, Near Metro Station',
            deliveryAddress: 'Rohini, Delhi - Community Kitchen NGO, Sector 15, Near District Park',
            pickupTime: new Date(now.getTime() - 50 * 60 * 1000).toISOString(),
            deliveryTime: null,
            distanceKm: 9.2,
            status: 'in_transit',
            createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 50 * 60 * 1000).toISOString(),
        },
        {
            donationId: 10,
            claimId: 6,
            driverId: 7,
            pickupAddress: 'Powai, Mumbai - Tech Park Cafeteria, Hiranandani Business Park, Near Lake View',
            deliveryAddress: 'Kurla West, Mumbai - Annapurna Shelter, LBS Marg, Near Railway Station',
            pickupTime: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
            deliveryTime: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
            distanceKm: 6.8,
            status: 'completed',
            createdAt: new Date(now.getTime() - 3.5 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(deliveries).values(sampleDeliveries);
    
    console.log('✅ Deliveries seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});