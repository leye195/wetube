(() => {
  const userProfileBanner = document.querySelector(".user-profile__banner"),
    bannerContainer = document.querySelector(".banner-upload__container"),
    addBannerBtn = document.querySelector(".banner__btn"),
    bannerExit = document.querySelector(".banner-upload__exit"),
    upload = document.querySelector(".banner-upload__upload"),
    file = document.querySelector(".banner-upload__zone p");
  const maxSize = 6540032;
  let info;
  const handleBannerBtn = e => {
    bannerContainer.style.display = "flex";
  };
  const handleExit = e => {
    bannerContainer.style.display = "none";
  };
  const handleUpload = e => {
    const {
      target: { files }
    } = e;
    info = files[0];
    if (info.size <= maxSize) {
      file.innerHTML = info.name;
    } else {
      alert("Photo Size is more than 6MB");
    }
  };
  const handleOver = e => {
    addBannerBtn.classList.add("btn__show");
    addBannerBtn.classList.remove("btn__hide");
  };
  const handleLeave = e => {
    addBannerBtn.classList.add("btn__hide");
    addBannerBtn.classList.remove("btn__show");
  };
  const init = () => {
    bannerContainer.style.display = "none";
    if (addBannerBtn) {
      userProfileBanner.addEventListener("mouseenter", handleOver);
      userProfileBanner.addEventListener("mouseleave", handleLeave);
      addBannerBtn.addEventListener("click", handleBannerBtn);
      bannerExit.addEventListener("click", handleExit);
      upload.addEventListener("change", handleUpload);
    }
  };
  if (userProfileBanner) {
    init();
  }
})();
