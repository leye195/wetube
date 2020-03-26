const ul = document.querySelector(".user-content__container"),
  homeSection = document.querySelector(".home__section"),
  videoSection = document.querySelector(".video__section"),
  channelSection = document.querySelector(".channel__section"),
  infoSection = document.querySelector(".info__section");

const handleHeaderClick = e => {
  const { target } = e,
    li = ul.querySelectorAll("li");
  if (
    target.classList.contains("li-home") &&
    !target.classList.contains("cur")
  ) {
    li.forEach(item => {
      if (!item.classList.contains("li-home")) item.classList.remove("cur");
    });
    homeSection.style.display = "block";
    videoSection.style.display = "none";
    channelSection.style.display = "none";
    infoSection.style.display = "none";
  } else if (
    target.classList.contains("li-video") &&
    !target.classList.contains("cur")
  ) {
    li.forEach(item => {
      if (!item.classList.contains("li-video")) item.classList.remove("cur");
    });
    videoSection.style.display = "block";
    homeSection.style.display = "none";
    channelSection.style.display = "none";
    infoSection.style.display = "none";
  } else if (
    target.classList.contains("li-channel") &&
    !target.classList.contains("cur")
  ) {
    li.forEach(item => {
      if (!item.classList.contains("li-channel")) item.classList.remove("cur");
    });
    channelSection.style.display = "block";
    videoSection.style.display = "none";
    homeSection.style.display = "none";
    infoSection.style.display = "none";
  } else if (
    target.classList.contains("li-info") &&
    !target.classList.contains("cur")
  ) {
    li.forEach(item => {
      if (!item.classList.contains("li-info")) item.classList.remove("cur");
    });
    infoSection.style.display = "block";
    videoSection.style.display = "none";
    homeSection.style.display = "none";
    channelSection.style.display = "none";
  }
  target.classList.add("cur");
};
const init = () => {
  ul.addEventListener("click", handleHeaderClick);
};
if (ul) {
  init();
}
