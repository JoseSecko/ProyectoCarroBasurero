// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAgsHd9DRcg5jpp1dNsEQFmFe2mcR6bTLA",
    authDomain: "proyecto-carro-basurero.firebaseapp.com",
    projectId: "proyecto-carro-basurero",
    storageBucket: "proyecto-carro-basurero.appspot.com",
    messagingSenderId: "835858854447",
    appId: "1:835858854447:web:8d53a27fa430b4ea688cda",
    measurementId: "G-5M250HE80K"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const listaCamionesDiv = document.getElementById('lista_camiones');
  const loadingDiv = document.getElementById('loading');

  loadingDiv.style.display = "flex";
  
  db.collection("camiones").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const btn = document.createElement('button');
          btn.classList.add("btn");
          btn.textContent = `Placa: ${doc.id}, Marca: ${doc.data().marca}, Año: ${doc.data().year}, Conductor: ${doc.data().conductor}`;
          listaCamionesDiv.appendChild(btn);
          btn.addEventListener('click', function() {
            window.location.href = `mapa.html?placa=${doc.id}`;
        });
        
        listaCamionesDiv.appendChild(btn);
      });
  }).finally(() => {
    // Ocultar animación de carga
    loadingDiv.style.display = "none";
});
  
  