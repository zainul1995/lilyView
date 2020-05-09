/* eslint-disable */
// here axios is used from cdn version as external module from system file is not supported;
// 2. This code loads the IFrame Player API code asynchronously.
var button = document.querySelector('.btn');
var button2 = document.querySelector('.load');
var form = document.querySelector('.form-group');
var tag = document.createElement('script');
var timer = document.querySelector('.badge');
var emailelement = document.querySelector('.user');
var passwordelement = document.querySelector('.password');
var signin = document.getElementById("signin");

tag.src = 'https://www.youtube.com/iframe_api';
tag.className = 'd-flex justify-content-sm-center';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
let videoId;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '480',
    videoId: 'DGQwd1_dpuc',
    playerVars: { rel: 0, showinfo: 0, ecver: 2 },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.pauseVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 600000);
    done = true;
    setInterval(calcCounts, 1000);
  }
}

function stopVideo() {
  player.stopVideo();
}
let video = [];
const loadIds = async () => {
  const response = await axios({
    method: 'GET',
    // baseURL : '',
    url: 'http://127.0.0.1:3000/api/v1/user/view/videos',
    
  });
  const timers = [];
  video = response.data.videos;
  console.log(video);
  // timers = response.data.
  // console.log(response);
}
// let  urlVideoId = ['j5SO_pt4UwY', 'fz_457Lj1tc', 'JDrgbJomnbE'];
let x = 0;


button2.addEventListener('click', async () => {
  await loadIds();
  
});

button.addEventListener('click', async () => {
  // videoId = 'qyYdnbNM2hc';
  videoId = video[x].submittedVideoIds;
  const markup = `<label for="formGroupExampleInput">Q1. ${video[x].questions[0]}</label>`;
  form.innerHTML= '';
  form.insertAdjacentHTML('beforeend', markup);
  player.loadVideoById(videoId, 0, 'large');
  x++;
});


const calcCounts = async () => {
  let counter = await player.getCurrentTime();
  counter = Math.floor(counter);
  console.log(counter);
  timer.textContent = `${counter}`;
  calculatePoints(counter);
}
const calculatePoints = (counter) => {
  if(counter === 5){
    console.log('completed');

  };
}
const dataCapture =  async () => {
const email = await emailelement.value;
const password = await passwordelement.value;

const response = await axios({
    method: 'POST',
    withCredentials: true,
    // baseURL : '',
    url: 'http://127.0.0.1:3000/api/v1/user/login',
    data: {
      email,
      password
    }
    
  });
  if(response.data.status == 'success'){
    console.log(`logged in successfully ${ response.data.token}`);
  }
  
}  

signin.addEventListener('click', async () => {
  await dataCapture();
  // const response = await axios({
  //   method: 'POST',
  //   // baseURL : '',
  //   url: 'http://127.0.0.1:3000/api/v1/user/login',
  //   data: {
  //     email,
  //     password
  //   }
    
  // });
  // if(response.data.status == 'success'){
  //   console.log('logged in successfully');
  // }
  
});