/**
 * Security utility to sanitize database error messages
 * Prevents exposing internal implementation details to users
 */

interface PostgresError {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
}

/**
 * Maps database error codes to safe, user-friendly messages
 * Full error details are logged to console for debugging
 */
export function getSafeErrorMessage(error: unknown, context?: string): string {
  // Log full error for debugging (server-side only in production)
  console.error(`[${context || 'Database Error'}]:`, error);

  if (!error || typeof error !== 'object') {
    return getGenericMessage(context);
  }

  const pgError = error as PostgresError;
  const code = pgError.code;

  // Map known Postgres error codes to safe messages
  switch (code) {
    // Unique violation
    case '23505':
      return 'This item already exists. Please try with different details.';
    
    // Foreign key violation
    case '23503':
      return 'This action references data that no longer exists.';
    
    // Check constraint violation
    case '23514':
      return 'The provided data does not meet the requirements.';
    
    // Not null violation
    case '23502':
      return 'Please fill in all required fields.';
    
    // Permission denied (RLS)
    case '42501':
      return 'You do not have permission to perform this action.';
    
    // Invalid text representation
    case '22P02':
      return 'Invalid input format. Please check your data.';
    
    // String data right truncation
    case '22001':
      return 'One or more fields exceed the maximum length.';
    
    // Invalid datetime format
    case '22007':
      return 'Invalid date or time format.';
    
    // Division by zero
    case '22012':
      return 'Invalid calculation. Please check your numbers.';
    
    // Insufficient privilege
    case '42000':
    case '42501':
      return 'You do not have permission to perform this action.';
    
    // Connection issues
    case '08000':
    case '08003':
    case '08006':
      return 'Connection issue. Please try again in a moment.';
    
    // Rate limiting or timeout
    case '57014':
      return 'Request timed out. Please try again.';
    
    default:
      break;
  }

  // Handle Supabase Auth errors
  const message = pgError.message?.toLowerCase() || '';
  
  if (message.includes('invalid login credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  
  if (message.includes('email not confirmed')) {
    return 'Please verify your email address before signing in.';
  }
  
  if (message.includes('user already registered')) {
    return 'An account with this email already exists.';
  }
  
  if (message.includes('password')) {
    return 'Password does not meet requirements. Use at least 6 characters.';
  }
  
  if (message.includes('rate limit') || message.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment before trying again.';
  }
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Return context-specific generic message
  return getGenericMessage(context);
}

/**
 * Returns a generic error message based on the operation context
 */
function getGenericMessage(context?: string): string {
  switch (context) {
    case 'create':
    case 'insert':
      return 'Failed to save. Please try again.';
    case 'update':
      return 'Failed to update. Please try again.';
    case 'delete':
      return 'Failed to delete. Please try again.';
    case 'fetch':
    case 'load':
      return 'Failed to load data. Please refresh the page.';
    case 'auth':
      return 'Authentication failed. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
}

/**
 * Type guard to check if an error has a message property
 */
export function hasMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}
