/**
 * Date and String Formatting Utilities
 */

/**
 * Format a date string or Date object to "DD/MM/YYYY HH:mm" format
 * @param date - ISO 8601 date string or Date object
 * @returns Formatted date string in Spanish format
 */
export function formatDateTime(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return 'Fecha no disponible';
    }

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return 'Fecha no disponible';
  }
}
