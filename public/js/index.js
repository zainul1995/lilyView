/*eslint-disable*/
// import '@babel/polyfill';

// included < Stage 4 proposals
import 'regenerator-runtime/runtime';
import axios from 'axios';
//javascript files
import {onYouTubeIframeAPIReady, onPlayerReady, onPlayerStateChange, stopVideo} from './youtube';
import {login, signup} from './userEntry';

//GLOBAL VARIABLES
let video = [];
let x = 0;
var player;



console.log('hellow from index');

//DOM elements
const signUpForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const uploadVideo = document.querySelector('.form--upload');
const btnLoad = document.getElementById('load-videos');
const btnNext = document.getElementById('next-video');
const badgeCounter = document.getElementById('counter');
const question = document.querySelector('.question-class');
const btnClaim = document.getElementById('claim');
const btnLogOut = document.getElementById('logout');

const changeVideo = () => {
  let videoId;
  videoId = video[x].submittedVideoIds;
  // question.innerHTML= '';
  // let y = 1; 
  //  video[x].questions.forEach((e, i) => {
  //     const markup = `<label for="formGroupExampleInput${i+1}">Q${i+1}. ${e} </label>
      
  //       <div class="custom-control custom-radio" id="formGroupExampleInput" >
  //         <input type="radio" id="customRadio${y}" name="customRadio${i}" class="custom-control-input" value="1">
  //         <label class="custom-control-label" for="customRadio${y}">Toggle this custom radio</label>
  //       </div>
  //       <div class="custom-control custom-radio" id="formGroupExampleInput">
  //         <input type="radio" id="customRadio${++y}" name="customRadio${i}" class="custom-control-input" value="2">
  //         <label class="custom-control-label" for="customRadio${y}">Or toggle this other custom radio</label>
  //       </div>`;
  //          question.insertAdjacentHTML('beforeend', markup);
  //          y++;
            
  //         });
          player.loadVideoById(videoId, 0, 'large');
         if(x < video.length - 1) x++;
  }

if(signUpForm) {
    signUpForm.addEventListener('submit', async e =>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        await signup(name,email,password,passwordConfirm);
    })
}

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    })
}

if(btnLoad){
console.log(window.location.pathname);

//   3. This function creates an <iframe> (and YouTube player)
//      after the API code downloads.

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '240',
        width: '340',
        videoId: 'M7lc1UVf-VE',
        playerVars: { rel: 0, showinfo: 0, ecver: 2, controls: 0 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
      
  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
  event.target.playVideo();
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

  const loadIds = async () => {
  const response = await axios({
  method: 'GET',
  url: '/api/v1/user/view/videos',

  });
  video = response.data.videos;
  console.log(video);
  
  }

  btnLoad.addEventListener('click', async () => {
  await loadIds();
  onYouTubeIframeAPIReady();
  });

  }
        
  if(btnNext) {    
    btnNext.addEventListener('click', changeVideo);
  }    
  
  if(btnClaim){
    btnClaim.addEventListener('click', async () => {
      const cored = await calcCounts();
      console.log(cored);
      if(cored == true){
       updatePoints();
       changeVideo();
  
        console.log('added points successfully');
      } else {
        console.log('complete video first');
      }
     
     })
 
  }

const updatePoints = async () => {
  const res = await axios({
    method: 'PATCH',
    url: '/api/v1/user/updatepoints'
    
  })
}

const calcCounts = async () => {
  let counter = await player.getCurrentTime();
  counter = Math.floor(counter);
  // console.log(counter);
  badgeCounter.textContent = `${counter}/${video[x].time}`;
  if(counter >= video[x].time){
    console.log('completed');
    return true;
  } else{
    return false;
  }   
  
}

if(uploadVideo){
  uploadVideo.addEventListener('submit', async () => {
    const submittedVideoIds= document.getElementById('url').value;
    const time = document.getElementById('watchtime').value;
    const noOfViews= document.getElementById('number').value;
    const res = await axios({
      method:'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/user/upload-video',
      data:{
        submittedVideoIds,
        time,
        noOfViews
      }
    })
    console.log(res.data);
  })

} 