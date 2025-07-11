import React, { useState } from 'react';
import { RefreshControl, TouchableOpacity, View, StyleSheet } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import { useThemeColors } from '../hooks/useThemeColor';
import { useRecentRequest } from '../hooks/useRequests';
import { useRecentPayslip } from '../hooks/useRecentPayslip';

import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import ThemedText from '../components/ThemedText';
import RequestCard from '../components/RequestCard';
import HomePayslipCard from '../components/HomePayslipCard';

import typography from '../constants/typography';
import { Ionicons } from '@expo/vector-icons';
import LogoutButton from '../components/LogoutButton';
import { getDisplayName } from '../utils/getDisplayName';
import { useEmployees } from '../hooks/useEmployees';
import { useLastMessage } from '../hooks/useLastMessage';
import HomeMessageCard from '../components/HomeMessageCard';
import HomeCalendarCard from '../components/HomeCalendarCard';
import { useCalendarNotes } from '../hooks/useCalendarNotes';

export default function HomeScreen() {
  const { user, role } = useAuth();
  const { employees } = useEmployees();
  const { lastMessage } = useLastMessage();
  const { toggleTheme, theme } = useThemeContext();
  const { notes } = useCalendarNotes(user?.uid ?? '');
  const colors = useThemeColors();

  const { recentRequest, loadingRequest, refetch: refetchRequest } = useRecentRequest(user?.uid || null, role);
  const { recentPayslip, loadingPayslip, refetch: refetchPayslip } = useRecentPayslip(user?.uid || null, role);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchPayslip(), refetchRequest()]);
    setRefreshing(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const notesForToday = notes.filter(note => note.date === today);

  const displayName = getDisplayName(user?.uid, employees, user);
  const welcomeText = (role === 'hr' || role === 'demo-hr')? 'Welcome, HR' : `Welcome, ${displayName}!`;

  return (
    <PageContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
      style={{ backgroundColor: colors.background }}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Ionicons name="briefcase" size={28} color="#166AF9" />
          <ThemedText style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
            {welcomeText}
          </ThemedText>
        </View>

        <TouchableOpacity onPress={toggleTheme} style={[styles.themeToggle, { backgroundColor: colors.card }]}>
          <Ionicons name={theme === 'dark' ? 'sunny' : 'moon'} size={20} color={theme === 'dark' ? '#FFD700' : '#555'} />
        </TouchableOpacity>
      </View>

      <LogoutButton style={{ marginBottom: 20 }} />

      <HomePayslipCard recentPayslip={recentPayslip} loadingPayslip={loadingPayslip} role={role} />

      {loadingRequest ? (
        <Card title="Recent Request" iconName="calendar-clock">
          <ThemedText>Loading...</ThemedText>
        </Card>
      ) : recentRequest ? (
        <RequestCard
          item={recentRequest}
          title="Recent Request"
          subtitle={recentRequest.userEmail || 'Unknown user'}
        />
      ) : (
        <Card title="Recent Request" iconName="calendar-clock">
          <ThemedText>No recent requests.</ThemedText>
        </Card>
      )}


      {lastMessage ? (
        <HomeMessageCard message={lastMessage} />
      ) : (
        <Card title="Last Message" iconName="chat-outline">
          <ThemedText>No messages yet.</ThemedText>
        </Card>
      )}


      {(role === 'employee' || role === 'demo-employee') && (
        <HomeCalendarCard notesForToday={notesForToday} date={today} />
      )}

    </PageContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerLeft: {
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerText: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    marginLeft: 10,
    flexShrink: 1,
  },
  themeToggle: {
    padding: 6,
    borderRadius: 20,
  },
  hrBot: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
  },
  hrBotText: {
    textAlign: 'center',
    fontSize: typography.fontSize.base,
    fontWeight: '600',
  },
});
