console.log(`Ваша оценка - 125 баллов 
Отзыв по пунктам ТЗ:
Выполненные пункты:\n1) При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной\n2) Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг\n3) Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur\n4) При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым\n5) Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается\n6) В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе\n7) При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу

`)
/*------------------------BURGER----------------------------------------*/
let menu = document.getElementById("icon-menu");
let list = document.getElementById("list-menu");
let close = document.querySelector(".menu__close");
let header = document.querySelectorAll(".header__body")[0];

document.addEventListener("click", burger);
function burger(event) {
  let target = event.target;

  if (target.closest(".menu__icon")) {
    list.classList.toggle("active");
  }
  if (target.closest(".menu__close")) {
    list.classList.remove("active");
  }
  if(target.closest(".item-menu__link")) {
    list.classList.remove("active");
  }
  if (!target.closest(".header__menu")) {
    list.classList.remove("active");
  }
}

/*---------------SERVISES------------------------------*/
let cards = document.getElementsByClassName("card");
let buttonPlant = document.getElementById("planting-link");
let buttonGar = document.getElementById("gargens-link");
let buttonLawn = document.getElementById("lawn-link");
let cardsTitle = document.getElementsByClassName("content-card__title");
let buttons = document.getElementById("buttons-servises");
let servise = document.getElementById("servise");
servise.onclick = function (event) {
  let target = event.target;
  console.log(target);
  if (target.tagName != "BUTTON") {
    for (let i = 0; i < cardsTitle.length; i++) {
      cardsTitle[i].closest(".card").classList.remove("filter");
      buttonGar.classList.remove("hover");
      buttonLawn.classList.remove("hover");
      buttonPlant.classList.remove("hover");
    }
  }
};
let counter = 0;
buttons.onclick = function (event) {
  let target = event.target;

  if (target.tagName != "BUTTON") {
    return;
  }

  console.log(counter);
  if (counter == 0) {
    for (let i = 0; i < cardsTitle.length; i++) {
      cardsTitle[i].closest(".card").classList.remove("filter");
      buttonGar.classList.remove("hover");
      buttonLawn.classList.remove("hover");
      buttonPlant.classList.remove("hover");
      if (target === buttonGar) {
        buttonGar.classList.toggle("hover");
        if (!cardsTitle[i].innerHTML.includes("Garden")) {
          cardsTitle[i].closest(".card").classList.add("filter");
        }
      } else if (target === buttonLawn) {
        buttonLawn.classList.toggle("hover");
        if (!cardsTitle[i].innerHTML.includes("Lawn")) {
          cardsTitle[i].closest(".card").classList.add("filter");
        }
      } else if (target === buttonPlant) {
        buttonPlant.classList.toggle("hover");
        if (!cardsTitle[i].innerHTML.includes("Planting")) {
          cardsTitle[i].closest(".card").classList.add("filter");
        }
      }
    }
    return counter++;
    console.log(counter);
  }
  if (counter == 1) {
    for (let i = 0; i < cardsTitle.length; i++) {
      if (target === buttonGar) {
        buttonGar.classList.add("hover");
        if (cardsTitle[i].innerHTML.includes("Garden")) {
          cardsTitle[i].closest(".card").classList.remove("filter");
        }
      }
      if (target === buttonLawn) {
        buttonLawn.classList.add("hover");
        if (cardsTitle[i].innerHTML.includes("Lawn")) {
          cardsTitle[i].closest(".card").classList.remove("filter");
        }
      }
      if (target === buttonPlant) {
        buttonPlant.classList.add("hover");
        if (cardsTitle[i].innerHTML.includes("Planting")) {
          cardsTitle[i].closest(".card").classList.remove("filter");
        }
      }
    }
    return counter++;
    console.log(counter);
  }
  if (counter == 2) {
    
    for (let i = 0; i < cardsTitle.length; i++) {
      cardsTitle[i].closest(".card").classList.remove("filter");
      buttonPlant.classList.remove("hover");
      buttonGar.classList.remove("hover");
      buttonLawn.classList.remove("hover");
      if (target === buttonGar) {
        buttonGar.classList.toggle("hover");
        if (!cardsTitle[i].innerHTML.includes("Garden")) {
          cardsTitle[i].closest(".card").classList.add("filter");
        }
      } else if (target === buttonLawn) {
        
        buttonLawn.classList.toggle("hover");
        if (!cardsTitle[i].innerHTML.includes("Lawn")) {
          cardsTitle[i].closest(".card").classList.add("filter");
        }
      } else if (target === buttonPlant) {
        
        buttonPlant.classList.toggle("hover");
        if (!cardsTitle[i].innerHTML.includes("Planting")) {
          cardsTitle[i].closest(".card").classList.add("filter");
        }
      }
    }
    return (counter -= 1);
  }
};

/*-------------PRICES--------------------------*/
let prices = document.getElementsByClassName("prices__item");
let arrows = document.getElementsByClassName("prices__arrow");
let headers = document.getElementsByClassName("prices__header");

for (let i = 0; i < prices.length; i++) {
  arrows[i].addEventListener("click", function () {
    let opened = document.querySelectorAll(".opened");
    let openedArrow = document.querySelectorAll(".opened-arrow");
    let openedHeader = document.querySelectorAll(".opened-header");
    console.log(opened.length);
    if (opened.length > 0) {
      this.classList.toggle("opened-arrow");
      prices[i].classList.toggle("opened");
      headers[i].classList.toggle("opened-header");
      opened.forEach((item) => item.classList.remove("opened"));
      openedArrow.forEach((item) => item.classList.remove("opened-arrow"));
      openedHeader.forEach((item) => item.classList.remove("opened-header"));
    }
    if (opened.length == 0) {
      this.classList.toggle("opened-arrow");
      prices[i].classList.toggle("opened");
      headers[i].classList.toggle("opened-header");
    }
  });
}
/*----------------CONTACT---------------------*/
let select = document.getElementById("city-form");
let form = document.getElementById("contact-form");
let city = document.getElementById("contact-body");
let cities = document.getElementsByClassName("option-outer");
let title = city.firstElementChild;
let cardOne = document.getElementById("card-one");
let cardTwo = document.getElementById("card-two");
let cardThree = document.getElementById("card-three");
let cardFour = document.getElementById("card-four");
let arrow = document.getElementById("contact-arrow");
let titleCont = document.getElementById("cont-title");
let contactImg = document.getElementById('contact-woman');
let titleForm = document.querySelector('.contact-title');
let contact = document.getElementById('contact');
city.onmouseenter = function() {
  city.classList.add('contact__hover')
}
city.onmouseleave = function(){
  city.classList.remove('contact__hover')
}
contact.onclick = function(event) {
  let target = event.target;
  if(target != form && target != city && target != select && target.tagName != 'LI' && target.tagName != 'UL' && !select.classList.contains('opened')) {
    city.classList.remove("select-selected");
    cardOne.style.display = "";
  cardTwo.style.display = "";
  cardThree.style.display = "";
  cardFour.style.display = "";
  titleCont.style.marginBottom = "";
  form.style.marginBottom = '';
  title.innerHTML = "City";
  contactImg.classList.remove('option');
  }
}

form.onclick = function (event) {
  let target = event.target;
  cardOne.style.display = "";
  cardTwo.style.display = "";
  cardThree.style.display = "";
  cardFour.style.display = "";
  titleCont.style.marginBottom = "";
  form.style.marginBottom = '';
  select.classList.toggle("opened");
  title.innerHTML = "City";
  city.classList.add("select-selected");
  arrow.classList.toggle("openedArr");
     
  contactImg.classList.remove('option');
  
  
  if (target.tagName === "LI") {
    let cityOne = document.getElementById("city-one");
    let cityTwo = document.getElementById("city-two");
    let cityThree = document.getElementById("city-three");
    let cityFour = document.getElementById("city-four");
    
    if (target == cityOne) {
      title.innerHTML = cityOne.innerHTML;
      cardOne.style.display = "block";
      select.style.display = "";
      
      if (document.documentElement.clientWidth <= 768) {
        titleCont.style.marginBottom = "61px";
        form.style.marginBottom = '280px';
      }
      if (document.documentElement.clientWidth <= 380) {
        titleCont.style.marginBottom = "42px";
        contactImg.classList.add('option');
      }
    } else if (target == cityTwo) {
      title.innerHTML = cityTwo.innerHTML;
      cardTwo.style.display = "block";
      select.style.display = "";
      
      if (document.documentElement.clientWidth <= 768) {
        titleCont.style.marginBottom = "61px";
        form.style.marginBottom = '280px';
      }
      if (document.documentElement.clientWidth <= 380) {
        titleCont.style.marginBottom = "42px";
        contactImg.classList.add('option');
      }
    } else if (target == cityThree) {
      title.innerHTML = cityThree.innerHTML;
      cardThree.style.display = "block";
      select.style.display = "";
      
      if (document.documentElement.clientWidth <= 768) {
        titleCont.style.marginBottom = "61px";
        form.style.marginBottom = '280px';
      }
      if (document.documentElement.clientWidth <= 380) {
        titleCont.style.marginBottom = "42px";
        contactImg.classList.add('option');
      }
    } else {
      title.innerHTML = cityFour.innerHTML;
      cardFour.style.display = "block";
      select.style.display = "";
      
      if (document.documentElement.clientWidth <= 768) {
        titleCont.style.marginBottom = "61px";
        form.style.marginBottom = '280px';
      }
      if (document.documentElement.clientWidth <= 380) {
        titleCont.style.marginBottom = "42px";
        contactImg.classList.add('option');
      }
    }
  }
};
