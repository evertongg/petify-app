$('.like-box').click(() => {
  $('.like-box').addClass('transform-box');
  setTimeout(function() {
    $('.like-box').removeClass('transform-box');
  }, 300);
});

document.getElementById('pic-select').onchange = function() {
    document.getElementById('pic-upload').submit();
};

document.getElementById('attachment').onchange = function () {
    let path = this.value;
    let filename = path.replace(/^.*\\/, '');

    document.getElementById('filename').innerHTML = filename;
};

function showMap() {
    var box = document.getElementById("map-box");
    if (box.style.display === "none") {

        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}


$(document).ready(function(){

  function initialize() {
      let myOptions = {
          zoom: 11,
          center: user,
          styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
      };

      let map = new google.maps.Map(document.getElementById('map'),
              myOptions);
      let me = '/images/marker-sb.png';
      let followerMark = '/images/marker-s.png';

      let myPos = new google.maps.Marker({
              position: user,
              map: map,
              title: "I'm here",
              icon: me
              });

      followers.forEach((follower) => {
        let position = {
            lat: follower.location.lat,
            lng: follower.location.lng
          };
        let marker = new google.maps.Marker({
            position: position,
            map: map,
            title: follower.petname,
            icon: followerMark,
            url: `/profile/${follower.user_id}`
            });
        google.maps.event.addListener(marker, 'click', function() {
           window.location.href = this.url;
       });
      })

  };
  google.maps.event.addDomListener(window, "load", initialize);
});
