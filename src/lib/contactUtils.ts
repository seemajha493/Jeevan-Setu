/**
 * Utility functions for safely handling contact information
 * Prevents URL injection attacks when using contact data in tel: or mailto: links
 */

/**
 * Sanitizes a phone number by removing all non-phone characters
 * This prevents injection of javascript:, data:, or other protocol handlers
 */
export function sanitizePhoneNumber(phone: string): string {
  // Only allow digits, plus sign (for international), spaces, dashes, and parentheses
  return phone.replace(/[^0-9+\-\s()]/g, '');
}

/**
 * Validates if a string looks like a phone number
 * Returns true if it contains only valid phone characters
 */
export function isValidPhoneFormat(phone: string): boolean {
  // Must contain at least some digits and only valid phone characters
  const sanitized = sanitizePhoneNumber(phone);
  const hasDigits = /\d/.test(sanitized);
  const validFormat = /^[\+]?[0-9\s\-()]+$/.test(sanitized);
  return hasDigits && validFormat && sanitized.length >= 10;
}

/**
 * Validates if a string is a valid email address
 */
export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Determines if a contact string is a phone number or email
 * and returns the appropriate href for a link
 */
export function getContactHref(contact: string): string | null {
  const trimmed = contact.trim();
  
  // Check if it's an email
  if (isValidEmailFormat(trimmed)) {
    return `mailto:${trimmed}`;
  }
  
  // Check if it's a phone number
  const sanitizedPhone = sanitizePhoneNumber(trimmed);
  if (sanitizedPhone.length >= 10) {
    return `tel:${sanitizedPhone}`;
  }
  
  // Invalid or unsafe contact format
  return null;
}

/**
 * Opens a contact link safely
 * Returns false if the contact format is invalid
 */
export function openContact(contact: string): boolean {
  const href = getContactHref(contact);
  if (href) {
    window.open(href, '_self');
    return true;
  }
  return false;
}
