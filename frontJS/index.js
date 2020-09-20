/*eslint-disable*/
// import '@babel/polyfill';

// included < Stage 4 proposals
import 'regenerator-runtime/runtime';
import axios from 'axios';
//javascript files
import {login, signup} from './userEntry';


//GLOBAL VARIABLES
let video = [];
let x = 0;
var player;
let videoId;





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
const categoryMenu  = document.querySelector('.dropdown-menu');


const changeVideo = () => {
  if(x < video.length -1) x++;
  videoId = video[x].submittedVideoIds;
  
  
   player.loadVideoById(videoId, 0, 'large');
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

async function mainLoader(category){
  

  //   3. This function creates an <iframe> (and YouTube player)
  //      after the API code downloads.
try {
  
  function onYouTubeIframeAPIReady(videoId) {
      player = new YT.Player('player', {
          height: '380',
          width: '100%',
          videoId: video[0].submittedVideoIds,
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
      if(player.l != null) { 
        
        setInterval(calcCounts, 1000);
      }
      }
    }
    function stopVideo() {
    player.stopVideo();
    }
  
    const loadIds = async (category) => {
    const response = await axios({
    method: 'GET',
    url: `/api/v1/user/view/videos?category=${category}`,
  
    });
    video = response.data.videos;
    // if(video.length == 0) 
    
    
    }
    await loadIds(category);
    onYouTubeIframeAPIReady(videoId);
} catch (error) {
  swal('No videos', '0 videos available change category','error');
  
}  

}
if(btnLoad){

  btnLoad.addEventListener('click', async () => {
  await mainLoader();
  });

  }
        
  if(btnNext) {    
    btnNext.addEventListener('click',changeVideo);
  }    
  
  if(btnClaim){
    btnClaim.addEventListener('click', async () => {
      const cored = await calcCounts();
      
      if(cored == true){
       updatePoints();
       changeVideo();
  
        
        swal('Points Added Successfully', '+5 points added, Press next', 'success');
      } else {
        
        swal('Time not Fullfilled', 'Watch video till the counter END', 'error');
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
  try {
    let counter = await player.getCurrentTime();
    counter = Math.floor(counter);
    
    badgeCounter.textContent = `${counter}/${video[x].time}`;
    if(counter >= video[x].time){
      if(counter == video[x].time) swal('Watched Successfully', 'Press Claim to add points', 'success');
      
      return true;
    } else{
      return false;
    }   
  } catch (error) {
    
    swal('Undefined', 'invalid player', "error");
  }
  
    

  
  
  
}

if(uploadVideo){
  uploadVideo.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submittedVideoIds= document.getElementById('url').value;
    const time = document.getElementById('watchtime').value;
    const noOfViews= document.getElementById('number').value;
    const categories= document.getElementById('categories').value;
    try {
      const res = await axios({
        method:'PATCH',
        url: '/api/v1/user/upload-video',
        data:{
          submittedVideoIds,
          time,
          noOfViews,
          category: categories
        }
      });
      if (res.data.status === 'success') {
        swal('Uploaded', 'video details uploaded successfully!', 'success');
        window.setTimeout(() => {
          location.assign('/dashboard');
        }, 1500);
      }
      
    } catch (error) {
      swal(`${error.response.data.status}`, `${error.response.data.message}`, "error");
      
    }
  })

} 

if(categoryMenu){
  categoryMenu.addEventListener('click', async (e) => {
    let category = e.target.closest('.dropdown-item').dataset.category;
    // let catergoryObject = {
    //   category: category
    // }
    
    await mainLoader(category);
    
    
})

}