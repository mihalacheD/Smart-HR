# SmartHR 👩‍💼👨‍💼

SmartHR is a modern React Native mobile app designed to simplify HR processes for both employees and HR personnel. It offers an intuitive interface and essential features like payslips, internal chat, requests, and employee management — all in one place.

## ✨ Features

### 🔒 Authentication

- Firebase Auth with role-based access (`employee`, `hr`)
- Secure login and protected routes

### 👩‍🏫 For HR users

- Add/view/delete employees
- Upload payslips for each employee
- Respond to leave or custom requests
- Internal chat with employees

### 🧑‍💼 For Employees

- View personal payslips
- Submit requests (leave, custom)
- View personal notes in calendar
- Chat with HR and colleagues

### ☁️ Backend

- Firebase Firestore
- Firebase Storage
- Firebase Auth

## 🛠 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase (Auth, Firestore, Storage)](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [TailwindCSS for RN (Nativewind)](https://www.nativewind.dev/)

## 🚀 SmartHR Demo (Expo Go)

You can test the SmartHR app directly on your phone using **Expo Go**:

1. Install Expo Go:
   - [App Store (iPhone)](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Open this link:
   👉 [SmartHR Live Demo](https://expo.dev/accounts/mihalached/projects/SmartHR/updates/dbe0d9dd-7bec-4cd4-acf2-1b3a3e1a8494)

3. Or scan the QR code below:

![SmartHR QR Code](./smarthr_qr_code.png)

### 🔐 Demo Credentials

| Email                 | Password | Role     |
| --------------------- | -------- | -------- |
| demo.hr@example.com   | demo1234 | HR       |
| demo.employee1@ex.com | demo1234 | Employee |

    ✅ These accounts are read-only. Some actions (like adding, deleting, or editing data) will show a demo alert instead of performing the actual operation.
