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
