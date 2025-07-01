import React, { useState } from 'react';
import { FlatList } from 'react-native';
import AddEmployeeForm from '../components/AddEmployeeForm';
import ThemedContainer from '../components/ThemedContainer';
import TitleHeader from '../components/TitleHeader';
import { Employee, useEmployees } from '../hooks/useEmployees';
import LoadingOrEmpty from '../components/LoadingOrEmpty';
import EmployeeCard from '../components/EmployeeCard';
import EditEmployeeForm from '../components/EditEmployeeForm';



export default function EmployeesScreen() {

  const { employees, loading, fetchEmployees, deleteEmployee, updateEmployee } = useEmployees();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


  if (loading) {
    return <LoadingOrEmpty loading={loading} />
  }


  const handleUpdate = (id: string) => {
    const employee = employees.find(e => e.id === id);
    if (employee) {
      setSelectedEmployee(employee);
      setEditModalVisible(true);
    }
  };




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
            onUpdate={handleUpdate}
          />
        )}
        keyboardShouldPersistTaps="handled"
      />

       {selectedEmployee && (
        <EditEmployeeForm
          employee={selectedEmployee}
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          updateEmployee={updateEmployee}
        />
      )}
    </ThemedContainer>
  );
}

