import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🏠 Bun venit, Maria!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📄 Fluturaș salarial</Text>
        <Text style={styles.cardText}>Aprilie 2025</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Descarcă PDF</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Cereri recente</Text>
        <Text style={styles.cardText}>✅ Concediu: 3-5 Iunie</Text>
        <Text style={styles.cardText}>⏳ Work from home: 10 Iunie</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💬 Mesaj intern</Text>
        <Text style={styles.cardText}>"Ședință la ora 10." — Andrei</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📢 Anunț intern</Text>
        <Text style={styles.cardText}>Platforma intră în mentenanță pe 20 Iunie.</Text>
      </View>

      <TouchableOpacity style={styles.hrBot}>
        <Text style={styles.hrBotText}>🤖 Deschide HR Bot</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 25,
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  cardText: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 4,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  hrBot: {
    marginTop: 30,
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 10,
  },
  hrBotText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});