
/*----------TIME----------------*/
const time = document.querySelector('.time');
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
    day.textContent = `${currentDate}`;
  
}
/*-----------------GREETING-------------------*/


function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
   
    if(hours >= 0 && hours < 6) {return 'Night'} 
    else if(hours < 12 && hours >= 6) {return 'Morning';} 
    else if(hours  >= 12 && hours < 18) {return 'Afternoon';} 
    else if(hours >= 18 && hours < 24) {return 'Evening';} 
}

function showGreeting() {
    const greeting = document.querySelector('.greeting');
    let timeOfDay = getTimeOfDay();
       
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
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherErr = document.querySelector('.weather-error');
const city = document.querySelector('.city');
function getLocalStor() {
        if(localStorage.getItem('city')){
        city.value = localStorage.getItem("city");
    console.log(city.value)
    } else {city.value = 'Minsk'}
}
window.addEventListener("load", getLocalStor);

async function getWeather() {

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c8243da569a99643213863e851fa9cbf&units=metric`;
const res = await fetch(url);
const data = await res.json();

weatherIcon.classList.add(`owf-${data.weather[0].id}`);
temperature.textContent = `${Math.round(data.main.temp)}°C`;
weatherDescription.textContent = `${data.weather[0].description}`;
wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
humidity.textContent = `Humidity: ${data.main.humidity}%`;

}
window.addEventListener('load', getWeather);
function setLocalStor() {
    localStorage.setItem("city", city.value)

}
window.addEventListener("beforeunload", setLocalStor);
city.addEventListener('change', getWeather);

/*----------------------QUOTES-------------------------------*/

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
    const quotes = '../data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let quoteNew = data[Math.floor(Math.random()*data.length)]
    quote.textContent = `"${quoteNew.text}"`;
    author.textContent = quoteNew.author;
}

getQuotes();
changeQuote.addEventListener('click', getQuotes);

/*----------------------AUDI-------------------------*/
import playList from "./play_list.js";
//playList by JS


const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const play = document.querySelector('.play');
const playListContainer = document.querySelector('.play-list');
const song = document.querySelector('.song');

playList.forEach(el =>{
    const li = document.createElement('li')
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
})

const lis = document.querySelectorAll('.play-item');
lis.forEach(el =>{
    let div = document.createElement('DIV');
    div.classList.add('item-icon');
    el.prepend(div);
    console.log(div);
    }
)
const songItem = document.querySelectorAll('.item-icon')
const audio = new Audio();
let isPlay = false;
let playNum = 0;
async  function playAudio() {
    
    console.log(isPlay)
    console.log(playNum)
    if(!isPlay){
    audio.src = playList[playNum].src
    audio.currentTime = 0;
    audio.play();  
    play.classList.add('pause');
    song.textContent = playList[playNum].title; 
    
    lis[playNum].classList.add('item-active'); 
    return isPlay = true;     
          } 
    else if(isPlay) {
        audio.pause();
        play.classList.remove('pause');
        
        lis[playNum].classList.remove('item-active');
       return isPlay = false;
    }
}



function playNext() {
    if(playNum < playList.length-1 && !isPlay) {
         playNum = playNum + 1} 
        else if(playNum == playList.length-1 && !isPlay) {
            playNum = 0

        }
        playAudio();
    };

function playPrev() {
    if(playNum > 0 && !isPlay) { playNum = playNum - 1} 
    else if( playNum == 0 && !isPlay) {
         playNum = playList.length-1
    }
    playAudio();
};
play.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

audio.addEventListener('ended', ()=>{isPlay = false; lis[playNum].classList.toggle('item-active'); 
 playNext()})


/*--------------------AUDIO PLAYER--------------------*/

const progress = document.querySelector('.progress');
const audioCurrent = document.querySelector('.time-cur')
const timeline = document.querySelector('.timeline');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');
const volumePercent = document.querySelector('.volume-percentage');
const timeLength = document.querySelector('.time-length');
audio.addEventListener('loadeddata', ()=>{
timeLength.textContent = getTimeSec(audio.duration);
audio.volume = 0.5;
}, false)
timeline.addEventListener('click', (e)=>{
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX/parseInt(timelineWidth)*audio.duration;
    audio.currentTime = timeToSeek;
    }, false)

setInterval(()=>{
    progress.style.width = audio.currentTime/audio.duration*100 + '%';
    audioCurrent.textContent = getTimeSec(audio.currentTime)
}, 500)
volumeSlider.addEventListener('click', (e)=>{
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX/parseInt(sliderWidth);
    audio.volume = newVolume;
    volumePercent.style.width = newVolume*100 + '%';
}, false)

volumeBtn.addEventListener('click', ()=>{
    audio.muted = !audio.muted;
    if(audio.muted){
        volumeBtn.classList.add('volume-active')}
        else {volumeBtn.classList.remove('volume-active')}
    }
)
function getTimeSec (num) {
let seconds = parseInt(num);
let minutes = parseInt(seconds/60);
seconds -= minutes*60;
const hours = parseInt(minutes/60);
if(hours == 0) {return `${minutes}:${String(seconds%60).padStart(2, 0)}`};
return `${String(hours).padStart(2, 0)}: ${minutes}:${String(seconds%60).padStart(2, 0)}`;

}










