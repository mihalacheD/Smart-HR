import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useThemeContext } from '../context/ThemeContext';
import { useThemeColors } from '../hooks/useThemeColor';
import typography from '../constants/typography';
import Card from '../components/Card';
import ThemedText from '../components/ThemedText';

export default function HomeScreen() {

  const { toggleTheme, theme } = useThemeContext();
  const colors = useThemeColors();

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      style={{ backgroundColor: colors.background }}>

      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Ionicons name="briefcase" size={28} color="#166AF9" />
          <ThemedText
            style={styles.headerText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Bun venit, Maria!
          </ThemedText>
        </View>

        <TouchableOpacity onPress={toggleTheme} style={[styles.themeToggle, { backgroundColor: colors.card }]}>
          <Ionicons
            name={theme === 'dark' ? 'sunny' : 'moon'}
            size={20}
            color={theme === 'dark' ? '#FFD700' : '#555'}
          />
        </TouchableOpacity>
      </View>

      <Card title="Fluturaș salarial" iconName='file-document-outline' buttonText="Descarcă PDF" onButtonPress={() => alert('Download')}>
        <ThemedText>Aprilie 2025</ThemedText>
      </Card>

      <Card title="Cereri recente" iconName="calendar-clock">
        <ThemedText>Concediu: 3-5 Iunie</ThemedText>
        <ThemedText>Work from home: 10 Iunie</ThemedText>
      </Card>

      <Card title="Mesaj intern" iconName='chat-outline'>
        <ThemedText>“Ședință la ora 10.” — Andrei</ThemedText>
      </Card>

      <Card title="Anunț intern" iconName='bell-outline'>
        <ThemedText>Platforma intră în mentenanță pe 20 Iunie.</ThemedText>
      </Card>

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
    fontWeight: 'semibold',
  },
});
