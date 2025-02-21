
var mapOptions;
var map;

var coordinates = []
var coordenadaslat = []
var coordenadaslng = []

//firebase

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

// $("#btnsave").on('click',()=>{

//     let coordenadaslatitud = coordenadaslat;
//     let coordenadaslongitud = coordenadaslng;
//     let nombre = $("#nombre").val();
//     let hora = $("#hora").val();
//     let semana = $("#semana").val();

//     const CarrosBasureros = {
//         coordenadaslatitud,
//         coordenadaslongitud,
//         nombre,
//         hora,
//         semana
//     }
//     SaveCarrosBasureros(CarrosBasureros);
// })
$("#btnsave").on('click',()=>{
var CarrosBasurerosRef = db.collection("ZonaCercado");
CarrosBasurerosRef.doc($("#barrio").val()).set({
coordenadaslatitud: coordenadaslat,
coordenadaslongitud: coordenadaslng
});
MJOK();
})

const db1 = firebase.firestore()
$("#btnmostrar").on('click',()=>{
    //lista de colecciones
    var prueba = db1.collection("ZonaCercado");
    var array = []
    prueba.get().then((doc) => {
        array = doc.docs
        for (var i = 0; i < array.length; i++) {
            var array2 = []
            array2.push(array[i].id)
            var docRef = db1.collection("ZonaCercado").doc(array[i].id);
            console.log("dsfsdfsf",array[i].id)
            var k = 0;
            var colores = ['2F74FF', '#FF2F2F', '#61FF2F', '#FFAC2F','#FF602F', '#8F2FFF', '#2F40FF', '#171800']
        
        docRef.get().then((doc) => {
        if (doc.exists) {
            //ruta
            var latitud = doc.data().coordenadaslatitud;
            var longitud = doc.data().coordenadaslongitud;
            console.log("sda",latitud)
            var flightPlanCoordinates1 = [];
            for (var j = 0; j < latitud.length; j++) {
                flightPlanCoordinates1.push({lat: latitud[j], lng: longitud[j]})
            }
            // Información de la ruta (coordenadas, color de línea, etc...)
            var flightPath1 = new google.maps.Polygon({
            path: flightPlanCoordinates1,
            geodesic: true,
            fillColor: colores[k],
            strokeColor: '#000818',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            //fillColor: '#ADFF2F'
            });
            flightPlanCoordinates1 = []
            latitud = []
            longitud = []
            docRef = [];
            // Creando la ruta en el mapa
            flightPath1.setMap(map);
            flightPath1 = []
            console.log("Document data:", doc.data().coordenadaslatitud);
            console.log("Document datazcc:", latitud.length);
            k = k +1;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        }
        
    }
        )
        

})

function InitMap() {
    var location = new google.maps.LatLng(-17.43978709662017, -66.13120327615485)
    mapOptions = {
        zoom: 13,
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
        
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)
    var all_overlays = [];
    var selectedShape;
    var drawingManager = new google.maps.drawing.DrawingManager({
        //drawingMode: google.maps.drawing.OverlayType.MARKER,
        //drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                //google.maps.drawing.OverlayType.MARKER,
                //google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                //google.maps.drawing.OverlayType.RECTANGLE
            ]
        },
        markerOptions: {
            //icon: 'images/beachflag.png'
        },
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 0.2,
            strokeWeight: 3,
            clickable: false,
            editable: true,
            zIndex: 1
        },
        polygonOptions: {
            clickable: true,
            draggable: false,
            editable: true,
            // fillColor: '#ffff00',
            fillColor: '#FF2F2F',
            fillOpacity: 0.5,

        },
        rectangleOptions: {
            clickable: true,
            draggable: true,
            editable: true,
            fillColor: '#ffff00',
            fillOpacity: 0.5,
        }
    });

    function clearSelection() {
        if (selectedShape) {
            selectedShape.setEditable(false);
            selectedShape = null;
        }
    }
    //to disable drawing tools
    function stopDrawing() {
        drawingManager.setMap(null);
    }

    function setSelection(shape) {
        clearSelection();
        stopDrawing()
        selectedShape = shape;
        shape.setEditable(true);
    }

    function deleteSelectedShape() {
        if (selectedShape) {
            selectedShape.setMap(null);
            drawingManager.setMap(map);
            coordinates.splice(0, coordinates.length)
            document.getElementById('info').innerHTML = ""
        }
    }

    function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
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

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Borrar ruta seleccionada';
        controlUI.appendChild(controlText);

        //to delete the polygon
        controlUI.addEventListener('click', function () {
            deleteSelectedShape();
        });
    }

    drawingManager.setMap(map);

    var getPolygonCoords = function (newShape) {

        coordinates.splice(0, coordinates.length)
        var len = newShape.getPath().getLength();
        for (var i = 0; i < len; i++) {
            coordinates.push(newShape.getPath().getAt(i).toUrlValue(8))
            if(i == 0){
                document.getElementById('info2').innerHTML = coordinates
            }
            coordenadaslat.push(newShape.getPath().getAt(i).lat())
            coordenadaslng.push(newShape.getPath().getAt(i).lng())
        }
        document.getElementById('info').innerHTML = coordinates
        //document.getElementById('info').innerHTML = newShape.getPath().getAt(0).lng()
        
    }

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
        event.getPath().getLength();
        google.maps.event.addListener(event, "dragend", getPolygonCoords(event));

        google.maps.event.addListener(event.getPath(), 'insert_at', function () {
            getPolygonCoords(event)
            
        });

        google.maps.event.addListener(event.getPath(), 'set_at', function () {
            getPolygonCoords(event)
        })
    })

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
    })

    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

    //Dibujar rutas
    // var flightPlanCoordinates = [
    //     {lat: -16.502227, lng: -68.162026},
    //     {lat: -16.523622, lng: -68.169579},
    //     {lat: -16.5358, lng: -68.14898},
    //     {lat: -16.515722, lng: -68.147607}
    //   ];
       
    //   // Información de la ruta (coordenadas, color de línea, etc...)
    //   var flightPath = new google.maps.Polyline({
    //     path: flightPlanCoordinates,
    //     geodesic: true,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    //   });

    //Dibujar rutas  
                    //     var flightPlanCoordinates = [];
                    //     for (var i = 0; i < len; i++) {
                        
                    //       flightPlanCoordinates.push({lat: coordenadaslat[i], lng: coordenadaslng[i]})
                        
                    //   }
                    //   console.log("aqui",flightPlanCoordinates);
                    //     // Información de la ruta (coordenadas, color de línea, etc...)
                    //     var flightPath = new google.maps.Polyline({
                    //       path: flightPlanCoordinates,
                    //       geodesic: true,
                    //       strokeColor: '#FF0000',
                    //       strokeOpacity: 2.0,
                    //       strokeWeight: 2
                    //     });
                    //     // Creando la ruta en el mapa
                    //     flightPath.setMap(map);

      /*var newFlightPlanCoordinates = [];
      // Filtrando el primero y el último punto
      for (i = 0; i < flightPlanCoordinates.length; i++) {
          if (i != 0 && i != (flightPlanCoordinates.length - 1)) {
              newFlightPlanCoordinates.push(flightPlanCoordinates[i]);
          }
      }
      // Nuevo estilo para el camino intermedio
      var flightPath = new google.maps.Polyline({
          path: newFlightPlanCoordinates,
          geodesic: true,
          strokeColor: 'blue',
          strokeOpacity: 2.0,
          strokeWeight: 2
      });*/
      
      // Inicializando el mapa cuando se carga la página
     // google.maps.event.addDomListener(window, 'load', initialize);

     

}

InitMap()
