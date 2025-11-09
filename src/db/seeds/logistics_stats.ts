import { db } from '@/db';
import { logisticsStats } from '@/db/schema';

async function main() {
    const sampleLogisticsStats = [
        {
            userId: 7,
            activeJobs: 2,
            totalDeliveries: 58,
            successRate: 96.5,
            avgDeliveryTimeMinutes: 42,
            updatedAt: new Date().toISOString(),
        },
        {
            userId: 8,
            activeJobs: 1,
            totalDeliveries: 45,
            successRate: 94.0,
            avgDeliveryTimeMinutes: 38,
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(logisticsStats).values(sampleLogisticsStats);
    
    console.log('✅ Logistics stats seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});