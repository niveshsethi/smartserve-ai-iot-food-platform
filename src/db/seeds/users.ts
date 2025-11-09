import { db } from '@/db';
import { users } from '@/db/schema';

async function main() {
    const sampleUsers = [
        {
            name: 'Rajesh Kumar',
            email: 'rajesh.kumar@grandhotel.com',
            password: '$2a$10$YQN5qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'donor',
            organization: 'Grand Hotel Mumbai',
            phone: '+91 98765 43210',
            location: 'Colaba, Mumbai, Maharashtra',
            createdAt: new Date('2024-12-15').toISOString(),
        },
        {
            name: 'Priya Sharma',
            email: 'priya.sharma@tajrestaurant.com',
            password: '$2a$10$XPL9qMkjHGF6vKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'donor',
            organization: 'Taj Restaurant Delhi',
            phone: '+91 98765 43211',
            location: 'Connaught Place, New Delhi',
            createdAt: new Date('2024-12-18').toISOString(),
        },
        {
            name: 'Amit Patel',
            email: 'amit.patel@foodforall.org',
            password: '$2a$10$ZRM8qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'ngo',
            organization: 'Food For All NGO',
            phone: '+91 98765 43212',
            location: 'Andheri West, Mumbai, Maharashtra',
            createdAt: new Date('2024-12-20').toISOString(),
        },
        {
            name: 'Sunita Reddy',
            email: 'sunita.reddy@hopefoundation.org',
            password: '$2a$10$AQN5qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'ngo',
            organization: 'Hope Foundation Bangalore',
            phone: '+91 98765 43213',
            location: 'Koramangala, Bangalore, Karnataka',
            createdAt: new Date('2024-12-22').toISOString(),
        },
        {
            name: 'Vikram Singh',
            email: 'vikram.singh@mumbaicare.org',
            password: '$2a$10$BQN5qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'shelter',
            organization: 'Mumbai Animal Care',
            phone: '+91 98765 43214',
            location: 'Bandra, Mumbai, Maharashtra',
            createdAt: new Date('2024-12-25').toISOString(),
        },
        {
            name: 'Meera Kapoor',
            email: 'meera.kapoor@pawsshelter.org',
            password: '$2a$10$CQN5qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'shelter',
            organization: 'Paws Shelter Delhi',
            phone: '+91 98765 43215',
            location: 'Vasant Kunj, New Delhi',
            createdAt: new Date('2024-12-28').toISOString(),
        },
        {
            name: 'Arjun Desai',
            email: 'arjun.desai@swiftlogistics.com',
            password: '$2a$10$DQN5qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'logistics',
            organization: 'Swift Logistics Mumbai',
            phone: '+91 98765 43216',
            location: 'Powai, Mumbai, Maharashtra',
            createdAt: new Date('2024-12-30').toISOString(),
        },
        {
            name: 'Karan Mehta',
            email: 'karan.mehta@fastdelivery.com',
            password: '$2a$10$EQN5qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'logistics',
            organization: 'Fast Delivery Services',
            phone: '+91 98765 43217',
            location: 'Electronic City, Bangalore, Karnataka',
            createdAt: new Date('2025-01-02').toISOString(),
        },
        {
            name: 'Neha Gupta',
            email: 'neha.gupta@volunteer.com',
            password: '$2a$10$FQN5qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'volunteer',
            organization: null,
            phone: '+91 98765 43218',
            location: 'Malad, Mumbai, Maharashtra',
            createdAt: new Date('2025-01-05').toISOString(),
        },
        {
            name: 'Admin User',
            email: 'admin@smartserve.com',
            password: '$2a$10$GQN5qNlrKWJvKaXq8ZQmVe7HxXKJ5XqLm4N9FZDwJ8YQN5qNlrKWJ',
            role: 'admin',
            organization: 'SmartServe Platform',
            phone: '+91 98765 43219',
            location: 'Pune, Maharashtra',
            createdAt: new Date('2025-01-08').toISOString(),
        },
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});