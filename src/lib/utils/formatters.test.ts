/**
 * Date Formatting Utility Tests
 */

import { describe, it, expect } from 'vitest';
import { formatDateTime } from './formatters';

describe('formatDateTime', () => {
  it('should format ISO 8601 date string to DD/MM/YYYY HH:mm', () => {
    const isoDate = '2025-10-06T14:30:00Z';
    const result = formatDateTime(isoDate);

    // Note: Result will vary by timezone, so we check format pattern
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/);
  });

  it('should format Date object to DD/MM/YYYY HH:mm', () => {
    const date = new Date('2025-10-06T14:30:00Z');
    const result = formatDateTime(date);

    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/);
  });

  it('should handle invalid date strings gracefully', () => {
    const invalidDate = 'not-a-date';
    const result = formatDateTime(invalidDate);

    expect(result).toBe('Fecha no disponible');
  });

  it('should handle empty string gracefully', () => {
    const result = formatDateTime('');

    expect(result).toBe('Fecha no disponible');
  });

  it('should pad single-digit days and months with zeros', () => {
    const date = new Date('2025-01-05T09:05:00Z');
    const result = formatDateTime(date);

    // Check that the result contains padded values
    expect(result).toMatch(/^\d{2}\/\d{2}\/2025 \d{2}:\d{2}$/);
  });

  it('should format specific date correctly', () => {
    // Create a date in local timezone to avoid timezone conversion issues
    const date = new Date(2025, 9, 6, 14, 30); // Oct 6, 2025, 14:30
    const result = formatDateTime(date);

    expect(result).toBe('06/10/2025 14:30');
  });
});
