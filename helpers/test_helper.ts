// export function addDays(date: string, days: number): string {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result.toISOString().split('T')[0];
// }

// Used to convert and output date into format Month Day, Year
// Example: 'November 2, 2003'
export function formatDateToLocaleStringArray(date: Date): string {
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate;
}

export function returnDateArray(date: Date): string[] {
  const formattedDate = formatDateToLocaleStringArray(date);
  return formattedDate.replace(',', '').split(' ');
}