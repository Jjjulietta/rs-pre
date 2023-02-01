/*----------TIME----------------*/
const time = document.querySelector('.time');
console.log(time);

function showTime(){
    const date = new Date();
    const currentTime = date.toLocaleTimeString()

    time.textContent = `${currentTime}`;
    showDate()
    showGreeting();
    setTimeout(showTime, 1000);
}
showTime();
/*--------------DATE------------------------*/

function showDate() {
    const day = document.querySelector('.date');
    const date = new Date();
    const options = {weekday: 'long',  month: 'long',  day: 'numeric'}
    const currentDate = date.toLocaleDateString('en-US', options);
    console.log(currentDate);
    day.textContent = `${currentDate}`;
  
}
/*-----------------GREETING-------------------*/


function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    console.log(hours)
    if(hours >= 0 && hours < 6) {return 'Night'} 
    else if(hours < 12 && hours >= 6) {return 'Morning';} 
    else if(hours  >= 12 && hours < 18) {return 'Afternoon';} 
    else if(hours >= 18 && hours < 24) {return 'Evening';} 
}

function showGreeting() {
    const greeting = document.querySelector('.greeting');
    let timeOfDay = getTimeOfDay();
    console.log(timeOfDay); 
    
    greeting.textContent = `Goog ${timeOfDay},`;
};

function setLocalStorage() {
    const name = document.querySelector('.name');
    localStorage.setItem('name', name.value)
    
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
    if(localStorage.getItem('name')) {
        const name = document.querySelector('.name');
        name.value = localStorage.getItem('name')
    }
}
window.addEventListener('load', getLocalStorage);

/*--------------SLIDER---------------------------------*/

const body = document.querySelector("body");
let randomNum;
function getRandomNum() {
return  Math.floor(Math.random()*(20))+1;

}
randomNum = getRandomNum();
console.log(randomNum);

function setBg() {
    let timeOfDay = getTimeOfDay();
    let timeDay = `${timeOfDay}`.toLowerCase();
    console.log(timeDay)
    let bgNum = String(`${randomNum}`).padStart(2, "0");
const img = new Image();
img.src = `https://github.com/Jjjulietta/stage1-tasks/blob/assets/images/${timeDay}/${bgNum}.jpg?raw=true`;
img.onload =()=> {
    body.style.backgroundImage = `url('https://github.com/Jjjulietta/stage1-tasks/blob/assets/images/${timeDay}/${bgNum}.jpg?raw=true')`;
}}
    
setBg();
function getSliderNext() {
    if(randomNum < 20) {randomNum = randomNum +1}
    else if(randomNum == 20) {randomNum = 1} 
    
    setBg()
}

function getSliderPrev() {
    if(randomNum > 1) {randomNum = randomNum - 1}
    else if(randomNum == 1) {randomNum = 20} 
    setBg()
    
}
const sliderNext = document.querySelector('.slide-next');
const sliderPrev = document.querySelector('.slide-prev');
sliderNext.addEventListener('click', getSliderNext);
sliderPrev.addEventListener('click', getSliderPrev);

/*----------------------WEATHER----------------------------------*/
async function getWeather() {
const url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=c8243da569a99643213863e851fa9cbf&units=metric`
const res = await fetch(url);
const data = await res.json();
console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}
getWeather();





