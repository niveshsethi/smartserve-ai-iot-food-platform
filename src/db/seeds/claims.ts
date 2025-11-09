import { db } from '@/db';
import { claims } from '@/db/schema';

async function main() {
    const sampleClaims = [
        {
            donationId: 2,
            recipientId: 3,
            claimedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
        },
        {
            donationId: 4,
            recipientId: 4,
            claimedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
        },
        {
            donationId: 5,
            recipientId: 3,
            claimedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'accepted',
        },
        {
            donationId: 6,
            recipientId: 5,
            claimedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'accepted',
        },
        {
            donationId: 8,
            recipientId: 6,
            claimedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'accepted',
        },
        {
            donationId: 10,
            recipientId: 4,
            claimedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
        },
        {
            donationId: 11,
            recipientId: 5,
            claimedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
        },
        {
            donationId: 12,
            recipientId: 6,
            claimedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'cancelled',
        },
    ];

    await db.insert(claims).values(sampleClaims);
    
    console.log('✅ Claims seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});