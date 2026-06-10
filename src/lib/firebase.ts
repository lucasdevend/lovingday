import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJCGBTDmw7cLw8j-OsVLS9s4v9hHubHaA",
  authDomain: "lovinday-39d48.firebaseapp.com",
  projectId: "lovinday-39d48",
  storageBucket: "lovinday-39d48.firebasestorage.app", // Verifique se no console termina com .app ou .com
  messagingSenderId: "832876184607",
  appId: "1:832876184607:web:96cc91d673b781c846012a",
  measurementId: "G-4YXX493QMC"
};

// Inicialização segura para evitar erros no Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// AQUI ESTÁ O QUE FALTAVA:
export const db = getFirestore(app);
export const storage = getStorage(app);


