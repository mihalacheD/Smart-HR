import { Alert } from 'react-native';

export function showDemoAlert() {
  Alert.alert(
    'Demo restriction',
    'This action is disabled in demo mode.',
    [{ text: 'OK' }],
    { cancelable: true }
  );
}
