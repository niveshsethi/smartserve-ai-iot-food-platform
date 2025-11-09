import { db } from '@/db';
import { notifications } from '@/db/schema';

async function main() {
    const now = new Date();
    const getRecentTime = (hoursAgo: number) => {
        const date = new Date(now);
        date.setHours(date.getHours() - hoursAgo);
        return date.toISOString();
    };

    const sampleNotifications = [
        // new_donation notifications (6 total - sent to NGOs/shelters)
        {
            userId: 2,
            title: 'New Donation Available',
            message: 'New donation available: Fresh vegetables and fruits - 3.2 km away from your location',
            type: 'new_donation',
            isRead: false,
            createdAt: getRecentTime(1),
        },
        {
            userId: 3,
            title: 'New Donation Match',
            message: 'New donation available: 50 servings of cooked rice and curry - 5.8 km away',
            type: 'new_donation',
            isRead: false,
            createdAt: getRecentTime(2),
        },
        {
            userId: 4,
            title: 'Donation Alert',
            message: 'New donation available: Packaged bread and dairy products - 1.5 km away',
            type: 'new_donation',
            isRead: true,
            createdAt: getRecentTime(8),
        },
        {
            userId: 2,
            title: 'New Food Available',
            message: 'New donation available: 30 kg bakery items expiring tomorrow - 4.2 km away',
            type: 'new_donation',
            isRead: false,
            createdAt: getRecentTime(3),
        },
        {
            userId: 5,
            title: 'Donation Nearby',
            message: 'New donation available: Mixed produce and packaged goods - 2.7 km away',
            type: 'new_donation',
            isRead: true,
            createdAt: getRecentTime(12),
        },
        {
            userId: 3,
            title: 'Fresh Donation Posted',
            message: 'New donation available: 100 servings prepared meals - 6.3 km away from your shelter',
            type: 'new_donation',
            isRead: false,
            createdAt: getRecentTime(0.5),
        },

        // claim_accepted notifications (5 total - sent to donors)
        {
            userId: 1,
            title: 'Donation Claimed',
            message: "Your donation 'Fresh Vegetables Pack' has been claimed by Hope Foundation NGO",
            type: 'claim_accepted',
            isRead: false,
            createdAt: getRecentTime(2),
        },
        {
            userId: 6,
            title: 'Claim Accepted',
            message: "Your donation 'Cooked Rice Meals - 50 servings' has been claimed by Community Shelter",
            type: 'claim_accepted',
            isRead: true,
            createdAt: getRecentTime(10),
        },
        {
            userId: 1,
            title: 'Donation Accepted',
            message: "Your donation 'Packaged Bread and Dairy' has been claimed by City Food Bank",
            type: 'claim_accepted',
            isRead: false,
            createdAt: getRecentTime(4),
        },
        {
            userId: 7,
            title: 'Someone Claimed Your Food',
            message: "Your donation 'Bakery Items - 30 kg' has been claimed by Helping Hands Organization",
            type: 'claim_accepted',
            isRead: true,
            createdAt: getRecentTime(15),
        },
        {
            userId: 6,
            title: 'Donation Claimed Successfully',
            message: "Your donation 'Mixed Produce Box' has been claimed by Sunrise Shelter",
            type: 'claim_accepted',
            isRead: false,
            createdAt: getRecentTime(5),
        },

        // delivery_update notifications (6 total - sent to recipients and donors)
        {
            userId: 2,
            title: 'Delivery En Route',
            message: 'Delivery status updated: In Transit - ETA 25 minutes',
            type: 'delivery_update',
            isRead: false,
            createdAt: getRecentTime(1.5),
        },
        {
            userId: 3,
            title: 'Delivery Update',
            message: 'Delivery status updated: Pickup Completed - ETA 45 minutes',
            type: 'delivery_update',
            isRead: false,
            createdAt: getRecentTime(2.5),
        },
        {
            userId: 1,
            title: 'Delivery Completed',
            message: 'Delivery status updated: Successfully Delivered - Thank you for your donation!',
            type: 'delivery_update',
            isRead: true,
            createdAt: getRecentTime(18),
        },
        {
            userId: 4,
            title: 'Pickup Pending',
            message: 'Delivery status updated: Driver Assigned - ETA to pickup location 15 minutes',
            type: 'delivery_update',
            isRead: false,
            createdAt: getRecentTime(3),
        },
        {
            userId: 6,
            title: 'Delivery Status',
            message: 'Delivery status updated: Out for Delivery - ETA 30 minutes',
            type: 'delivery_update',
            isRead: true,
            createdAt: getRecentTime(14),
        },
        {
            userId: 5,
            title: 'Delivery Arriving Soon',
            message: 'Delivery status updated: Nearby - ETA 10 minutes, driver is arriving soon',
            type: 'delivery_update',
            isRead: false,
            createdAt: getRecentTime(0.3),
        },

        // alert notifications (3 total - critical sensor alerts)
        {
            userId: 8,
            title: 'CRITICAL ALERT',
            message: 'ALERT: High temperature (28°C) detected in delivery #12 - immediate attention required',
            type: 'alert',
            isRead: false,
            createdAt: getRecentTime(0.2),
        },
        {
            userId: 2,
            title: 'SENSOR WARNING',
            message: 'ALERT: Elevated gas levels (350 ppm) detected in delivery #8 - immediate attention required',
            type: 'alert',
            isRead: false,
            createdAt: getRecentTime(1),
        },
        {
            userId: 8,
            title: 'BIO-SAFETY ALERT',
            message: 'ALERT: Bio-safety level below threshold (65%) detected in delivery #15 - immediate attention required',
            type: 'alert',
            isRead: true,
            createdAt: getRecentTime(20),
        },
    ];

    await db.insert(notifications).values(sampleNotifications);
    
    console.log('✅ Notifications seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});