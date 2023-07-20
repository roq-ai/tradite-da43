const mapping: Record<string, string> = {
  'journal-entries': 'journal_entry',
  simulations: 'simulation',
  traders: 'trader',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
