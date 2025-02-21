//import { handleSaveButton } from "./src/saveButtonHandler";

var mapOptions;
var map;
var directionsService = new google.maps.DirectionsService();;
var directionsRenderer = new google.maps.DirectionsRenderer();;

var coordinates = []
var coordenadaslat = []
var coordenadaslng = []

// Configuración de Firebase

//trafico de datos
//innovar para quienes va dirijido
//firebase
// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);

// Obtener la placa desde los parámetros de la URL
const placa = urlParams.get('placa');

console.log(placa); 
const placaElement = document.getElementById('placa');

placaElement.textContent = placa;
console.log("Placa:", placa);

const SaveCarrosBasureros = (CarrosBasureros) =>{

  db.collection("CarrosBasureros").add({
    CarrosBasureros
  })
    .then((docRef) => {
      MJOK();
    })
    .catch((error) => {
      MSJERROR();
    });

}


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
    'los datos no fueron guardados correctamente',
    'ERROR'
    
  )
}
var select = document.getElementById("barrios");

// Obtener los documentos de la colección
db.collection("ZonaCercado").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // Por cada documento, crea una nueva opción en el elemento select
        var option = document.createElement("option");
        option.text = doc.id; // Esto asume que el nombre del barrio está almacenado como el ID del documento
        select.add(option);
    });
});
$("#btnsave").on('click',()=>{
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
      // Si el documento existe, actualizamos el array existente con los nuevos datos
      docRef.update({
        datos: firebase.firestore.FieldValue.arrayUnion(data)
      });
    } else {
      // Si el documento no existe, creamos un nuevo documento con los datos en un array
      docRef.set({
        datos: [data]
      });
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  MJOK();
});


$("#btnmostrar").on('click',()=>{
  var select = document.getElementById("barrios");
  var selectedValue = select.options[select.selectedIndex].value;

  var docRef = db.collection("ZonaCercado").doc(selectedValue);

  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log(doc.data());
      var latitud = doc.data().coordenadaslatitudRuta;
      var longitud = doc.data().coordenadaslongitudRuta;

      var waypoints = [];
      for (var j = 0; j < latitud.length; j++) {
        waypoints.push({
          location: new google.maps.LatLng(latitud[j], longitud[j]),
          stopover: true
        });
      }

      var request = {
        origin: waypoints[0].location,
        destination: waypoints[waypoints.length - 1].location,
        waypoints: waypoints.slice(1, waypoints.length - 1),
        travelMode: google.maps.TravelMode.DRIVING
      };
      // Limpia las rutas antiguas
      directionsRenderer.setMap(null);
      // Crear un nuevo DirectionsRenderer para esta ruta
      directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#000000',  // Cambiar el color de la línea
          strokeOpacity: 1,       // Cambiar la opacidad de la línea
          strokeWeight: 5,        // Cambiar el grosor de la línea
          icons: [{               // Agregar efecto de línea discontinua
            icon: { path: 'M 0,-1 0,1', scale: 1.5, strokeOpacity: 1, strokeColor: '#FFE400' },
            offset: '0',
            repeat: '20px'
          }],
        },
      });

      // Realizar la solicitud de direcciones
      directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            console.error("Directions request failed due to " + status);
        }
      });
    
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});



function InitMap() {
  var location = new google.maps.LatLng(-17.43978709662017, -66.13120327615485)
  mapOptions = {
    zoom: 14,
    styles: [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              }
          ]
      }
  ],
    center: location,
    mapTypeId: google.maps.MapTypeId.RoadMap

  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#000000',  // Cambiar el color de la línea
      strokeOpacity: 1,       // Cambiar la opacidad de la línea
      strokeWeight: 5,        // Cambiar el grosor de la línea
      icons: [{               // Agregar efecto de línea discontinua
        icon: { path: 'M 0,-1 0,1', scale: 1.5, strokeOpacity: 1, strokeColor: '#FFE400' },
        offset: '0',
        repeat: '20px'
      }],
    },
  });

  var all_overlays = [];
  var selectedShape;
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON,
      ],
    },
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 0.2,
      strokeWeight: 3,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
    polygonOptions: {
      clickable: true,
      draggable: false,
      editable: true,
      fillColor: '#FF2F2F',
      fillOpacity: 0.5,
    },
  });

  function clearSelection() {
    if (selectedShape) {
      selectedShape.setEditable(false);
      selectedShape = null;
    }
  }

  function stopDrawing() {
    drawingManager.setMap(null);
  }

  function setSelection(shape) {
    clearSelection();
    stopDrawing();
    selectedShape = shape;
    shape.setEditable(true);
  }

  function deleteSelectedShape() {
    if (selectedShape) {
      selectedShape.setMap(null);
      drawingManager.setMap(map);
      coordinates.splice(0, coordinates.length);
      document.getElementById('info').innerHTML = "";
    }
  }

  function CenterControl(controlDiv, map) {
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Select to delete the shape';
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Borrar ruta seleccionada';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', function () {
      deleteSelectedShape();
    });
  }

  drawingManager.setMap(map);

  var getPolygonCoords = function (newShape) {
    coordinates.splice(0, coordinates.length);
    var len = newShape.getPath().getLength();
    for (var i = 0; i < len; i++) {
      coordinates.push(newShape.getPath().getAt(i).toUrlValue(8));
      if (i == 0) {
        document.getElementById('info2').innerHTML = coordinates;
      }
      coordenadaslat.push(newShape.getPath().getAt(i).lat());
      coordenadaslng.push(newShape.getPath().getAt(i).lng());
    }
    document.getElementById('info').innerHTML = coordinates;
  }

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
    event.getPath().getLength();
    google.maps.event.addListener(event, "dragend", getPolygonCoords(event));

    google.maps.event.addListener(event.getPath(), 'insert_at', function () {
      getPolygonCoords(event);
    });

    google.maps.event.addListener(event.getPath(), 'set_at', function () {
      getPolygonCoords(event);
    });
  });

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
    all_overlays.push(event);
    if (event.type !== google.maps.drawing.OverlayType.MARKER) {
      drawingManager.setDrawingMode(null);

      var newShape = event.overlay;
      newShape.type = event.type;
      google.maps.event.addListener(newShape, 'click', function () {
        setSelection(newShape);
      });
      setSelection(newShape);
    }
  });

  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

}

InitMap()
