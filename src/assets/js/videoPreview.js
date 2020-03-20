(() => {
  const home = document.querySelector(".home");
  let video = null;
  const hoverVideo = e => {
    const { target } = e;
    if (target.classList.contains("videoBlock__thumbnail")) {
      video = target;
      video.muted = true;
      if (video.readyState >= 2) {
        video.play();
        video.addEventListener("mouseleave", leaveVideo);
      }
    }
  };
  const leaveVideo = e => {
    if (video) {
      video.currentTime = 0;
      video.pause();
      video = null;
    }
  };
  const init = () => {
    if (home) {
      home.addEventListener("mouseover", hoverVideo);
    }
  };
  init();
})();
