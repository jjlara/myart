// Deteccion de eventos

$(document).on("pageshow","#llevame", initialize);
$(document).on("pageshow","#subirfotos", tomarfoto);
$(document).on("pageshow","#migaleria", mostrarfotos);
$(document).ready(function(){
	$("#map-canvas").css("height", $("#llevame").height()-35-25);
});

document.addEventListener("deviceready", init);
document.addEventListener("offline", function(){
	navigator.notificacion.alert("acabas de perder la conexion a internet", noGPS, "sin conexion", "aceptar");
});
//Variables maps

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

//ejecucion al tener el dispositivo listo


function init(){
       navigator.geolocation.getCurrentPosition(posicionado, fallo);	
}

//Inicio de Maps

function initialize(){
 directionsDisplay = new google.maps.DirectionsRenderer();
 var galeria = new google.maps.LatLng(40.38569454820463, -3.717595808288707);
 var mapOptions = {
 	zoom:7,
 	center: galeria
 };
map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
directionsDisplay.setMap(map);
}

// Calculo de ruta Maps

function calcRoute(x,y) {
	var start = new google.maps.LatLng(x,y);
	var end = new google.maps.LatLng(40.38569454820463, -3.717595808288707);
	var request = {
		origin:start,
		destination:end,
		travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(response, status){
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);


function fallo(error){
	navigator.notification.alert("No se ha podido realizar la accion", noGPS, "Error", "Aceptar");
}

// Geoposicion

function posicionado(posicion) {
	var posX = posicion.coords.latitude;
	var posY = posicion.coords.longitude;
	calcRoute(posX, posY);
}

function noGPS() {
	
}

function tomarfoto() {
	navigator.camera.getPicture(fototomada, fallo, {quality:50, destinationType: Camera.destinationType.FILE_URI});
}

function fototomada(imageURI) {
	var imagen = imageURI;

	var indice = localStorage.getItem("numfotos");
	if ((indice == "undefined") || (indice == null)) {
       localStorage.setItem("numfotos", "0");
	}

	indice = localStorage.getItem("numfotos");
	indice = parseInt(indice);
	indice++;

	localStorage.setItem("imagen" + indice, imagen);
	localStorage.setItem("numfotos", indice);
}

function mostrarfotos(){
	var i =localStorage.getItem("numfotos");
	var actual = localStorage.getItem("actual");
	if((actual =="undefined") || (actual == null)) {
		localStorage.setItem("actual", "1");
	}
   
   actual =  localStorage.getItem("actual");

   var imagen = localStorage.getItem("imagen" + actual);
   var marco = document.getElementById('galeria');
   marco.src = imagen;

}

function anterior() {
      var actual = localStorage.getItem("actual");
	if((actual =="undefined") || (actual == null)) {
		localStorage.setItem("actual", "1");
	}
   
   actual = localStorage.getItem("actual");
   if (actual >=2) {
   actual = parseInt(actual);
   actual--;
   localStorage.setItem("actual", actual);
   mostrarfotos();
   }
}

function siguiente(){
var actual = localStorage.getItem("actual");
	if((actual =="undefined") || (actual == null)) {
		localStorage.setItem("actual", "1");
	}
   
   actual = localStorage.getItem("actual");
   if (actual < localStorage.getItem("numfotos")) {
   actual = parseInt(actual);
   actual++;
   localStorage.setItem("actual", actual);
   mostrarfotos();
   }
}







