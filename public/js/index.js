//toggle business_list
$(document).ready(function() {
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
    setTimeout(function () {
      $('.beginButton').addClass('animated fadeIn');}, 1000
    );
    setTimeout(function () {
      $('.content').show().addClass('animated fadeIn');}, 1000
    );
  });

//------------- Search Business --------------//
  function search() {
      input = document.getElementById("businessSearch");
      filter = input.value.toUpperCase();
      indexSection = document.getElementById("indexSection");
      names = indexSection.getElementsByClassName("names");
      for (i = 0; i < names.length; i++) {
          a = names[i].getElementsByTagName("h5")[0];
          if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
              names[i].style.display = "";
          } else {
              names[i].style.display = "none";
          }
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
    deliveryOrderQuantity[i].parentElement.style.display = 'none';
  }
}

//---------->> google map api for supplier view <<---------- //
function initMap(){
  // Map options
  var options = {
    zoom:11,
    center:{lat:lat,lng:lng}
  }
  // New map
  var map = new google.maps.Map(document.getElementById('map'), options);
  // marker
  var markers =
    {
      coords:{lat:lat,lng:lng},
      content:restaurant
    }
  addMarker(markers);
  // Add Marker Function
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,
    });
    // Check content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });
      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }
}

// <%# ------------- Geocode map script ----------------- %>
//------- restaurant location ------- //
var restaurantAddress = document.getElementById('restaurantAddress')
var restaurant = restaurantAddress.textContent;

geocode();
function geocode() {
  var location = restaurant
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address:location,
      key:'AIzaSyAhjGo8hHwbT5e9MJuFV2JGDWuJnwAO6a8'
    }
  }).then(function(response){
    lat = response.data.results[0].geometry.location.lat;
    lng = response.data.results[0].geometry.location.lng;
    initMap()
  }).catch(function(error){
    })
}
