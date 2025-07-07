export function isDemoUser(role: string | null): boolean {
  return role === 'demo-hr' || role === 'demo-employee';
}
