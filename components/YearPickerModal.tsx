import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import typography from '../constants/typography';

const years = [2025, 2024, 2023, 2022];

type Props = {
  selectedYear: number;
  onChange: (year: number) => void;
};

export default function YearPickerModal({ selectedYear, onChange }: Props) {

  const [visible, setVisible] = useState(false);

  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const handleSelect = (year: number) => {
    onChange(year);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.selector, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.selectorText, { color: colors.textPrimary }]}>
          Year: {selectedYear}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={styles.option}
                >
                  <Text style={[styles.optionText, { color: colors.textPrimary }]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  selectorText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    paddingVertical: 10,
    maxHeight: 300,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: typography.fontSize.base,
  },
});
