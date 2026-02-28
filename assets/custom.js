$(document).ready(function() {
  $('.eyes_password').click(function() {
    $(this).find('svg').toggle();
    var type = $(this).siblings('input').attr('type');
    if (type == 'text') {
      $(this).siblings('input').attr('type', 'password');
    } else {
      $(this).siblings('input').attr('type', 'text');
    }
  });
  
  $('.tab_btn_ele').click(function() {
    var atr = $(this).attr('datatab');
    $(this).parents('.page-width').find('.tab_btn_ele').removeClass('active');
    $(this).parents('.collection').find('.tab_btn_ele').removeClass('active');
    $(this).addClass('active');
    $(this).parents('.page-width').find('.tab_wrapper_ele').hide();
    $(this).parents('.collection').find('.tab_wrapper_ele').hide();
    $('.tab_wrapper_ele[datatab="'+atr+'"]').fadeIn();
  });  

  $('.carouseltrue').owlCarousel({
    loop:false,
    dots: false,
    margin:16,
    responsiveClass:true,
    nav:false,
    responsive:{
      0:{
          items:1,
          stagePadding: 40
      },
      600:{
          items:3
      },
      1000:{
          items: 4
      }
    }
  });
  
  $('.carousel_upsell').owlCarousel({
    margin:10,
    nav:false,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    stagePadding: 50,
    items: 1
  });
  
  $('.contentslide-img-carousel').owlCarousel({
    loop:true,
    dots: true,
    margin: 16,
    responsiveClass:true,
    nav:false,
    responsive:{
      0:{
          items:1,
          stagePadding: 40
      },
      600:{
          items:2
      },
      1000:{
          items: 2,
          stagePadding: 60
      }
    }
  });

  $(document).on('click', '.caroulse_upsell_in', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var that = $(this);
    if (that.hasClass('propage') && $(this).attr('disabled')) {              
      return;
    }
    const cartLink = document.querySelector('#cart-icon-bubble');
    $(this).find('span').hide();
    $(this).find('.loading-overlay__spinner').removeClass('hidden');
    
    var id = $(this).attr('dataid');
    var items = 
      {
       id: id,
       quantity: 1
      }
    ;
    $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: items,
        success: function(res) {
          // if ($('cart-drawer-items').hasClass('is-empty')) {
            $.ajax({
              type: 'GET',
              url: `${routes.cart_url}?view=fullcartdrawer`,
              success: function(htm) {
                $('cart-drawer ').removeClass('is-empty');
                $('cart-drawer ').html(htm);
                that.find('span').show();
                that.find('.loading-overlay__spinner').addClass('hidden');
                $('.modal').removeClass('is-visible');
                if (that.hasClass('propage')) {              
                  $('cart-drawer').addClass('animate active')
                }
 
  $('.carousel_upsell').owlCarousel({
    margin:10,
    nav:false,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    stagePadding: 50,
    items: 1
  });
              },
              error: function(err) {
                console.log(err);   
                that.find('span').show();
                that.find('.loading-overlay__spinner').addClass('hidden');               
              }
            });
  
          jQuery.getJSON('/cart.js', function(cart) {
            if ($('.cart-count-bubble')[0]) {
              $('.cart-count-bubble span').html(cart.item_count);
            } else {
              var dt = '<div class="cart-count-bubble"><span aria-hidden="true">'+cart.item_count+'</span><span class="visually-hidden">'+cart.item_count+' item</span> </div>'
              $('#cart-icon-bubble').append(dt);
            }
            cartLink.click();
          });
          
        },
        error: function(err) {
          console.log(err);      
          that.find('span').show();
          that.find('.loading-overlay__spinner').addClass('hidden');            
        }
    });
  });
  
  // $('.acc-container .acc:nth-child(1) .acc-head').addClass('active');
  // $('.acc-container .acc:nth-child(1) .acc-content').slideDown();
  $('.acc-head').on('click', function() {
      if($(this).hasClass('active')) {
        $(this).siblings('.acc-content').slideUp();
        $(this).removeClass('active');
      }
      else {
        $('.acc-content').slideUp();
        $('.acc-head').removeClass('active');
        $(this).siblings('.acc-content').slideToggle();
        $(this).toggleClass('active');
      }
  });     
});