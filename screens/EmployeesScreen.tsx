import React from 'react';
import { FlatList } from 'react-native';
import AddEmployeeForm from '../components/AddEmployeeForm';
import ThemedContainer from '../components/ThemedContainer';
import TitleHeader from '../components/TitleHeader';
import { useEmployees } from '../hooks/useEmployees';
import LoadingOrEmpty from '../components/LoadingOrEmpty';
import EmployeeCard from '../components/EmployeeCard';



export default function EmployeesScreen() {

  const { employees, fetchEmployees, deleteEmployee, loading } = useEmployees();

  if (loading) {
    return <LoadingOrEmpty loading={loading} />
  }

  return (
    <ThemedContainer>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={
          <>
            <TitleHeader title="Employees" />
            <AddEmployeeForm onAdded={fetchEmployees} />
          </>
        }
        renderItem={({ item }) => (
          <EmployeeCard
            id={item.id}
            email={item.email}
            role={item.role}
            fullName={item.fullName}
            position={item.position}
            onDelete={deleteEmployee}
          />
        )}
        keyboardShouldPersistTaps="handled"
      />
    </ThemedContainer>
  );
}

