/* eslint-disable */    
var counter = 0;
var playit = false;
var watchingFinished = false;
var timeoutHandle;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '410',
		width: '500',
		videoId: '7130CjCbjlE',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	$("#playToggleButton").html('<br /><a onclick="startVideo()" href="#">Start Video</a>');
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1).
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		if (!playit) {
			if (!watchingFinished) {
				playit = true;
				ytCounter();
			}
		}
		$("#playToggleButton").html('<br /><a onclick="pauseVideo()" href="#">Pause Video</a>');
	}
	if (event.data != YT.PlayerState.PLAYING) {
		playit = false;
		if(YT.PlayerState.PAUSED) {
			remCounter()
			$("#playToggleButton").html('<br /><a onclick="startVideo()" href="#">Resume Video</a>');
		}
	}
}

$(document).ready(function() {
	playlink();
	$(window).
		bind('blur', function(ev){
			if (!watchingFinished) player.pauseVideo();
		});
});

function addCounter() {
	if (playit) {
		counter += 1;
	}
}

function remCounter() {
	if (counter>0) {
		counter = counter - 1;
	}
}

function ytCounter() {
	if (watchingFinished) return;
	if (counter >= 61 && playit) {
		watchingFinished = true;
		playit = false;
		prepareCaptcha();
	} else if (playit) {
		timeoutCounter = setTimeout(addCounter,1000);
		roundedPlayed = Math.ceil(counter);
		document.getElementById("counter").innerHTML = roundedPlayed;
		clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(ytCounter,1000);
	}
}

function startVideo() {
	player.playVideo();
}

function pauseVideo() {
	player.pauseVideo();
	remCounter()
}

function prepareCaptcha () {
	window.addEventListener("message", function(event) {
		if (event.data>0) {
			$("#11").html('You have earned 11 credits!');
			$("#cpcdiv").html('');
			$("#cpcdiv").hide();
			parent.window.opener.postMessage('+11;' + event.data, "*");
		} else if (event.data==-1) {
			$("#11").html('<br /><br />You have clicked on the wrong image pair.<br />To successfully complete the challenge, please click on the repeated (mirrored) image.');
			$("#cpcdiv").html('');
			$("#cpcdiv").hide();
		} else if (event.data==0) {
			$("#11").html('<br /><br />An error occurred, please try again.');
			$("#cpcdiv").html('');
			$("#cpcdiv").hide();
		}  else if (event.data==-2) {
			$("#11").html('<br /><br />This video has already been watched from your public IP address. Please try again tomorrow. Thank you.');
			$("#cpcdiv").html('');
			$("#cpcdiv").hide();
		}
	});
	$("#10").html('');
	$("#11").html('');
	$("#cpcdiv").html("<p class='bold f-size-13'>To successfully complete the challenge, please click on the repeated (mirrored) image.</p><iframe class='height-150 width-100p' src='https://www.like4like.org/user/captcha-page-yt.php?user_id=E000l300j470b940C840j730C1010081&idz=317&ctrl=d557ff88d7e9d98acc97be2ea7189e50&trackerparam=uequa1am4ouqi8hckd6qb7jbb4'></iframe>");
	$("#cpcdiv").show();
}

function playlink() {
	var response = '317';
	var userid = 'E000l300j470b940C840j730C1010081';
	var ctrl = 'd557ff88d7e9d98acc97be2ea7189e50';
	var dataString = "idzadatka=" + response + "&idclana=" + userid + "&ctrl=" + ctrl;;			
	$.ajax({
		type: "POST",
		url: "playlink-ytv_add.php",
		data: dataString,
		beforeSend: function(x) {
			if(x && x.overrideMimeType) {
				x.overrideMimeType("application/json;charset=UTF-8");
			}
		},
		dataType: "json",
		error: function (request, status, error) {},
		success:function(response) {}
	});
}

	