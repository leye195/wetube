import axios from "axios";
import getBlobDuration from "get-blob-duration";

const videoContainer = document.querySelector("#js__player"),
  videoPlayer = document.querySelector("#js__player video"),
  playBtn = document.querySelector(".videoPlayer__column .fa-play"),
  muteBtn = document.querySelector(".videoPlayer__column .fa-volume-down"),
  fullBtn = document.querySelector(".videoPlayer__column .fa-expand"),
  currentTime = document.querySelector("#currentTime"),
  totalTime = document.querySelector("#totalTime"),
  volumeContainer = document.querySelector(".videoPlayer__volume"),
  volumeRange = document.querySelector("#videoPlayer__volume"),
  videoLike = document.querySelector(".video__up"),
  videoUnLike = document.querySelector(".video__down");
let time_id = undefined,
  cur_volume = 0.5,
  vol_status = "fa-volume-down";

const registerView = () => {
  const vid = window.location.href.split("/videos/")[1]; //pathname.slice(5,).split("/")[0];
  fetch(`/api/${vid}/view`, {
    method: "post"
  });
};
const handlePlay = () => {
  //console.log(videoPlayer.currentTime);
  if (playBtn.classList.contains("fa-play")) {
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    videoPlayer.play();
  } else if (playBtn.classList.contains("fa-pause")) {
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    videoPlayer.pause();
    clearInterval(time_id);
  }
};
const handleMute = () => {
  if (!videoPlayer.muted) {
    videoPlayer.muted = true;
    muteBtn.classList.remove(vol_status);
    muteBtn.classList.add("fa-volume-mute");
    cur_volume = volumeRange.value;
    volumeRange.value = 0;
  } else {
    videoPlayer.muted = false;
    muteBtn.classList.remove("fa-volume-mute");
    muteBtn.classList.add(vol_status);
    volumeRange.value = cur_volume;
  }
};
const handleFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.msRequestFullScreen) {
    videoContainer.msRequestFullScreen();
  } else if (videoContainer.webkitRequestFullScreen) {
    videoContainer.webkitRequestFullScreen();
  }
  fullBtn.classList.add("fa-compress-arrows-alt");
  fullBtn.classList.remove("fa-expand");
  fullBtn.removeEventListener("click", handleFullScreen);
  fullBtn.addEventListener("click", handleExitFullScreen);
};
const handelScreenClick = () => {};
const handleExitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullScreen) {
    document.webkitExitFullScreen();
  } else if (document.msExitFullScreen) {
    document.msExitFullScreen();
  }
  fullBtn.classList.remove("fa-compress-arrows-alt");
  fullBtn.classList.add("fa-expand");
  fullBtn.removeEventListener("click", handleExitFullScreen);
  fullBtn.addEventListener("click", handleFullScreen);
};
const formatTime = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};
const setTotalTime = async () => {
  const blob = await fetch(videoPlayer.src).then(response => response.blob());
  const duration = await getBlobDuration(blob);
  //console.log(duration + " seconds");
  const total = formatTime(duration);
  totalTime.innerHTML = total;
  time_id = setInterval(getCurrentTime, 1000);
};
const getCurrentTime = () => {
  const time = formatTime(Math.floor(videoPlayer.currentTime));
  currentTime.innerHTML = time;
};
const resetVideo = () => {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
};
const handleDrag = e => {
  console.log(e.target.value);
  videoPlayer.volume = e.target.value;
  if (videoPlayer.volume === 0) {
    muteBtn.classList.add("fa-volume-mute");
    muteBtn.classList.remove("fa-volume-up");
    muteBtn.classList.remove("fa-volume-down");
    vol_status = "fa-volume-mute";
  } else if (videoPlayer.volume > 0 && videoPlayer.volume <= 0.6) {
    muteBtn.classList.add("fa-volume-down");
    muteBtn.classList.remove("fa-volume-up");
    muteBtn.classList.remove("fa-volume-mute");
    vol_status = "fa-volume-down";
  } else {
    muteBtn.classList.add("fa-volume-up");
    muteBtn.classList.remove("fa-volume-mute");
    muteBtn.classList.remove("fa-volume-down");
    vol_status = "fa-volume-up";
  }
};

const handleMouseOver = e => {
  volumeRange.style.opacity = 1.0;
};
const handleMouseLeave = e => {
  volumeRange.style.opacity = 0.0;
};
const handleLike = async e => {
  const id = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${id}/like`,
    method: "POST"
  });
  if (response.status === 200) {
    const {
      data: { like, unlike }
    } = response;
    document.querySelector(".like__count").innerHTML = like.length;
    document.querySelector(".unlike__count").innerHTML = unlike.length;
    window.location.reload();
  }
};
const handleUnlike = async e => {
  const id = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${id}/unlike`,
    method: "POST"
  });
  if (response.status === 200) {
    const {
      data: { unlike, like }
    } = response;
    document.querySelector(".like__count").innerHTML = like.length;
    document.querySelector(".unlike__count").innerHTML = unlike.length;
    window.location.reload();
  }
};
const init = () => {
  videoPlayer.volume = cur_volume;
  playBtn.addEventListener("click", handlePlay);
  muteBtn.addEventListener("click", handleMute);
  fullBtn.addEventListener("click", handleFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", resetVideo); //reset video
  volumeRange.addEventListener("input", handleDrag);
  volumeContainer.addEventListener("mouseover", handleMouseOver);
  volumeContainer.addEventListener("mouseleave", handleMouseLeave);
  videoLike.addEventListener("click", handleLike);
  videoUnLike.addEventListener("click", handleUnlike);
};

if (videoContainer) {
  init();
}
