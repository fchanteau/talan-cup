import { format, fromUnixTime, getUnixTime, parse } from "date-fns";

export function formatDate(date: number): string {
  return format(fromUnixTime(date), "dd/MM/yyyy");
}

export function formatDateTime(date: number): string {
  return format(fromUnixTime(date), "dd/MM/yyyy HH:mm");
}

export function formatDateForCalendar(date: number): string {
  return format(fromUnixTime(date), "yyyy-MM-dd'T'HH:mm:ss");
}

/**
 * Converts a date string in format "dd/MM/yyyy HH:mm" to a Unix timestamp
 * @param dateString The date string in format "dd/MM/yyyy HH:mm"
 * @returns Unix timestamp (seconds since epoch)
 */
export function stringToUnixTime(dateString: string): number {
  const parsedDate = parse(dateString, "dd/MM/yyyy HH:mm", new Date());
  return getUnixTime(parsedDate);
}

/**
 * Converts a date to a Unix timestamp
 * @param date The date to convert
 * @returns Unix timestamp (seconds since epoch)
 */
export function dateToUnixTime(date: Date): number {
  return getUnixTime(date);
}

export function unixTimeToDate(unixTime: number): Date {
  return fromUnixTime(unixTime);
}
