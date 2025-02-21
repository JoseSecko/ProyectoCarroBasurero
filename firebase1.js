
// Configuración de Firebase
const firebaseConfig = {
  // Aquí va la configuración de tu proyecto de Firebase
  
  apiKey: "AIzaSyAgsHd9DRcg5jpp1dNsEQFmFe2mcR6bTLA",
  authDomain: "proyecto-carro-basurero.firebaseapp.com",
  projectId: "proyecto-carro-basurero",
  storageBucket: "proyecto-carro-basurero.appspot.com",
  messagingSenderId: "835858854447",
  appId: "1:835858854447:web:8d53a27fa430b4ea688cda",
  measurementId: "G-5M250HE80K"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener una referencia a Firestore
const db = firebase.firestore();


