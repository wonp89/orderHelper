//toggle business_list
$(document).ready(function() {
  //orders slidedown
  $('.list_show').on('click', function(){
    $(this).nextUntil('.list_show').slideToggle(200);
      $(this).closest('div').find('.checkOrder').toggle();
  });

  $(".btn-danger").click(function() {
                     alert("Are You Sure?");
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

//-------------- if supplier name created on the index page, the name disspears inside selector --------------//
var supplierlist = document.getElementsByTagName("option")
var supplierName = document.getElementsByClassName("supplierName")
for (i = 0; i < supplierlist.length; i++) {
  for (j = 0; j < supplierName.length; j++) {
     if (supplierlist[i].innerHTML == supplierName[j].innerHTML) {
       supplierlist[i].style.display = 'none';
     }
  }
}

//---------->>>>>>>> google map inside footer.ejs <<<<<<<<<---------- //
