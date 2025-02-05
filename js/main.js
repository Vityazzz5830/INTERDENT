$('.firstsec_mainpage_slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: false,
  dots: false,
  infinite: true,
  prevArrow: $('.firstsec_mainpage_slider_buttons_leftbtn'),
  nextArrow: $('.firstsec_mainpage_slider_buttons_rightbtn')
});

$('.catalog_item_sec_single_content_rightpart_slider_list').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: false,
  dots: true,
  infinite: true,
  prevArrow: $('.catalog_item_sec_single_content_rightpart_slider_list_buttons_leftbtn'),
  nextArrow: $('.catalog_item_sec_single_content_rightpart_slider_list_buttons_rightbtn')
});

$('.catalog_item_sec_single_content_popular_items_list').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  fade: false,
  dots: false,
  infinite: true,
  prevArrow: $('.catalog_item_sec_single_content_popular_items_list_item_buttons_leftbtn'),
  nextArrow: $('.catalog_item_sec_single_content_popular_items_list_item_buttons_rightbtn')
});


var nameInputs = document.querySelectorAll('input[data-name-input]');

$(nameInputs).on('keypress', function() {
    var that = this;

    setTimeout(function() {
        var res = /[^аА-яЯ]/g.exec(that.value);
        console.log(res);
        that.value = that.value.replace(res, '');
    }, 0);
});


window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('input[data-tel-input]'), function(input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});




let yandexmap = document.getElementsByClassName('yandexmap');

if (yandexmap[0]) {
ymaps.ready(function () {
    var myMap = new ymaps.Map('yandexmap', {
        center: [55.808450, 37.518238],
        zoom: 12,
        controls: []
    }, 

    {
      searchControlProvider: 'yandex#search'
    }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark1 = new ymaps.Placemark([55.808450, 37.518238], {}, {
      // Опции.
      
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/mapsec_baloon.svg',
      // Размеры метки.
      iconImageSize: [30, 42],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-5, -38],
    })

    myMap.geoObjects
        .add(myPlacemark1);
});

}








/*-------------ТАБ-МЕНЮ УСЛУГИ-------------*/

let p_bold = document.getElementsByClassName('questions-list-item-title-p');
let listitem = document.getElementsByClassName('questions-list-item');
let wrapinfo = document.getElementsByClassName('questions-list-item-wrapinfo');
let itemimage = document.getElementsByClassName('questions-list-item-title_image');

let imgnoac = document.getElementsByClassName('plus');

for (let i = 0; i < listitem.length; i++) {
  listitem[i].addEventListener('click', function() {
    
    wrapinfo[i].classList.toggle("questions-list-item-wrapinfo_js");

    p_bold[i].classList.toggle("questions-list-item-title-p_js");


    imgnoac[i].classList.toggle("plus_act");
    

  });
}













var gallery = document.querySelector('.gallery');
var galleryItems = document.querySelectorAll('.gallery-item');
var numOfItems = gallery.children.length;
var itemWidth = 23; // percent: as set in css

var featured = document.querySelector('.featured-item');

var leftBtn = document.querySelector('.move-btn.left');
var rightBtn = document.querySelector('.move-btn.right');
var leftInterval;
var rightInterval;

var scrollRate = 0.2;
var left;

function selectItem(e) {
  if (e.target.classList.contains('active')) return;
  
  featured.style.backgroundImage = e.target.style.backgroundImage;
  
  for (var i = 0; i < galleryItems.length; i++) {
    if (galleryItems[i].classList.contains('active'))
      galleryItems[i].classList.remove('active');
  }
  
  e.target.classList.add('active');
}

function galleryWrapLeft() {
  /*
  var first = gallery.children[0];
  gallery.removeChild(first);
  gallery.style.left = -itemWidth + '%';
  gallery.appendChild(first);
  gallery.style.left = '0%'; */
}

function galleryWrapRight() {
  var last = gallery.children[gallery.children.length - 1];
  gallery.removeChild(last);
  gallery.insertBefore(last, gallery.children[0]);
  gallery.style.left = '-23%';
}

function moveLeft() {
  left = left || 0;

  leftInterval = setInterval(function() {
    gallery.style.left = left + '%';

    if (left > -itemWidth) {
      left -= scrollRate;
    } else {
      left = 0;
      galleryWrapLeft();
    }
  }, 1);
}

function moveRight() {
  //Make sure there is element to the leftd
  if (left > -itemWidth && left < 0) {
    left = left  - itemWidth;
    
    var last = gallery.children[gallery.children.length - 1];
    gallery.removeChild(last);
    gallery.style.left = left + '%';
    gallery.insertBefore(last, gallery.children[0]);  
  }
  
  left = left || 0;

  leftInterval = setInterval(function() {
    gallery.style.left = left + '%';

    if (left < 0) {
      left += scrollRate;
    } else {
      left = -itemWidth;
      galleryWrapRight();
    }
  }, 1);
}

function stopMovement() {
  clearInterval(leftInterval);
  clearInterval(rightInterval);
}

leftBtn.addEventListener('mouseenter', moveLeft);
leftBtn.addEventListener('mouseleave', stopMovement);
rightBtn.addEventListener('mouseenter', moveRight);
rightBtn.addEventListener('mouseleave', stopMovement);


//Start this baby up
(function init() {
  var images = [
    'img/catalog_item_sec_single_content_leftpart_item_1.png',
    'img/catalog_item_sec_single_content_leftpart_item_2.png',
    'img/catalog_item_sec_single_content_leftpart_item_3.png',
    'img/catalog_item_sec_single_content_leftpart_item_4.png',
    'img/catalog_item_sec_single_content_leftpart_item_5.png',
    'img/catalog_item_sec_single_content_leftpart_item_6.png'
  ];
  
  //Set Initial Featured Image
  featured.style.backgroundImage = 'url(' + images[0] + ')';
  
  //Set Images for Gallery and Add Event Listeners
  for (var i = 0; i < galleryItems.length; i++) {
    galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
    galleryItems[i].addEventListener('click', selectItem);
  }
})();


const tab1 = document.querySelector("#tab1");
const tab2 = document.querySelector("#tab2");

tab1.addEventListener('click', function() {
     tab1.classList.add("tab_active");
     tab2.classList.remove("tab_active");
  });

tab2.addEventListener('click', function() {
     tab2.classList.add("tab_active");
     tab1.classList.remove("tab_active");
  });