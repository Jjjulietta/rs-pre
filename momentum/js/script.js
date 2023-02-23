
/*------------------DICTIONARY AND SETTINGS---------------------*/
const greetingTranslation = {
    ru: { morning: 'Доброе утро,', afternoon: "Добрый день,", evening: "Добрый вечер,", night: "Доброй ночи,"},
    en : 'Good'
}

const weatherTtanslation = {
    ru: { wind : 'Скорость ветра', humidity: 'Влажность' },
    en: { wind : 'Wind speed', humidity: 'Humidity' }
}

const settingsTranslation = {
    ru: { btnRus : 'Рус', btnEng : 'Англ', titleLang: 'ЯЗЫК', close: 'закрыть', btnTime: 'время', btnDay: 'дата', btnGreet: 'приветствие', btnQuote: 'цитата', btnWeather: 'погода', btnAudio: 'аудио', btnTodo: 'список дел', constrTitle: 'КОНСТРУКТОР', imgTitle: 'Источники ИЗОБРАЖЕНИЙ'},
    en: { btnRus : 'Rus', btnEng : 'Eng', titleLang: 'LANGUAGE', close: 'close', btnTime: 'time', btnDay: 'date', btnGreet: 'greeting', btnQuote: 'quote', btnWeather:'weather', btnAudio:'audio', btnTodo: 'toDoList', constrTitle: 'CONSTRUCTOR', imgTitle: 'Image sourses'}
}

let stateApp = {
    language: 'Eng',
    photoSource: 'GitHub',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist', 'время', 'дата', 'приветствие', 'цитата', 'погода', 'аудио', 'список дел'],
    blocksRu: [ ]

  } 

  

/*----------TIME----------------*/
const time = document.querySelector('.time');
const lang = document.querySelector('.lang');
let l;
function showTime(l){
    const date = new Date();
    const currentTime = date.toLocaleTimeString()
    l = lang.innerHTML;
    time.textContent = `${currentTime}`;
    showDate(l)
    showGreeting(l);
    setTimeout(showTime, 1000);
    
}

/*--------------DATE------------------------*/

const day = document.querySelector('.date');
function showDate(l = 'Eng') {
    
    const date = new Date();
    const options = {weekday: 'long',  month: 'long',  day: 'numeric'}
    let currentDate = date.toLocaleDateString('en-US', options);
    day.textContent = `${currentDate}`;
    if(l == 'Rus') {
        currentDate = date.toLocaleDateString('ru-RU', options);
        return day.textContent = `${currentDate}`;
    }
  
}
/*-----------------GREETING-------------------*/
const name = document.querySelector('.name');

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
   
    if(hours >= 0 && hours < 6) {return 'Night'} 
    else if(hours < 12 && hours >= 6) {return 'Morning';} 
    else if(hours  >= 12 && hours < 18) {return 'Afternoon';} 
    else if(hours >= 18 && hours < 24) {return 'Evening';} 
    }

 const greeting = document.querySelector('.greeting');
function showGreeting(l = 'Eng') {
    
       let timeOfDay = getTimeOfDay();
     greeting.textContent = `${greetingTranslation.en} ${timeOfDay},`; 
     if(l == 'Rus') {
        if(timeOfDay == 'Morning') { return greeting.textContent = `${greetingTranslation.ru.morning}`} 
        else if(timeOfDay == 'Afternoon') {return greeting.textContent = `${greetingTranslation.ru.afternoon}`} 
        else if(timeOfDay == 'Evening') { return greeting.textContent = `${greetingTranslation.ru.evening}`}
        else if(timeOfDay == 'Night') { return greeting.textContent = `${greetingTranslation.ru.night}`}
     }
};

function setLocalStorage() {
    
    localStorage.setItem('name', name.value)
    
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
    if(localStorage.getItem('name')) {
        
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
    
setBg()

/*----------------------WEATHER----------------------------------*/
const weatherBlock = document.querySelector('.weather')
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

async function getWeather(l) {
l = lang.innerHTML;
let langWeather;
if(l == 'Eng'){ langWeather = 'en'} else if(l == 'Rus') { langWeather = 'ru'}
try{
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langWeather}&appid=c8243da569a99643213863e851fa9cbf&units=metric`;
const res = await fetch(url);
const data = await res.json();
weatherIcon.classList.add(`owf-${data.weather[0].id}`);
temperature.textContent = `${Math.round(data.main.temp)}°C`;
weatherDescription.textContent = `${data.weather[0].description}`;

if(langWeather == 'en'){  wind.textContent = `${weatherTtanslation.en.wind}: ${Math.round(data.wind.speed)} m/s`;
humidity.textContent = `${weatherTtanslation.en.humidity}: ${data.main.humidity}%`;}
else if(langWeather == 'ru') { wind.textContent = `${weatherTtanslation.ru.wind}: ${Math.round(data.wind.speed)} м/с`
humidity.textContent = `${weatherTtanslation.ru.humidity}: ${data.main.humidity}%`; }

} catch(e){alert('Ошибка!'+' ' + 'Название населеного пункта отстутсвует либо введено некорректно.')}
}

city.addEventListener('change', getWeather);

function setLocalStor() {
    localStorage.setItem("city", city.value)

}
window.addEventListener("beforeunload", setLocalStor);


/*----------------------QUOTES-------------------------------*/

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes(l) {
    l = lang.innerHTML;
    let quotes;
    if(l == 'Eng') { quotes = '../data.json'} if(l == 'Rus') {
        quotes = '../data_ru.json'
    }    
    let res = await fetch(quotes);
    let data = await res.json();
    let quoteNew = data[Math.floor(Math.random()*data.length)]
    quote.textContent = `"${quoteNew.text}"`;
    author.textContent = quoteNew.author;
}

 window.addEventListener('click', getQuotes());  

changeQuote.addEventListener('click', getQuotes);

/*----------------------AUDIO-------------------------*/
import playList from "./play_list.js";
//playList by JS

const audioPlayer = document.querySelector('.player')
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const play = document.querySelector('.play');
const playListContainer = document.querySelector('.play-list');
const song = document.querySelector('.song');
const playerList = document.querySelector('.player-list');
console.log(playerList)

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
        song.textContent = '';
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

playerList.addEventListener('click', ()=>{
    audioPlayer.classList.toggle('player-open');
    playListContainer.classList.toggle('play-list_open')
})


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

/*------------------POPAP------------------------*/

const settingBtn = document.querySelector('.settings-btn');
const popap = document.querySelector('.popap');
const popapBody = document.querySelector('.popap-body');
const englBtn = document.querySelector('.english-btn');
const rusBtn = document.querySelector('.russian-btn');
const closePopap = document.querySelector('.popap-close');
const langTitle = document.querySelector('.languages-title');

console.log(rusBtn);
settingBtn.addEventListener('click', ()=>{
    popap.classList.add('popap-open');
    popapBody.classList.add('popap-active');
   
}
)

closePopap.addEventListener('click', ()=>{
    popap.classList.remove('popap-open');
    popapBody.classList.remove('popap-active');
    
}
)

/*----------------TRANSLATION------------*/

englBtn.addEventListener('click', ()=>  {
    lang.innerHTML = 'Eng';
    rusBtn.classList.remove('lang-active');
    englBtn.classList.add('lang-active');
    l = lang.innerHTML;
    stateApp.language = 'Eng'
    if(city.value == 'Минск') {city.value = 'Minsk'}
    showTime(l);
    getWeather(l);
    getQuotes(l);
    settingsTranslat(l)
} 
    )

rusBtn.addEventListener('click', ()=>{
    lang.innerHTML = 'Rus';
    englBtn.classList.remove('lang-active')
    rusBtn.classList.add('lang-active');
    l = lang.innerHTML;
    stateApp.language = 'Rus'
    name.placeholder = '[Введите имя]';
    if(city.value == 'Minsk') {city.value = 'Минск'}
    showTime(l);
    getWeather(l);
    getQuotes(l)
    settingsTranslat(l)
}  
)

/*window.addEventListener('beforeunload', setLocalStorageLang);*/
window.addEventListener('load', showTime())

const imgTitle = document.querySelector('.images-title');
const constrTitle = document.querySelector('.constr-title');
const timeBtn = document.querySelector('.time-btn');
const dayBtn = document.querySelector('.day-btn');
const greetBtn = document.querySelector('.greet-btn');
const quoteBtn = document.querySelector('.quote-btn');
const weatherBtn = document.querySelector('.weather-btn');
const audioBtn = document.querySelector('.audio-btn');
const todoBtn = document.querySelector('.todo-btn');



function settingsTranslat(l) {
   l = lang.innerHTML;
   if(l == 'Eng') {
   langTitle.innerHTML = `${settingsTranslation.en.titleLang}`;
   englBtn.innerHTML = `${settingsTranslation.en.btnEng}`;
   rusBtn.innerHTML = `${settingsTranslation.en.btnRus}`;
   closePopap.innerHTML = settingsTranslation.en.close;
   timeBtn.innerHTML = settingsTranslation.en.btnTime;
   dayBtn.innerHTML = settingsTranslation.en.btnDay;
   greetBtn.innerHTML = settingsTranslation.en.btnGreet;
   quoteBtn.innerHTML = settingsTranslation.en.btnQuote;
   weatherBtn.innerHTML = settingsTranslation.en.btnWeather;
   audioBtn.innerHTML = settingsTranslation.en.btnAudio;
   todoBtn.innerHTML = settingsTranslation.en.btnTodo;
   constrTitle.innerHTML = settingsTranslation.en.constrTitle;
   imgTitle.innerHTML = settingsTranslation.en.imgTitle;
   }
   else if(l == 'Rus') {
    langTitle.innerHTML = `${settingsTranslation.ru.titleLang}`
    englBtn.innerHTML = settingsTranslation.ru.btnEng;
    rusBtn.innerHTML = settingsTranslation.ru.btnRus;
    closePopap.innerHTML = settingsTranslation.ru.close;
    timeBtn.innerHTML = settingsTranslation.ru.btnTime;
   dayBtn.innerHTML = settingsTranslation.ru.btnDay;
   greetBtn.innerHTML = settingsTranslation.ru.btnGreet;
   quoteBtn.innerHTML = settingsTranslation.ru.btnQuote;
   weatherBtn.innerHTML = settingsTranslation.ru.btnWeather;
   audioBtn.innerHTML = settingsTranslation.ru.btnAudio;
   todoBtn.innerHTML = settingsTranslation.ru.btnTodo;
   constrTitle.innerHTML = settingsTranslation.ru.constrTitle;
   imgTitle.innerHTML = settingsTranslation.ru.imgTitle;
   }
}

 
/*-------------------PICTURES API---------------------------*/


let timeOfDay = getTimeOfDay();
    let q = `${timeOfDay}`.toLowerCase();

async function getLincToImageUnsplash(q) {
    const url = `https://api.unsplash.com/photos/random?query=${unsplashTag.value}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;
    const res =  await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)
    body.style.backgroundImage = `url(${data.urls.regular})`;
    
}

async function getLincToImageFlic(q) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=701f876e63bd4a918eaf824e809b23e8&tags=${flicTag.value}&extras=url_l&format=json&nojsoncallback=1`;
    const res =  await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)
    body.style.backgroundImage = `url(${data.urls.regular})`;
    
}

const gitImg = document.querySelector('.git-img');
const unsplashImg = document.querySelector('.api1-img');
const flicImg = document.querySelector('.api2-img');
const unsplashName = document.querySelector('.api1-name');

const flicName = document.querySelector('.api2-name');
const unsplashTag = document.querySelector('.api1-tag');
const flicTag = document.querySelector('.api2-tag');
const changApi1 = document.querySelector('.change-api1');
const changApi2 = document.querySelector('.change-api2');

function setLocalStorageApi1(){
    localStorage.setItem('unsplashTag', unsplashTag.value)
}

function setLocalStorageApi2(){
    localStorage.setItem('flicTag', flicTag.value)
}


window.addEventListener('load', getLocalStorageApi1);
window.addEventListener('load', getLocalStorageApi2);

gitImg.addEventListener('click', ()=>{
    gitImg.classList.add('img-active');
    unsplashName.classList.remove('img-active');
    flicName.classList.remove('img-active');
    flicTag.classList.remove('api-open');
    unsplashTag.classList.remove('api-open');
    stateApp.photoSource = gitImg.innerHTML;
     setBg()
});

unsplashImg.addEventListener('click', ()=>{
    unsplashName.classList.add('img-active');
    gitImg.classList.remove('img-active');
    flicName.classList.remove('img-active');
    flicTag.classList.remove('api-open');
    getLincToImageUnsplash();
    unsplashTag.classList.add('api-open');
    stateApp.photoSource = unsplashName.innerHTML;
    console.log(body.style.backgroundImage);
    console.log(unsplashTag.value)
});

flicImg.addEventListener('click', ()=>{
    flicName.classList.add('img-active');
    gitImg.classList.remove('img-active');
    unsplashName.classList.remove('img-active');
    unsplashTag.classList.remove('api-open');
    getLincToImageFlic();
    flicTag.classList.add('api-open');
    stateApp.photoSource = flicName.innerHTML;
    console.log(body.style.backgroundImage);
    console.log(flicTag.value)
})


function getLocalStorageApi1(){
    if(localStorage.getItem('unsplashTag')) {

       unsplashTag.value = localStorage.getItem('unsplashTag')
    } else {unsplashTag.value = q}
}


function getLocalStorageApi2(){
    if(localStorage.getItem('flicTag')) {

       flicTag.value = localStorage.getItem('flicTag')
    } else {flicTag.value = q}
}


flicTag.addEventListener('change', ()=>{
    getLincToImageFlic(flicTag.value);
    setLocalStorageApi2();
})

unsplashTag.addEventListener('change', ()=>{
    getLincToImageUnsplash(unsplashTag.value);
    setLocalStorageApi1();
})

function getSliderNext() {
    if(gitImg.classList.contains('img-active')) {
    if(randomNum < 20) {randomNum = randomNum +1}
    else if(randomNum == 20) {randomNum = 1} 
    
    setBg()}
    if(unsplashName.classList.contains('img-active')) {
        getLincToImageUnsplash();
        }
    if(flicName.classList.contains('img-active')){
        getLincToImageFlic();
    }
}

function getSliderPrev() {
    if(gitImg.classList.contains('img-active')) {
    if(randomNum > 1) {randomNum = randomNum - 1}
    else if(randomNum == 1) {randomNum = 20} 
    setBg()
    }
    if(unsplashName.classList.contains('img-active')) {
        getLincToImageUnsplash();
        }
    if(flicName.classList.contains('img-active')){
        getLincToImageFlic();
    }
    
}
const sliderNext = document.querySelector('.slide-next');
const sliderPrev = document.querySelector('.slide-prev');
sliderNext.addEventListener('click', getSliderNext);
sliderPrev.addEventListener('click', getSliderPrev);


window.addEventListener('beforeunload', setLocalStorageApi1);

window.addEventListener('beforeunload', setLocalStorageApi2);



/*-------------------SETTINGS--------------------*/

const state = {
    blocks: {},
    
  }
 

  state.blocks.time = showTimeBlock;
  state.blocks.date = showDateBlock;
  state.blocks.greeting = showGreetBlock;
  state.blocks.quote = showQuote;
  state.blocks.weather = showWeatherBlock;
  state.blocks.audio = showPlayer;

  state.blocks.время = showTimeBlock;
  state.blocks.дата = showDateBlock;
  state.blocks.приветствие = showGreetBlock;
  state.blocks.цитата = showQuote;
  state.blocks.погода = showWeatherBlock;
  state.blocks.аудио = showPlayer;

  
  function changeBlocks(elem){  
    
    let i = stateApp.blocks.indexOf(elem)
    if( i != -1) { stateApp.blocks.splice(i, 1)} else {stateApp.blocks.push(elem)}
    
  }

console.log(state)
console.log(state.blocks)
const constrBtn = document.querySelector('.constr-btn');
const constrBtnLi = document.querySelectorAll('.constr-btn >li');
console.log(constrBtn);


//save settings// get settings
function getStatus(){
    lang.innerHTML = stateApp.language;
    if(stateApp.language == 'Eng') {
        englBtn.classList.add('lang-active')
    } else {rusBtn.classList.add('lang-active')};


    if(stateApp.photoSource == gitImg.innerHTML){
        gitImg.classList.add('img-active');
        setBg()
    }
    if(stateApp.photoSource == unsplashName.innerHTML){
        unsplashName.classList.add('img-active');
        getLincToImageUnsplash();
    }
    if(stateApp.photoSource == flicName.innerHTML){
        flicName.classList.add('img-active');
        getLincToImageFlic()
    }
    for(let key in state.blocks) {
    if(!stateApp.blocks.includes(key)) {
        console.log(key);
        state.blocks[key]();
        constrBtnLi.forEach(el=>{
            if(el.innerHTML == key) {el.classList.add('active-block'); console.log(key); }
        })
         continue;
    }  /* else if(lang.innerHTML == 'Rus' && !stateApp.blocksRu.includes(key)) {
        console.log(key);
        state.blocks[key]();
        constrBtnLi.forEach(el=>{
            if(el.innerHTML == key) {el.classList.add('active-block'); console.log(key); }
        })
         continue;
    } */
    else {break }
    
   }
   
    getQuotes(l)
    settingsTranslat(l) 
    getWeather(l);
}


// Change block visibility

constrBtn.addEventListener('click', (event)=>{
let target = event.target;
console.log(target);
if(target.tagName == 'LI'){
    console.log(target.tagName)
constrBtnLi.forEach((el=>{
    if(el.innerHTML == target.innerHTML){
       console.log(el.innerHTML) 
        if(el.classList.contains('active-block')) {
            el.classList.remove('active-block');
            
        } else{el.classList.add('active-block')}

        for(let key in state.blocks) {
                                 
            if(el.innerHTML == key) { state.blocks[key](); 
        }  }
        changeBlocks(el.innerHTML);
        console.log(state)
    }
})) }
})
const timeDiv = document.querySelector('.time-div')
const greetingCont = document.querySelector('.greeting-container');

//function block visibility

function showTimeBlock(){
   time.classList.toggle('hidden')
    }

function showDateBlock() {
    day.classList.toggle('hidden')
}

function showGreetBlock() {
    greetingCont.classList.toggle('hidden')
}

function showWeatherBlock() {
    weatherBlock.classList.toggle('hidden')
}

function showPlayer() {
    audioPlayer.classList.toggle('hidden')
}

function showQuote() {
    quote.classList.toggle('hidden');
    author.classList.toggle('hidden');
}

function setLocalStorageState(){
    localStorage.setItem('stateApp', JSON.stringify(stateApp))
}

function getLocalStorageState(){
    if(localStorage.getItem('stateApp')) {
        stateApp = JSON.parse(localStorage.getItem('stateApp'))
       
    }
}

window.addEventListener('beforeunload', setLocalStorageState);
  window.addEventListener('load', getLocalStorageState);

//document.addEventListener('DOMContentLoaded', getLocalStorageState)
//document.addEventListener('DOMContentLoaded', getStatus)
window.addEventListener('load', getStatus)


/*-----------------------TODO--------------------*/

const popapToDo = document.querySelector('.popap-todo');
const taskTitle = document.querySelector('.task-title');
const taskBlock = document.querySelector('.task-block');
console.log(popapToDo);

let date = new Date();
    console.log(date)
    let dayToday = date.getDate();
    console.log(dayToday);
    let monthToday = date.getMonth();
    let options = {month: 'long'}
    let month = date.toLocaleDateString('en-US', options);
    let monthNextNum = monthToday + 1;
    let nextDate = new Date(2023, monthToday + 1);
     console.log(nextDate);
    let monthNameNext = nextDate.toLocaleDateString('en-US', options);

    


todoBtn.addEventListener('click', ()=>{
    popapToDo.classList.toggle('todo-active');
    todoBtn.classList.toggle('todo-btn_active')
    if(inboxNext.classList.contains('inbox-next_open')){
        inboxNext.classList.remove('inbox-next_open')
         
      }
    if(popapInbox.classList.contains('inbox-open')) {
        popapInbox.classList.remove('inbox-open');
        inboxTask.classList.remove('inbox-active');
      }
    if( todayTaskBlock.classList.contains('popap-today_open')) {
        todayTaskBlock.classList.remove('popap-today_open');
        todayBtn.classList.remove('today-active');
    }
    if(popapDone.classList.contains('popap-done_open')){
        popapDone.classList.remove('popap-done_open');
        doneTaskBtn.classList.remove('done-active')
    }
});

taskTitle.addEventListener('click', ()=>{
    taskBlock.classList.toggle('task-active')
})


function createCalendar(elem, year, month){
   let mon = month-1;
   let d = new Date(year, mon);
   console.log(d.getDay())
   let table = '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';
   for(let i = 0; i < getDay(d); i++){
    table += '<td></td>'
    }

    while(d.getMonth() == mon) {
    table += '<td>' + d.getDate() + '</td>';
    if(getDay(d)% 7  == 6) {
        table += '<tr></tr>'
    }
    d.setDate(d.getDate()+1);
    }

    if(getDay(d) != 0) {
        for(let i = getDay(d); i < 7; i++) {
            table += '<td></td>'
        }
    }

    table += '</tr></table>'

    elem.innerHTML = table;
    calendar.classList.add('table-head');
    
}

const table = document.querySelector('.table')

function getDay(date) {
   let day = date.getDay();
   if(day == 0) day = 7; return day-1;}


const popapInbox = document.querySelector('.popap-inbox');
const inboxTask = document.querySelector('.inbox-task');
const calendar = document.querySelector('.calendar');
const monthNext = document.querySelector('.month-next');
const arrowNext = document.querySelector('.arrow');
const arrowTop = document.querySelector('.arrow-top');
const arrowBottom = document.querySelector('.arrpw-bottom');

inboxTask.addEventListener('click', ()=>{
    inboxTask.classList.toggle('inbox-active');
    popapInbox.classList.toggle('inbox-open');
   if(inboxNext.classList.contains('inbox-next_open')){
      inboxNext.classList.remove('inbox-next_open')
       
    }
           
})

const dateTask = document.querySelector('.task-date');
const timeTask = document.querySelector('.task-time')
const taskText = document.querySelector('.task-text');
const saveTask = document.querySelector('.button-save');
const cancelTask = document.querySelector('.button-cancel');
const monthName = document.querySelector('.month-name');

cancelTask.addEventListener('click', ()=>{
    taskBlock.classList.remove('task-active')
})

createCalendar(calendar, 2023, monthToday+1);
monthName.innerHTML = month
    

let obj = {month: '', day: {}}; 
let objNext = {month: '', day: {}};

saveTask.addEventListener('click', ()=>{
    let dayTask = new Date(dateTask.value);
    let monthNum = dayTask.getMonth();
    console.log(monthNum)
    let timeTk = timeTask.value;
    let day = dayTask.getDate();
    let tasktime = {}
    tasktime[`${timeTk}`] = taskText.value;;
    console.log(tasktime)
    console.log(day);
    let options = {month: 'long'}
    let month = dayTask.toLocaleDateString('en-US', options);
    console.log(month);
    if(monthNum == monthToday) {
    if(obj.month == "") {obj.month = month; monthName.innerHTML = month;
        obj.day[`${day}`] = [tasktime]; console.log(obj.day[day])
    } else  if(obj.month == month) {  let keys = Object.keys(obj.day); console.log(keys); if(keys.includes(String(day))) { obj.day[day].push(tasktime); console.log(obj.day[day]) } 
     else { obj.day[`${day}`] = [tasktime] }}
    } else if(monthNum > monthToday) { if(objNext.month == "") {objNext.month = month; monthName.innerHTML = month;
        objNext.day[`${day}`] = [tasktime]; console.log(objNext.day[day])
    } else  if(objNext.month == month) {  let keys = Object.keys(objNext.day); console.log(keys); if(keys.includes(String(day))) { objNext.day[day].push(tasktime); console.log(objNext.day[day]) } 
     else { objNext.day[`${day}`] = [tasktime] }}

    }
    setLocalStorageObj();
    taskText.value = '';
    dateTask.value = '';
    timeTask.value = '';
    
    console.log(obj);
    
   
})

// check 1 month date
function checkFirstDate() {
    if(dayToday == 1) {
        obj = objNext;
        objNext = {month: '', day: {}}
    }
}

function createNextMonth(){
    let div = document.createElement('DIV');
    div.classList.add('inbox-next');
    popapInbox.append(div);
    let divcal = document.createElement('DIV');
    div.prepend(divcal);
    divcal.classList.add('inbox-calendar_next')
    let h2 = document.createElement('H2');
    h2.classList.add('month-name_next');
    h2.innerHTML = `${monthNameNext}`
    divcal.prepend(h2);
    let cal = document.createElement('DIV');
    cal.classList.add('calendar-next');
    divcal.append(cal);
    let divPrep = document.createElement('DIV');
    divcal.append(divPrep);
    divPrep.classList.add('month-prev')
    let divArrName = document.createElement('DIV');
    divPrep.prepend(divArrName);
    divArrName.innerHTML = 'previous month';
    divArrName.classList.add('prev-month')
    let divPrepArr = document.createElement('DIV');
    divArrName.after(divPrepArr);
    divPrepArr.classList.add('arrow-prev')
    let span = document.createElement('SPAN');
    divPrepArr.prepend(span);
    span.classList.add('arrow-top_pre')
    let spanAr = document.createElement('SPAN');
    span.after(spanAr);
    spanAr.classList.add('arrow-bottom_pre')  
    
}

createNextMonth();

const inboxNext = document.querySelector('.inbox-next');
const calendarNext = document.querySelector('.calendar-next');
const monthPrev = document.querySelector('.prev-month');
console.log(monthPrev)

createCalendar(calendarNext, 2023, monthNextNum + 1)

//open Inbox-Next

monthNext.addEventListener('click', ()=>{
    inboxNext.classList.add('inbox-next_open')
    
 })

//close Inbox-next

monthPrev.addEventListener('click', ()=>{
    inboxNext.classList.remove('inbox-next_open')
})

function setLocalStorageObj(){
    localStorage.setItem('obj', JSON.stringify(obj))
}

function getLocalStorageObj(){
    if(localStorage.getItem('obj')){
        obj = JSON.parse(localStorage.getItem('obj'));
    }
    
}

function setLocalStorageObjNext(){
    localStorage.setItem('objNext', JSON.stringify(objNext))
}

function getLocalStorageObjNext(){
    if(localStorage.getItem('objNext')){
        objNext = JSON.parse(localStorage.getItem('objNext'));
    }
    
}


window.addEventListener('beforeunload', ()=>{ setLocalStorageObj();
setLocalStorageObjNext()} );
//window.addEventListener('load', getLocalStorageObj)
window.addEventListener('load',  ()=>{ getLocalStorageObj(); 
    getLocalStorageObjNext(); checkFirstDate();
    createTask(); showTaskDay(); showTaskDayNextMonth();
    createTaskNext()}) 

let monthDays = calendar.querySelectorAll('td'); // 
console.log(monthDays);

let monthNextDay = calendarNext.querySelectorAll('td');
console.log(monthNextDay)

let listEs = document.querySelectorAll('list-el');
console.log(listEs)

/*----------create TASK LIST MONTH  HEAD----------------*/

function createListTask(){
    let div = document.createElement('DIV');
    popapInbox.append(div);
    let h2 = document.createElement('H2')
    h2.innerHTML = `Task list ${month}`;
    div.prepend(h2)
    div.classList.add('inbox-list');
    h2.classList.add('inbox-title');
    

}
createListTask();
  
function createListTaskNext(){
    let div = document.createElement('DIV');
    inboxNext.append(div);
    let h2 = document.createElement('H2')
    h2.innerHTML = `Task list ${monthNameNext}`;
    div.prepend(h2)
    div.classList.add('inbox-list_next');
    h2.classList.add('inbox-title');
    

}

createListTaskNext()

let inboxList = document.querySelector('.inbox-list');
let inboxListNext = document.querySelector('.inbox-list_next')
console.log(inboxListNext)
const inboxTitle = document.querySelector('.inbox-title');

function createTask(){
    
    for(let key in obj.day) {
        if(key > dayToday) {
        console.log(key)
        let ul = document.createElement('UL');
        inboxList.append(ul);
        ul.innerHTML = key;
        for(let prop of obj.day[key]) {
            console.log(prop)
            for(let item in prop){
                console.log(prop[item])
                let li = document.createElement('LI');
                li.innerHTML = prop[item];
                ul.append(li);
                li.classList.add('list-el')
                let span = document.createElement('SPAN');
                span.innerHTML = item;
                li.append(span)
            }
        }
    }
}  
    
}

function createTaskNext(){
    
    for(let key in objNext.day) {
        let ul = document.createElement('UL');
        inboxListNext.append(ul);
        ul.innerHTML = key;
        for(let prop of objNext.day[key]) {
            console.log(prop)
            for(let item in prop){
                console.log(prop[item])
                let li = document.createElement('LI');
                li.innerHTML = prop[item];
                ul.append(li);
                li.classList.add('list-el_next')
                let span = document.createElement('SPAN');
                span.innerHTML = item;
                li.append(span)
            }
        }
    }
}  
    



function showTaskDay(){
     for(let i = 0; i < monthDays.length; i ++) {
        for(let key in obj.day){
            if(monthDays[i].innerHTML == key && key >= dayToday) {
                monthDays[i].classList.add('td-active');
            }
            else if(monthDays[i].innerHTML == key && key < dayToday) {
                monthDays[i].classList.add('td-inactive')
            }
     }

     }
     let activDays = document.querySelectorAll('.td-active');
console.log(activDays)

activDays.forEach((el) => {
    el.addEventListener('click', ()=>{
        inboxList.classList.add('inbox-list_close');
        listDay.classList.add('list-day_open')
        showListTaskDay(el.innerHTML);
   
    
})
      
})
}

function showTaskDayNextMonth(){
    for(let i = 0; i < monthNextDay.length; i ++) {
       for(let key in objNext.day){
           if(monthNextDay[i].innerHTML == key) {
               monthNextDay[i].classList.add('td-active');
           }
           
    }

    }
    
}

function createListDay(){
    let div = document.createElement('DIV');
    inboxList.after(div);
    div.classList.add('list-day')
    let h2 = document.createElement('H2');
    div.prepend(h2)
    h2.innerHTML = "Task list day";
    h2.classList.add('day-title');
    let ul = document.createElement('UL');
    h2.after(ul);
    ul.classList.add('day-list');
    let span = document.createElement('SPAN');
    span.innerHTML = 'back to month list';
    span.classList.add('back')
    div.append(span);
}

createListDay();

let daylist = document.querySelector('.day-list')
let backMonth = document.querySelector('.back');
let listDay = document.querySelector('.list-day')

backMonth.addEventListener('click', ()=>{
    inboxList.classList.remove('inbox-list_close')
    listDay.classList.remove('list-day_open')
    console.log(listDay)
})

function showListTaskDay(day){
    console.log(daylist.children)
    Array.from(daylist.children).forEach(el =>{
        el.outerHTML ='';
    })
       
    for(let key in obj.day){
        if(day == key) {
            for(let prop of obj.day[key]) {
                   for(let item in prop){
                    let li = document.createElement('LI');
                    li.innerHTML = prop[item];
                    daylist.append(li);
                    li.classList.add('list-el')
                    let span = document.createElement('SPAN');
                    span.innerHTML = item;
                    li.append(span)
                    
                }
            }
        }
    }
  

}

/*-----------POPAP-TODO-----------*/

const todayTaskBlock = document.querySelector('.popap-today');
const todayBtn = document.querySelector('.today-task');
const todayTitle = document.querySelector('.today-title');


todayBtn.addEventListener('click', ()=>{
    todayBtn.classList.toggle('today-active');
    todayTaskBlock.classList.toggle('popap-today_open')
})


async function createListToday(dayToday) {
    
    let ul = document.createElement('UL');
    todayTitle.after(ul);
    ul.classList.add('today-list');
    getLocalStorageObj();
    
    for(let key in obj.day){
        console.log(key)
        if(dayToday == key) {
            for(let prop of obj.day[key]) {
                   for(let item in prop){
                    let li = document.createElement('LI');
                    li.innerHTML = prop[item];
                    console.log(ul)
                    ul.append(li);
                    li.classList.add('today-el')
                    let span = document.createElement('SPAN');
                    span.innerHTML = item;
                    li.prepend(span);
                    let div = document.createElement('DIV');
                    div.classList.add('today-el_btn');
                    li.prepend(div)
                    
                }
            }
        } 
    }
}

createListToday(dayToday)

const todayElBtn = document.querySelectorAll('.today-el_btn');
console.log(todayElBtn)
todayElBtn.forEach(el=>{
       el.addEventListener('click', ()=>{
    
       el.classList.toggle('today-el_done');
})})

/*-----------POPAP DONE------------------*/

const popapDone = document.querySelector('.popap-done');
const doneTitle = document.querySelector('.done-title');
const doneTaskBtn = document.querySelector('.done-task');

doneTaskBtn.addEventListener('click', ()=>{
    popapDone.classList.toggle('popap-done_open');
    doneTaskBtn.classList.toggle('done-active')
})

function createListDone() {
    let date = new Date();
    console.log(date)
    let day = date.getDate();
    let montNum = `${String(date.getMonth() +1).padStart(2, 0)}`;
    console.log(montNum)
    let options ={month: 'long'};
    let month = date.toLocaleDateString('en-US', options)
    console.log(day);
    let ul = document.createElement('UL');
    doneTitle.after(ul);
    ul.classList.add('done-list');
    let h3 = document.createElement('H3');
    h3.innerHTML = month;
    ul.prepend(h3);
    h3.classList.add('done-month')
    getLocalStorageObj();
    
    for(let key in obj.day){
        console.log(key)
        if(key < day) {
            for(let prop of obj.day[key]) {
                   for(let item in prop){
                    let li = document.createElement('LI');
                    li.innerHTML = prop[item];
                    console.log(ul)
                    ul.append(li);
                    li.classList.add('done-el')
                    let span = document.createElement('SPAN');
                    span.innerHTML = item;
                    span.classList.add('done-time')
                    li.prepend(span);
                    let spanDay = document.createElement('SPAN');
                    spanDay.classList.add('done-day');
                    spanDay.innerHTML = key + '.'+`${montNum}`;
                    li.prepend(spanDay)
                    
                }
            }
        } 
    }

}

createListDone();