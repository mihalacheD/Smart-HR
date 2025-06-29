import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/Button';
import { useThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useThemeColors } from '../hooks/useThemeColor';
import typography from '../constants/typography';
import Card from '../components/Card';
import ThemedText from '../components/ThemedText';

import { collection, query, where, orderBy, limit, getDocs, DocumentData, Query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Spinner from '../components/Spinner';

export default function HomeScreen() {
  const { user, role, logout } = useAuth();
  const { toggleTheme, theme } = useThemeContext();
  const colors = useThemeColors();
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  const [recentPayslip, setRecentPayslip] = useState<any | null>(null);
  const [loadingPayslip, setLoadingPayslip] = useState(false);

  // Fetch cel mai recent payslip
const fetchRecentPayslip = async () => {
  if (!user) return;

  setLoadingPayslip(true);
  try {
    const payslipRef = collection(db, 'payslips');
    let q: Query<unknown, DocumentData>;

    if (role === 'hr') {
      q = query(payslipRef, orderBy('orderIndex', 'desc'), limit(1));
    } else {
      q = query(payslipRef, where('userId', '==', user.uid), orderBy('orderIndex', 'desc'), limit(1));
    }

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      setRecentPayslip({ id: doc.id, ...(doc.data() as object) });
    } else {
      setRecentPayslip(null);
    }
  } catch (error) {
    console.error('Fetch payslip error:', error);
    Alert.alert('Error loading payslip');
    setRecentPayslip(null);
  }
  setLoadingPayslip(false);
};


  useEffect(() => {
    fetchRecentPayslip();
  }, [user, role]);

  // Titlu dinamic pentru payslip card
  const payslipCardTitle = role === 'hr' ? 'Most Recent Payslip in System' : 'Your Most Recent Payslip';

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      style={{ backgroundColor: colors.background }}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Ionicons name="briefcase" size={28} color="#166AF9" />
          <ThemedText style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
            Bun venit, {user?.email ?? 'Utilizator'}!
          </ThemedText>
        </View>

        <TouchableOpacity onPress={toggleTheme} style={[styles.themeToggle, { backgroundColor: colors.card }]}>
          <Ionicons name={theme === 'dark' ? 'sunny' : 'moon'} size={20} color={theme === 'dark' ? '#FFD700' : '#555'} />
        </TouchableOpacity>
      </View>

      <CustomButton
        title="Logout"
        onPress={async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert('Error', 'Logout failed');
          }
        }}
        style={{ marginBottom: 20 }}
      />

      {/* Recent Payslip */}
      {loadingPayslip ? (
         <Spinner />
      ) : recentPayslip ? (
        <TouchableOpacity onPress={() => navigation.navigate('Payslip')}>
          <Card title={payslipCardTitle} iconName="file-document-outline" buttonText="View Details" onButtonPress={() => navigation.navigate('Payslip')}>
            <ThemedText>Month: {recentPayslip.month}</ThemedText>
            <ThemedText>Year: {recentPayslip.year}</ThemedText>
            <ThemedText>File: {recentPayslip.file}</ThemedText>
            {role === 'hr' && <ThemedText>Employee ID: {recentPayslip.userId}</ThemedText>}
          </Card>
        </TouchableOpacity>
      ) : (
        <ThemedText style={{ marginBottom: 20 }}>
          {role === 'hr' ? 'No payslips found in the system.' : 'You have no payslips yet.'}
        </ThemedText>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
        <Card title="Cereri recente" iconName="calendar-clock">
          <ThemedText>Concediu: 3-5 Iunie</ThemedText>
          <ThemedText>Work from home: 10 Iunie</ThemedText>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Card title="Mesaj intern" iconName="chat-outline">
          <ThemedText>“Ședință la ora 10.” — Andrei</ThemedText>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Card title="Anunț intern" iconName="bell-outline">
          <ThemedText>Platforma intră în mentenanță pe 20 Iunie.</ThemedText>
        </Card>
      </TouchableOpacity>

      {role === 'employee' && (
        <TouchableOpacity
          style={[styles.hrBot, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('HRBot')}
        >
          <Text style={[styles.hrBotText, { color: colors.card }]}>🤖 Deschide HR Bot</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  themeToggle: {
    padding: 6,
    borderRadius: 20,
  },
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
