import { NextRequest } from 'next/server';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

/**
 * Get current user from request headers (bearer token)
 * This is a server-side authentication helper
 */
export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    // Get bearer token from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return null;
    }

    // Parse the token (in this simple implementation, it's a JSON string)
    // In production, this would validate JWT tokens
    try {
      const userData = JSON.parse(atob(token));
      
      return {
        id: parseInt(userData.id) || 1,
        email: userData.email || '',
        name: userData.name || '',
        role: userData.role || 'donor'
      };
    } catch {
      // If token is invalid, return null
      return null;
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Create a bearer token from user data
 * This is used client-side to create tokens for API calls
 */
export function createBearerToken(user: { id: string | number; email: string; name: string; role: string }): string {
  const userData = {
    id: user.id.toString(),
    email: user.email,
    name: user.name,
    role: user.role
  };
  
  return btoa(JSON.stringify(userData));
}
