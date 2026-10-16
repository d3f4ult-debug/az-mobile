import { Order, Customer } from '@/types/ecommerce';
import { dbGetOrders, dbGetCustomers, getDatabaseStatus } from '@/lib/db/neon';

/**
 * Headless API Client - Orders & Customers Service (Neon Postgres Connected)
 */
export async function fetchOrders(): Promise<Order[]> {
  try {
    return await dbGetOrders();
  } catch (error) {
    console.warn('[AZ Mobile API] Orders fetch error:', error);
    return [];
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    return await dbGetCustomers();
  } catch (error) {
    console.warn('[AZ Mobile API] Customers fetch error:', error);
    return [];
  }
}

export async function fetchDatabaseHealth() {
  return await getDatabaseStatus();
}
