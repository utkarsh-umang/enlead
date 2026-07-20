export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Years offered when picking a campaign month. Export looks forward (you
 * schedule a send); import looks back (the campaign already ran), so this
 * spans both sides of the current year. */
export function campaignYears(now: Date = new Date()): number[] {
  const y = now.getFullYear();
  return [y - 1, y, y + 1];
}
