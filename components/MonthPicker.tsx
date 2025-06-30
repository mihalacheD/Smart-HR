import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColor';
import ThemedText from './ThemedText';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

type Props = {
  selectedMonth: string;
  onSelect: (month: string) => void;
};

export default function MonthPicker({ selectedMonth, onSelect }: Props) {
  const colors = useThemeColors();
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.dropdown, { borderColor: colors.border }]}
      >
        <ThemedText>{selectedMonth || 'Select month'}</ThemedText>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalBackground} onPress={() => setVisible(false)}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <FlatList
              data={months}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={{ color: colors.textPrimary }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 30,
  },
  modalContent: {
    borderRadius: 8,
    padding: 10,
    maxHeight: '60%',
  },
  item: {
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
