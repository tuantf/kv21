/**
 * Helper function handles comma and dot decimal separators
 * Parses a value to a number, handling both comma and dot as decimal separators
 * @param value - The value to parse (can be string, number, null, or undefined)
 * @returns A rounded integer number (0 if value is invalid or empty)
 */
export function parseValue(value: any): number {
  if (value == null || value === '') return 0
  const str = String(value).trim()
  if (str === '') return 0

  // Replace comma with dot for decimal parsing
  const normalized = str.replace(',', '.')
  const parsed = parseFloat(normalized)
  return isNaN(parsed) ? 0 : Math.round(parsed)
}
