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

## Live Demo

You can test the **SmartHR** app directly on your phone using **Expo Go**:

1. Install [Expo Go](https://expo.dev/go) from the App Store or Google Play.
2. Scan the QR code below with your phone camera or open it using Expo Go.

![SmartHR QR Code](./smarthr_qr_code.png)

Alternatively, open this link on your mobile device:
[https://expo.dev/accounts/mihalached/projects/SmartHR/updates/3720f312-6233-4a96-b68a-90b441baf259](https://expo.dev/accounts/mihalached/projects/SmartHR/updates/3720f312-6233-4a96-b68a-90b441baf259)

🔐 Demo Accounts

You can log in with the following demo credentials:
Email Password
demo.hr@example.com demo1234
demo.employee1@ex.com demo1234

    ✅ These accounts are read-only. Some actions (like adding, deleting, or editing data) will show a demo alert instead of performing the actual operation.
