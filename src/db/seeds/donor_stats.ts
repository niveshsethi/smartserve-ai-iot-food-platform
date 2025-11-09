import { db } from '@/db';
import { donorStats } from '@/db/schema';

async function main() {
    const sampleDonorStats = [
        {
            userId: 1,
            totalDonations: 45,
            mealsProvided: 1250,
            activeDonations: 3,
            successRate: 92.5,
            updatedAt: new Date().toISOString(),
        },
        {
            userId: 2,
            totalDonations: 32,
            mealsProvided: 890,
            activeDonations: 2,
            successRate: 88.0,
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(donorStats).values(sampleDonorStats);
    
    console.log('✅ Donor stats seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});