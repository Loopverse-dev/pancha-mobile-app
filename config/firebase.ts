import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
// @ts-expect-error - getReactNativePersistence exists at runtime in React Native but not in type definitions
import { initializeAuth, getAuth, Auth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0EL98pBN_6_jA2WxBWDy_FC-Du04kyX8",
  authDomain: "pancha-app-ea83a.firebaseapp.com",
  projectId: "pancha-app-ea83a",
  storageBucket: "pancha-app-ea83a.firebasestorage.app",
  messagingSenderId: "837315114193",
  appId: "1:837315114193:web:41c97e9ad130e3ecb0c1f0",
  measurementId: "G-LXLKLL7ZW4"
};

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
  // First time initialization
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} else {
  // Already initialized (hot reload)
  app = getApps()[0];
  auth = getAuth(app);
}

// Initialize Firestore Database
const db = getFirestore(app);

// Disable Firestore network to prevent connection warnings
// This makes Firestore work in offline-only mode until you enable it in Firebase Console
// Remove these lines once Firestore is enabled in Firebase Console
disableNetwork(db).catch((error) => {
  console.log('[Firebase] Firestore network already disabled or error:', error.message);
});

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, auth, db, storage };
