import type { Employee } from '../hooks/useEmployees';

export function getDisplayName(userId: string | undefined | null, employees: Employee[], fallbackUser?: { fullName?: string; email?: string }) {
  if (!userId) {
    if (fallbackUser?.fullName) return fallbackUser.fullName;
    if (fallbackUser?.email) return fallbackUser.email;
    return 'User';
  }

  // caută în listă după id sau uid
  const employee = employees.find(emp => emp.id === userId || emp.uid === userId);

  if (employee?.fullName) return employee.fullName;

  if (fallbackUser?.fullName) return fallbackUser.fullName;
  if (fallbackUser?.email) return fallbackUser.email;

  return 'User';
}
