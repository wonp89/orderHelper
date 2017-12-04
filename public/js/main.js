//toggle business_list
$(document).ready(function() {
  //orders slidedown
  $('.list_show').on('click', function(){
    $(this).nextUntil('.list_show').slideToggle(200);
      $(this).closest('div').find('.dropdown').toggle();
  });
  });


//------------- Search Business --------------//
  function myFunction() {
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
