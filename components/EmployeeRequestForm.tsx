import React from 'react';
import {
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useEmployeeRequests } from '../hooks/useEmployeeRequests';

import RequestCard from './RequestCard';
import LoadingOrEmpty from './LoadingOrEmpty';
import EmployeeRequestFormFields from './EmployeeRequestFormFields';
import TitleHeader from './TitleHeader';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

export default function EmployeeRequestForm() {
  const { user } = useAuth();
  const { requests, refetch, loading } = useEmployeeRequests(user?.uid ?? null);
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={requests}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <TitleHeader title="Requests" />
            <EmployeeRequestFormFields
              userId={user.uid}
              userEmail={user.email ?? ''}
              onSuccess={refetch}
            />
          </>
        }
        renderItem={({ item }) => <RequestCard item={item} />}
        ListEmptyComponent={
          <LoadingOrEmpty
            loading={loading}
            emptyMessage="No requests found."
          />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20 }}
      />

    </TouchableWithoutFeedback>
  );
}
