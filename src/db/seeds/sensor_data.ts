import { db } from '@/db';
import { sensorData } from '@/db/schema';

async function main() {
    const baseDate = new Date('2024-01-15T10:00:00Z');
    
    const sampleSensorData = [
        // Delivery 1: All normal readings
        {
            deliveryId: 1,
            phLevel: 6.8,
            gasPpm: 25.0,
            temperatureCelsius: 4.5,
            bioSafetyPercent: 98.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 10 * 60000).toISOString(),
        },
        {
            deliveryId: 1,
            phLevel: 6.9,
            gasPpm: 28.0,
            temperatureCelsius: 5.0,
            bioSafetyPercent: 97.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 20 * 60000).toISOString(),
        },
        {
            deliveryId: 1,
            phLevel: 7.0,
            gasPpm: 30.0,
            temperatureCelsius: 5.5,
            bioSafetyPercent: 96.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 30 * 60000).toISOString(),
        },
        {
            deliveryId: 1,
            phLevel: 7.1,
            gasPpm: 32.0,
            temperatureCelsius: 6.0,
            bioSafetyPercent: 95.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 40 * 60000).toISOString(),
        },

        // Delivery 2: Progressive degradation to warning
        {
            deliveryId: 2,
            phLevel: 6.5,
            gasPpm: 35.0,
            temperatureCelsius: 6.0,
            bioSafetyPercent: 92.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 10 * 60000).toISOString(),
        },
        {
            deliveryId: 2,
            phLevel: 6.8,
            gasPpm: 45.0,
            temperatureCelsius: 7.5,
            bioSafetyPercent: 88.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 20 * 60000).toISOString(),
        },
        {
            deliveryId: 2,
            phLevel: 7.2,
            gasPpm: 55.0,
            temperatureCelsius: 9.0,
            bioSafetyPercent: 82.0,
            status: 'warning',
            recordedAt: new Date(baseDate.getTime() + 30 * 60000).toISOString(),
        },
        {
            deliveryId: 2,
            phLevel: 7.6,
            gasPpm: 65.0,
            temperatureCelsius: 10.5,
            bioSafetyPercent: 78.0,
            status: 'warning',
            recordedAt: new Date(baseDate.getTime() + 40 * 60000).toISOString(),
        },

        // Delivery 3: Critical temperature issue
        {
            deliveryId: 3,
            phLevel: 6.7,
            gasPpm: 40.0,
            temperatureCelsius: 8.0,
            bioSafetyPercent: 91.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 10 * 60000).toISOString(),
        },
        {
            deliveryId: 3,
            phLevel: 6.9,
            gasPpm: 48.0,
            temperatureCelsius: 12.0,
            bioSafetyPercent: 85.0,
            status: 'warning',
            recordedAt: new Date(baseDate.getTime() + 20 * 60000).toISOString(),
        },
        {
            deliveryId: 3,
            phLevel: 7.3,
            gasPpm: 58.0,
            temperatureCelsius: 16.5,
            bioSafetyPercent: 72.0,
            status: 'critical',
            recordedAt: new Date(baseDate.getTime() + 30 * 60000).toISOString(),
        },
        {
            deliveryId: 3,
            phLevel: 7.8,
            gasPpm: 70.0,
            temperatureCelsius: 18.0,
            bioSafetyPercent: 68.0,
            status: 'critical',
            recordedAt: new Date(baseDate.getTime() + 40 * 60000).toISOString(),
        },

        // Delivery 4: Stable normal conditions
        {
            deliveryId: 4,
            phLevel: 6.5,
            gasPpm: 20.0,
            temperatureCelsius: 3.5,
            bioSafetyPercent: 99.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 10 * 60000).toISOString(),
        },
        {
            deliveryId: 4,
            phLevel: 6.6,
            gasPpm: 22.0,
            temperatureCelsius: 4.0,
            bioSafetyPercent: 98.5,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 20 * 60000).toISOString(),
        },
        {
            deliveryId: 4,
            phLevel: 6.7,
            gasPpm: 24.0,
            temperatureCelsius: 4.5,
            bioSafetyPercent: 98.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 30 * 60000).toISOString(),
        },
        {
            deliveryId: 4,
            phLevel: 6.8,
            gasPpm: 26.0,
            temperatureCelsius: 5.0,
            bioSafetyPercent: 97.5,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 40 * 60000).toISOString(),
        },

        // Delivery 5: Gas contamination issue
        {
            deliveryId: 5,
            phLevel: 7.0,
            gasPpm: 38.0,
            temperatureCelsius: 5.5,
            bioSafetyPercent: 93.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 10 * 60000).toISOString(),
        },
        {
            deliveryId: 5,
            phLevel: 7.1,
            gasPpm: 60.0,
            temperatureCelsius: 6.5,
            bioSafetyPercent: 87.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 20 * 60000).toISOString(),
        },
        {
            deliveryId: 5,
            phLevel: 7.3,
            gasPpm: 85.0,
            temperatureCelsius: 7.5,
            bioSafetyPercent: 80.0,
            status: 'warning',
            recordedAt: new Date(baseDate.getTime() + 30 * 60000).toISOString(),
        },
        {
            deliveryId: 5,
            phLevel: 7.5,
            gasPpm: 48.0,
            temperatureCelsius: 7.0,
            bioSafetyPercent: 90.0,
            status: 'normal',
            recordedAt: new Date(baseDate.getTime() + 40 * 60000).toISOString(),
        },
    ];

    await db.insert(sensorData).values(sampleSensorData);
    
    console.log('✅ Sensor data seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});