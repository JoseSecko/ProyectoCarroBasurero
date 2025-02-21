// saveButtonHandler.js
import { db } from './firebase1';

    
export const handleSaveButton = (placa, coordenadaslat, coordenadaslng, MJOK) => {
  var CarrosBasurerosRef = db.collection("CarrosBasureros");
  var ZonaCercadoRef = db.collection("ZonaCercado");
  var select = document.getElementById("barrios");
  var selectedValue = select.options[select.selectedIndex].value;

  ZonaCercadoRef.doc(selectedValue).update({
    coordenadaslatitudRuta: coordenadaslat,
    coordenadaslongitudRuta: coordenadaslng
  });

  var data = {
    barrio: selectedValue,
    horainicio: $("#horainicio").val(),
    horafinal: $("#horafinal").val(),
    semana: $("#semana").val(),
  };

  var docRef = CarrosBasurerosRef.doc(placa);

  docRef.get().then((doc) => {
    if (doc.exists) {
      docRef.update({
        datos: firebase.firestore.FieldValue.arrayUnion(data)
      });
    } else {
      docRef.set({
        datos: [data]
      });
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  MJOK();
};

