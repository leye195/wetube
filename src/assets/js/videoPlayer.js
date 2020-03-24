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
  videoUnLike = document.querySelector(".video__down"),
  progressBar = document.querySelector("#process-bar");
let time_id = undefined,
  cur_volume = 0.5,
  vol_status = "fa-volume-down",
  percentage = 0,
  duration = 0.0;

const registerView = () => {
  const vid = window.location.href.split("/videos/")[1]; //pathname.slice(5,).split("/")[0];
  fetch(`/api/${vid}/view`, {
    method: "post"
  });
};
const handlePlay = () => {
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
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};
const setTotalTime = e => {
  /*const blob = await axios({
    url: videoPlayer.src,
    method: "get",
    responseType: "blob"
  });*/
  //const blob = await fetch(videoPlayer.src).then(response => response.blob());
  //duration = await getBlobDuration(blob);
  // console.log(duration + " seconds");
  if (e.target.readyState >= 2) {
    const total = formatTime(e.target.duration);
    //console.log(total);
    totalTime.innerHTML = total;
    time_id = setInterval(getCurrentTime, 700);
  }
};
const getCurrentTime = () => {
  const time = formatTime(Math.floor(videoPlayer.currentTime));
  currentTime.innerHTML = time;
};
const resetVideo = () => {
  registerView();
  videoPlayer.currentTime = 0;
  progressBar.value = 0;
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
};
const handleDrag = e => {
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
const isClicked = (cnt, thumb) => {
  return (
    cnt.classList.contains("clicked") && thumb.classList.contains("clicked")
  );
};
const checkUser = (className, target) => {
  if (
    target.classList.contains(className) &&
    target.querySelector(".unlogged") === null
  )
    return true;
  if (
    !target.classList.contains(className) &&
    !target.classList.contains(".unlogged")
  )
    return true;
  return false;
};
const handleLike = async e => {
  const id = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${id}/like`,
    method: "POST"
  });
  if (checkUser("video__up", e.target)) {
    if (response.status === 200) {
      const {
        data: { like, unlike }
      } = response;
      const likeCnt = document.querySelector(".like__count"),
        unlikeCnt = document.querySelector(".unlike__count"),
        thumbUp = document.querySelector(".fa-thumbs-up"),
        thumbDown = document.querySelector(".fa-thumbs-down");

      if (isClicked(likeCnt, thumbUp)) {
        likeCnt.classList.remove("clicked");
        thumbUp.classList.remove("clicked");
      } else {
        likeCnt.classList.add("clicked");
        thumbUp.classList.add("clicked");
        unlikeCnt.classList.remove("clicked");
        thumbDown.classList.remove("clicked");
      }
      likeCnt.innerHTML = like.length;
      unlikeCnt.innerHTML = unlike.length;
    }
  } else {
    alert("Please Login");
  }
};
const handleUnlike = async e => {
  const id = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${id}/unlike`,
    method: "POST"
  });
  if (checkUser("video__down", e.target)) {
    if (response.status === 200) {
      const {
        data: { unlike, like }
      } = response;
      const likeCnt = document.querySelector(".like__count"),
        unlikeCnt = document.querySelector(".unlike__count"),
        thumbUp = document.querySelector(".fa-thumbs-up"),
        thumbDown = document.querySelector(".fa-thumbs-down");
      if (isClicked(unlikeCnt, thumbDown)) {
        unlikeCnt.classList.remove("clicked");
        thumbDown.classList.remove("clicked");
      } else {
        likeCnt.classList.remove("clicked");
        thumbUp.classList.remove("clicked");
        unlikeCnt.classList.add("clicked");
        thumbDown.classList.add("clicked");
      }
      likeCnt.innerHTML = like.length;
      unlikeCnt.innerHTML = unlike.length;
    }
  } else {
    alert("Please Login");
  }
};

//update progress bar on video
const updateProgressBar = () => {
  percentage = Math.floor(
    (100 / videoPlayer.duration) * videoPlayer.currentTime
  );
  progressBar.value = percentage;
};
const clickedBar = e => {
  let mouseX = (e.offsetX - progressBar.offsetLeft) / progressBar.offsetWidth;
  progressBar.value = mouseX * 100; //current position on progress bar
  videoPlayer.currentTime = (progressBar.value * videoPlayer.duration) / 100; //set newTime to watch
};
const init = () => {
  videoPlayer.volume = cur_volume;

  playBtn.addEventListener("click", handlePlay);
  muteBtn.addEventListener("click", handleMute);
  fullBtn.addEventListener("click", handleFullScreen);

  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  //videoPlayer.addEventListener("loadeddata", setTotalTime);
  videoPlayer.addEventListener("canplay", setTotalTime);
  videoPlayer.addEventListener("ended", resetVideo); //reset video
  videoPlayer.addEventListener("timeupdate", updateProgressBar); //update progress bar event
  progressBar.addEventListener("click", clickedBar); //click progress bar

  volumeRange.addEventListener("input", handleDrag);
  volumeContainer.addEventListener("mouseover", handleMouseOver);
  volumeContainer.addEventListener("mouseleave", handleMouseLeave);
  videoLike.addEventListener("click", handleLike);
  videoUnLike.addEventListener("click", handleUnlike);
  if (videoPlayer.readyState >= 2) {
    console.log("ready");
    totalTime.innerHTML = formatTime(videoPlayer.duration);
  }
};

if (videoContainer) {
  init();
}
