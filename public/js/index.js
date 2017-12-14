//toggle business_list
$(document).ready(() => {
  //orders slidedown
  $('.list_show').on('click', function(){
    $(this).nextUntil('.list_show').slideToggle(200);
      $(this).closest('div').find('.checkOrder').toggle();
  });
  // notification for deleting relationship
  $(".btn-danger").click(function() {
                     alert("The supplier will be removed from your list. You orders will not be deleted for your future comeback.");
                     });
    //beginButton for welcome page: setting up timeout for next animation
    setTimeout(() => {
      $('.beginButton').addClass('animated fadeIn');}, 1000
    );
    setTimeout(() => {
      $('.content').show().addClass('animated fadeIn');}, 1000
    );
  });

//------------- Search Business --------------//
  search = () => {
      input = document.getElementById("businessSearch");
      filter = input.value.toUpperCase();
      indexSection = document.getElementById("indexSection");
      names = indexSection.getElementsByClassName("names");
      for (i = 0; i < names.length; i++) {
          deliveryName = names[i].getElementsByTagName("h5")[0];
          deliveryDay = names[i].getElementsByTagName("h5")[1];
          if (deliveryName.innerHTML.toUpperCase().indexOf(filter) > -1 || deliveryDay.innerHTML.toUpperCase().indexOf(filter) > -1) {
              names[i].style.display = "";
          } else {
              names[i].style.display = "none";
          }
      }
  }

// ----------------- notifying to order before the delivery day ---------------- //
var days = ['SUNDAY', 'MONDAY', "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
var newDate = new Date();
var getDay = newDate.getDay();
var deliverDayNameMatch = document.getElementsByClassName("supplierName")
var deliverDay = document.getElementsByClassName("deliverDay")
for (i = 0; i < deliverDay.length; i++) {
  dayElement = deliverDay[i]
  day = deliverDay[i].innerHTML
  nextDay = days[getDay + 1]
    if (nextDay ===  undefined) {
    nextDay = days[getDay]
      if (nexDay === day.toUpperCase()) {
        dayElement.innerHTML = 'ORDER TODAY!';
        dayElement.style.color = 'red';
      }
    }
    else if (day.toUpperCase() === nextDay) {
      dayElement.innerHTML = 'ORDER TODAY!';
      dayElement.style.color = 'red';
    }
}

//-------- if supplier names created on the index page, the names disapears inside the selector -------//
var supplierlist = document.getElementsByTagName("option")
var supplierName = document.getElementsByClassName("supplierName")
for (i = 0; i < supplierlist.length; i++) {
  for (j = 0; j < supplierName.length; j++) {
     if (supplierlist[i].innerHTML == supplierName[j].innerHTML ) {
       supplierlist[i].style.display = 'none';
     }
  }
}

// ------- if orders quantity is 0 in supplier 'check restaurant' view, orders will be hidden ----- //
var deliveryOrderQuantity = document.getElementsByClassName("deliveryOrderQuantity");
for (i = 0; i < deliveryOrderQuantity.length; i++) {
  if (deliveryOrderQuantity[i].innerHTML == 0 || deliveryOrderQuantity[i].innerHTML == "") {
    deliveryOrderQuantity[i].parentElement.remove()
  }
}

//------------- Matrix Api for distance ------------------ //
var restaurantAddress = document.getElementById('restaurantAddress')
var restaurant = restaurantAddress.textContent;
var supplierAddress = document.getElementById('supplierAddress')
var supplier = supplierAddress.textContent;

 initMap = () => {
  var bounds = new google.maps.LatLngBounds;
  var markersArray = [];

  var origin = supplier;
  var destination = restaurant;

  var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';
  var originIcon = {
          url: 'http://maps.google.com/mapfiles/ms/micons/truck.png',
          size: new google.maps.Size(35, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32)
        };
  var map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: , lng: },
    zoom: 10
  });
  var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [origin],
    destinations: [destination],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, (response, status) => {
    console.log(response)
    if (status !== 'OK') {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById('distance');
      outputDiv.innerHTML = '';

      showGeocodedAddressOnMap = (asDestination) => {
        var icon = asDestination ? destinationIcon : originIcon;
        return (results, status) => {
          if (status === 'OK') {
            map.fitBounds(bounds.extend(results[0].geometry.location));
            markersArray.push(new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: icon
            }));
          } else {
            alert('Geocode was not successful due to: ' + status);
          }
        };
      };

      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        geocoder.geocode({'address': originList[i]},
            showGeocodedAddressOnMap(false));
        for (var j = 0; j < results.length; j++) {
          geocoder.geocode({'address': destinationList[j]},
              showGeocodedAddressOnMap(true));
          outputDiv.innerHTML += '<i class="fa fa-truck" aria-hidden="true"></i>' + ' To destination :' + ' ' + results[j].distance.text + ' in ' +
              results[j].duration.text + '<br>';
        }
      }
    }
  });
}

//---------->> google map location "ONLY(without distance and travel time)" for supplier view <<---------- //
//----------------->> if supplies deliver from abroad, distance and travel time is unecessary <<---------------//
// function initMap(){
//   // Map options
//   var options = {
//     zoom:12,
//     center:{lat:lat,lng:lng}
//   }
//   // New map
//   var map = new google.maps.Map(document.getElementById('map'), options);
//   // marker
//   var markers = [
//         {
//           coords:{lat:lat,lng:lng},
//           content:restaurant
//         }
//       ]
//
//   for(var i = 0;i < markers.length;i++){
//     addMarker(markers[i]);
//   }
//   // Add Marker Function
//   function addMarker(props){
//     var marker = new google.maps.Marker({
//       position:props.coords,
//       map:map,
//     });
//     // Check content
//     if(props.content){
//       var infoWindow = new google.maps.InfoWindow({
//         content:props.content
//       });
//       marker.addListener('click', function(){
//         infoWindow.open(map, marker);
//       });
//     }
//   }
// }

//<%# ------------- Geocode map script ----------------- %>
//------- restaurant location ------- //
// var restaurantAddress = document.getElementById('restaurantAddress')
// var restaurant = restaurantAddress.textContent;
// var supplierAddress = document.getElementById('supplierAddress')
// var supplier = supplierAddress.textContent;


// geocode();
// function geocode() {
//   axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
//     params:{
//               address: restaurant,
//               key:'AIzaSyAhjGo8hHwbT5e9MJuFV2JGDWuJnwAO6a8'
//             }
//   }).then(function(response){
//     console.log(response)
//       lat = response.data.results[0].geometry.location.lat;
//       lng = response.data.results[0].geometry.location.lng;
//     initMap()
//   }).catch(function(error){
//   })
// }
