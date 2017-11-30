//Welcome Slider
'use strict';
$(function() {
  let width = 720;
  let animationSpeed = 1000;
  let pause = 3000;
  let currentSlide = 1;
  let $slider = $('#slider');
  let $slideContainer = $slider.find('.slides');
  let $slides = $slideContainer.find('.slide');
  let interval;
  function startSlider() {
      interval = setInterval(function() {
          $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function(){
              currentSlide++;
                  if (currentSlide === $slides.length) {
                      currentSlide = 1;
                      $slideContainer.css('margin-left', 0);
                  }
            });
      }, pause);
  }
  function stopSlider() {
    clearInterval(interval);
  }
  $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
  startSlider();
});
//slider

//toggle business_list
$(document).ready(function() {

  //orders slidedown
  $('.list_show').on('click', function(){
    $(this).nextUntil('.list_show').slideToggle(200);
      $(this).closest('div').find('.dropdown').toggle();
  });
  //appeding business form
  const addBusiness = $(`
    <div class="row businessForm" style="margin: auto; margin-top: 7px;">
      <i class="fa fa-briefcase" aria-hidden="true"></i>
          <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Business Name" name="business_name"  style="margin-left: 7px;">
          <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
        <div class="input-group mb-2 mr-sm-2 mb-sm-0"  style="margin-left: 7px;">
          <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Delivery Day" name='day'>
        </div>
        <i class="fa fa-minus-square-o" aria-hidden="true"></i>
    </div>
  `);
  $('.fa-plus-square-o').on( "click", function(event) {
    event.preventDefault();
    $('#business_form').append(addBusiness.clone());
  });
  $('.fa-minus-square-o').on( "click", function() {
    $(this).parent().remove();
  });


});
