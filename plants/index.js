console.log(`Ваша оценка - 85 баллов 
Отзыв по пунктам ТЗ:
Выполненные пункты:
1) Блок header\n2) Секция welcome\n3) Секция about\n4) Секция service\n5) Секция prices\n6) Секция contacts\n7) Блок footer\n8) Блок header\n9) Секция welcome\n10) Секция about\n11) Секция service\n12) Секция prices\n13) Секция contacts\n14) Блок footer\n15) нет полосы прокрутки
 при ширине страницы от 1440рх до 380px\n16) нет полосы прокрутки при ширине страницы от 380px до 320рх\n17) при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка\n18) при нажатии на бургер-иконку 
 плавно появляется адаптивное меню\n19) адаптивное меню соответствует цветовой схеме макета\n20) при нажатии 
 на крестик адаптивное меню плавно скрывается уезжая за экран\n21) ссылки в адаптивном меню работают,
  обеспечивая плавную прокрутку по якорям (все, кроме Account, она пока просто закрывает меню)\n22) при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна 

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

form.onclick = function (event) {
  let target = event.target;
  cardOne.style.display = "";
  cardTwo.style.display = "";
  cardThree.style.display = "";
  cardFour.style.display = "";
  titleCont.style.marginBottom = "";
  select.classList.toggle("opened");
  title.innerHTML = "City";
  city.classList.add("select-selected");
  arrow.classList.toggle("openedArr");
  /*let selectOpened = document.querySelectorAll(".opened");
  if(selectOpened.length == 0) {arrow.classList.remove("openedArr")
  form.classList.remove("contact__hover")}*/
  
  
  if (target.tagName === "LI") {
    let cityOne = document.getElementById("city-one");
    let cityTwo = document.getElementById("city-two");
    let cityThree = document.getElementById("city-three");
    let cityFour = document.getElementById("city-four");
    if (target == cityOne) {
      title.innerHTML = cityOne.innerHTML;
      cardOne.style.display = "block";
      select.style.display = "";
      if (document.documentElement.clientWidth <= 380) {
        titleCont.style.marginBottom = "42px";
      }
    } else if (target == cityTwo) {
      title.innerHTML = cityTwo.innerHTML;
      cardTwo.style.display = "block";
      select.style.display = "";
      if (document.documentElement.clientWidth <= 380) {
        titleCont.style.marginBottom = "42px";
      }
    } else if (target == cityThree) {
      title.innerHTML = cityThree.innerHTML;
      cardThree.style.display = "block";
      select.style.display = "";
      if (document.documentElement.clientWidth <= 380) {
        titleCont.style.marginBottom = "42px";
      }
    } else {
      title.innerHTML = cityFour.innerHTML;
      cardFour.style.display = "block";
      select.style.display = "";
      if (document.documentElement.clientWidth <= 380) {
        titleCont.style.marginBottom = "42px";
      }
    }
  }
};
