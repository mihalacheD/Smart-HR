import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '../context/ThemeContext';
import { useThemeColors } from '../hooks/useThemeColor';
import typography from '../constants/typography';

export default function HomeScreen() {

  const { toggleTheme, theme } = useThemeContext();
  const colors = useThemeColors();

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      style={{ backgroundColor: colors.background }}>

      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: colors.textPrimary }]}>🏠 Bun venit, Maria!</Text>
        <TouchableOpacity onPress={toggleTheme} style={[styles.themeToggle, { backgroundColor: colors.card }]}>
          <Ionicons
            name={theme === 'dark' ? 'sunny' : 'moon'}
            size={22}
            color={theme === 'dark' ? '#FFD700' : '#555'}
          />
        </TouchableOpacity>
      </View>


      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>📄 Fluturaș salarial</Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>Aprilie 2025</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]}>
          <Text style={[styles.buttonText, { color: colors.card }]}>Descarcă PDF</Text>
        </TouchableOpacity>
      </View>

      {/* alte carduri la fel... */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>📅 Cereri recente</Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>✅ Concediu: 3-5 Iunie</Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>⏳ Work from home: 10 Iunie</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>💬 Mesaj intern</Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>“Ședință la ora 10.” — Andrei</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>📢 Anunț intern</Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>Platforma intră în mentenanță pe 20 Iunie.</Text>
      </View>

      <TouchableOpacity style={[styles.hrBot, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.hrBotText, { color: colors.card }]}>🤖 Deschide HR Bot</Text>
      </TouchableOpacity>
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
    backgroundColor: '#eee'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerText: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
  },
  card: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'semibold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: typography.fontSize.base,
    marginBottom: 4,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'semibold',
  },
  hrBot: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
  },
  hrBotText: {
    textAlign: 'center',
    fontSize: typography.fontSize.base,
    fontWeight: 'semibold',
  },
});
