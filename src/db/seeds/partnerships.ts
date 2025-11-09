import { db } from '@/db';
import { partnerships } from '@/db/schema';

async function main() {
    const samplePartnerships = [
        {
            organizationName: 'Taj Hotels & Resorts',
            contactName: 'Rajesh Kumar',
            email: 'rajesh.kumar@tajhotels.com',
            phone: '+91 98765 43210',
            city: 'Mumbai',
            partnershipType: 'Food Donor',
            message: 'We are interested in donating excess food from our hotel kitchens across Mumbai. We prepare high-quality meals daily and would like to contribute to reducing food waste while helping those in need.',
            status: 'approved',
            createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            organizationName: 'Akshaya Patra Foundation',
            contactName: 'Priya Sharma',
            email: 'priya.sharma@akshayapatra.org',
            phone: '+91 99887 76543',
            city: 'Bangalore',
            partnershipType: 'Distribution Partner',
            message: 'As an NGO serving mid-day meals to children, we would like to partner with your platform for additional food distribution. We have established delivery networks and can help reach underserved communities efficiently.',
            status: 'pending',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            organizationName: 'Infosys Foundation',
            contactName: 'Aditya Patel',
            email: 'aditya.patel@infosys.com',
            phone: '+91 97654 32109',
            city: 'Bangalore',
            partnershipType: 'CSR Initiative',
            message: 'We are looking to support food security initiatives as part of our CSR program. We would like to sponsor technology infrastructure and provide funding for logistics to expand your reach across South India.',
            status: 'approved',
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            organizationName: 'Swiggy',
            contactName: 'Meera Reddy',
            email: 'meera.reddy@swiggy.com',
            phone: '+91 98123 45678',
            city: 'Hyderabad',
            partnershipType: 'Technology Partner',
            message: 'We would like to integrate our delivery fleet with your platform to facilitate quick food pickups and deliveries. Our extensive network of delivery partners can help ensure timely distribution of donated food.',
            status: 'pending',
            createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            organizationName: 'Maharashtra State Food Commission',
            contactName: 'Suresh Deshmukh',
            email: 'suresh.deshmukh@maharashtra.gov.in',
            phone: '+91 96543 21098',
            city: 'Pune',
            partnershipType: 'Government Program',
            message: 'We are evaluating private partnerships for our state food security program. However, we need to conduct further compliance assessments before we can proceed with any collaboration.',
            status: 'rejected',
            createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(partnerships).values(samplePartnerships);
    
    console.log('✅ Partnerships seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});