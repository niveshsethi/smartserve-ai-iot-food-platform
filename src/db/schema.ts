import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull(), // 'donor', 'ngo', 'shelter', 'logistics', 'volunteer', 'admin'
  organization: text('organization'),
  phone: text('phone'),
  location: text('location'),
  createdAt: text('created_at').notNull(),
});

// Donations table
export const donations = sqliteTable('donations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  donorId: integer('donor_id').references(() => users.id).notNull(),
  foodType: text('food_type').notNull(), // 'cooked', 'packaged', 'produce', 'bakery', 'dairy', 'other'
  title: text('title').notNull(),
  quantity: integer('quantity').notNull(),
  unit: text('unit').notNull(), // 'kg', 'servings', 'items'
  expiryDate: text('expiry_date').notNull(),
  pickupLocation: text('pickup_location').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  aiCategory: text('ai_category'), // 'human', 'animal'
  aiConfidence: real('ai_confidence'),
  status: text('status').notNull().default('available'), // 'available', 'claimed', 'in_transit', 'completed', 'cancelled'
  isRecurring: integer('is_recurring', { mode: 'boolean' }).default(false),
  distance: real('distance'), // distance in km
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Claims table
export const claims = sqliteTable('claims', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  donationId: integer('donation_id').references(() => donations.id).notNull(),
  recipientId: integer('recipient_id').references(() => users.id).notNull(),
  claimedAt: text('claimed_at').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'accepted', 'completed', 'cancelled'
});

// Deliveries table
export const deliveries = sqliteTable('deliveries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  donationId: integer('donation_id').references(() => donations.id).notNull(),
  claimId: integer('claim_id').references(() => claims.id).notNull(),
  driverId: integer('driver_id').references(() => users.id).notNull(),
  pickupAddress: text('pickup_address').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  pickupTime: text('pickup_time'),
  deliveryTime: text('delivery_time'),
  distanceKm: real('distance_km'),
  status: text('status').notNull().default('pickup_pending'), // 'pickup_pending', 'in_transit', 'completed', 'cancelled'
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Sensor data table
export const sensorData = sqliteTable('sensor_data', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  deliveryId: integer('delivery_id').references(() => deliveries.id).notNull(),
  phLevel: real('ph_level'),
  gasPpm: real('gas_ppm'),
  temperatureCelsius: real('temperature_celsius'),
  bioSafetyPercent: real('bio_safety_percent'),
  status: text('status').notNull(), // 'normal', 'warning', 'critical'
  recordedAt: text('recorded_at').notNull(),
});

// Notifications table
export const notifications = sqliteTable('notifications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').notNull(), // 'new_donation', 'claim_accepted', 'delivery_update', 'alert'
  isRead: integer('is_read', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
});

// Partnerships table
export const partnerships = sqliteTable('partnerships', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  organizationName: text('organization_name').notNull(),
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  city: text('city').notNull(),
  partnershipType: text('partnership_type').notNull(),
  message: text('message'),
  status: text('status').notNull().default('pending'), // 'pending', 'approved', 'rejected'
  createdAt: text('created_at').notNull(),
});

// Donor stats table
export const donorStats = sqliteTable('donor_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  totalDonations: integer('total_donations').default(0),
  mealsProvided: integer('meals_provided').default(0),
  activeDonations: integer('active_donations').default(0),
  successRate: real('success_rate').default(0),
  updatedAt: text('updated_at').notNull(),
});

// Recipient stats table
export const recipientStats = sqliteTable('recipient_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  totalReceived: integer('total_received').default(0),
  peopleFed: integer('people_fed').default(0),
  activeClaims: integer('active_claims').default(0),
  newAlerts: integer('new_alerts').default(0),
  updatedAt: text('updated_at').notNull(),
});

// Logistics stats table
export const logisticsStats = sqliteTable('logistics_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  activeJobs: integer('active_jobs').default(0),
  totalDeliveries: integer('total_deliveries').default(0),
  successRate: real('success_rate').default(0),
  avgDeliveryTimeMinutes: integer('avg_delivery_time_minutes').default(0),
  updatedAt: text('updated_at').notNull(),
});