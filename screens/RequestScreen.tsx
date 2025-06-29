import React from 'react';
import { useAuth } from '../context/AuthContext';
import HRRequestsList from '../components/HRRequestsList';
import EmployeeRequestForm from '../components/EmployeeRequestForm';

export default function RequestsScreen() {
  const { role } = useAuth();

  if (role === 'hr') return <HRRequestsList />;
  return <EmployeeRequestForm />;
}
