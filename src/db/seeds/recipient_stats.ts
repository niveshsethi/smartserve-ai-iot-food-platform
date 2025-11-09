import { db } from '@/db';
import { recipientStats } from '@/db/schema';

async function main() {
    const sampleRecipientStats = [
        {
            userId: 3,
            totalReceived: 28,
            peopleFed: 850,
            activeClaims: 2,
            newAlerts: 3,
            updatedAt: new Date().toISOString(),
        },
        {
            userId: 4,
            totalReceived: 22,
            peopleFed: 720,
            activeClaims: 1,
            newAlerts: 2,
            updatedAt: new Date().toISOString(),
        },
        {
            userId: 5,
            totalReceived: 18,
            peopleFed: 320,
            activeClaims: 2,
            newAlerts: 1,
            updatedAt: new Date().toISOString(),
        },
        {
            userId: 6,
            totalReceived: 15,
            peopleFed: 280,
            activeClaims: 1,
            newAlerts: 2,
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(recipientStats).values(sampleRecipientStats);
    
    console.log('✅ Recipient stats seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});