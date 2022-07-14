const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector('img');
const next = document.getElementById("Next");
const prev = document.getElementById('prev');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const myProgressBar = document.getElementById('progress')
const run_time = document.getElementById('current_time');
const total_duration = document.getElementById('duration');
const progress_bar = document.getElementById('progress_bar');

const songs=[
    {
    name:"a thousand years",
    title:"a thousand years",
    artist:"christina perri"
},  
{
    name:"let me love you",
    title:"let me love you",
    artist:"Justin Beiber"
}, 
 {
    name:"closer",
    title:"closer",
    artist:"The chainsmoker"
}, 
 
 {
    name:"someone you love",
    title:"someone you love",
    artist:"lewis capaldi"
}
]
let isPlaying =true;


const playMusic =()=>{
    music.play();
    isPlaying =false;

    play.classList.replace('fa-play','fa-pause');
   
    img.classList.add('rotateImg')
}
const pauseMusic =()=>{
    music.pause();
    isPlaying =true;
   
       play.classList.replace('fa-pause','fa-play');
      
       img.classList.remove('rotateImg')
}
play.addEventListener('click',()=>{
    if(isPlaying){
    playMusic();
   }
   else{
 pauseMusic();
   }
})

const songsLoad =(songs)=>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;

    music.src =`music/${songs.name}.mp3`
    img.src =`img/${songs.name}.jfif`;
 

}
songIndex=0;
const nextSong =()=>{
    songIndex = (songIndex + 1)%songs.length;
    songsLoad(songs[songIndex]);
   playMusic();
}
const prevSong=()=>{
    songIndex = (songIndex - 1 + songs.length)%songs.length;
    songsLoad(songs[songIndex]);
    playMusic();
}
music.addEventListener('timeupdate', () => {

;
 const {currentTime,duration} =event.srcElement;

 let progress_time = (currentTime/duration)*100;

 myProgressBar.style.width =`${progress_time}%`;
let  min_currentTime = Math.floor(currentTime/60);
let sec_currentTime = Math.floor(currentTime%60);
console.log(sec_currentTime);

 if(sec_currentTime<10){
 sec_currentTime =`0${sec_currentTime}`;
 }
 run_time.innerHTML =`${min_currentTime}:${sec_currentTime}`;

 let  min_duration = Math.floor(duration/60);
let sec_duration = Math.floor(duration%60);
 if(duration){
    if(sec_duration<10){
        sec_duration =`0${sec_duration}`;
    }
    total_duration.innerHTML = `${min_duration}:${sec_duration}`; 
 }



});
progress_bar.addEventListener('click',(event)=>{
   
    const{duration} = music;
    let move_progress = (event.offsetX/event.srcElement.clientWidth)*duration;// progress_bar touch in percentage convert to sec
  
 music.currentTime =move_progress;
});


music.addEventListener('ended',nextSong);
next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);