import React from 'react';
import { Alert } from 'react-native';
import CustomButton from './Button';
import { useAuth } from '../context/AuthContext';

export default function LogoutButton({ style }: { style?: object }) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Logout failed');
    }
  };

  return (
    <CustomButton
      title="Logout"
      onPress={handleLogout}
      style={style}
    />
  );
}
