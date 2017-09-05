google.maps.event.addDomListener(window, 'load', init);

var map;
var map_center;
//Initialize the invisible path coordinates that center the map responsively
var path_coords = [{
  lat: 45.448533,
  lng: -74.10920999999996
}, {
  lat: 45.465577,
  lng: -74.159123
}, {
  lat: 45.433420,
  lng: -74.059286
}];
var path_bounds;

function init() {
      var styledMapType = new google.maps.StyledMapType(
 [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#F8F8F8"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },  
   
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "color": "#FFFFFF"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#E5E5E5"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
   {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#F8F8F8"
            },
            {
                "weight": 0.8
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#F8F8F8"
            }
        ]
    },
  
   
],
        {name: 'Styled Map'});
        
  map_center = new google.maps.LatLng(45.448533, -74.10920999999996);
  var mapElement = document.getElementById('map');
// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    center: map_center,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom : 6,
    zoomControl: true,
    scaleControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };
  map = new google.maps.Map(mapElement, mapOptions);
  addRoute(map);
  
   map.mapTypes.set('styled_map', styledMapType);
   map.setMapTypeId('styled_map');
  
}

function addMarker(label, location, map) {
  var marker = new google.maps.Marker({
    position: location,
    label: label,
    map: map
  });
}

function addRoute(map) {
  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };
  var flightPath = new google.maps.Polyline({
    path: path_coords,
    geodesic: true,
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }],
    strokeWeight: 0.001
  });
              
var willowsicon  = new google.maps.Marker({
    map: map,
    position: {lat:45.448533, lng:-74.10920999999996},
    //animation: google.maps.Animation.DROP,
    zIndex: 100,
    icon: {url:"https://cdn.shopify.com/s/files/1/2084/6749/files/icon-location.svg?5470132994482494346" ,
      //size: new google.maps.Size(60, 60),
      anchor: new google.maps.Point(30, 30),
      scaledSize: new google.maps.Size(60, 60),
      //size: new google.maps.Size(183, 183),
      //origin: new google.maps.Point(0, 0),
      title: 'Auberge Willow'
    }
    });
    
var willowtree  = new google.maps.Marker({
    map: map,
    position: {lat:45.448533, lng:-74.10920999999996},
    //animation: google.maps.Animation.DROP,
    zIndex: 101,
    icon: {url:"https://cdn.shopify.com/s/files/1/2084/6749/files/willow-tree.svg?919550121864024795" ,
      anchor: new google.maps.Point(7, 10),
      scaledSize: new google.maps.Size(14, 20)
    }
    });    
    
  	var willowstring = '<p><strong>Auberge Willow</strong><p><p>208 Rue Main,<br>Hudson, QC J0P 1H0<br>Canada</p>';
    
    var infowindow = new google.maps.InfoWindow({
          content: willowstring
        });    
    
    willowtree.addListener('click', function() {
          infowindow.open(map, willowtree);
        });
     
  path_bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < path_coords.length; i++) {
   //addMarker((i + 1).toString(), path_coords[i], map);
    path_bounds.extend(
      new google.maps.LatLng(
        path_coords[i].lat,
        path_coords[i].lng));
  }

  flightPath.setMap(map);
  resize();

  google.maps.event.addDomListener(window, 'resize',
    resize); 
}

function resize() {
  map.setCenter(map_center);
  map.fitBounds(path_bounds);
};