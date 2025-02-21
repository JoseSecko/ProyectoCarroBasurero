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
  
  const MJOK =()=>{
      Swal.fire(
          'Excelente',
          'Datos guardados correctamente',
          'success' 
      )
  }
  
  const MSJERROR =()=>{
      Swal.fire(
        'Ops!',
        'Por favor llenar los espacios vacios',
        'ERROR'
      )
    }
  
  // Obtener una referencia a Firestore
  const db = firebase.firestore();
  
  // Función para enviar datos a Firebase
  $("#btnmostrar").on('click',()=>{
      // Verificación de que los campos no están vacíos
      const placa = $("#placa").val();
      const marca = $("#marca").val();
      const year = $("#year").val();
      const conductor = $("#conductor").val();
  
      // Remueve la clase 'error' de inputs previos
      $("#placa, #marca, #year, #conductor").removeClass('error');
  
      if(!placa || !marca || !year || !conductor){
          if (!placa) {
              $("#placa").addClass('error');
          }
          if (!marca) {
              $("#marca").addClass('error');
          }
          if (!year) {
              $("#year").addClass('error');
          }
          if (!conductor) {
              $("#conductor").addClass('error');
          }
          MSJERROR();
      } else {
          var camionesref = db.collection("camiones");
          camionesref.doc(placa).set({
              marca: marca,
              year: year,
              conductor: conductor
          });
          MJOK();
      }
  })
  