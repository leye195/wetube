const sectionContainer = document.querySelector(".user-profile__section"),
  section1 = document.querySelector(".user-profile__sectionbtn"),
  section2 = document.querySelector(".user-profile__form"),
  add = document.querySelector(".user-profile__sectionbtn button"),
  cancel = document.querySelector(".formbtn__container button");

const handleSeciontAdd = e => {
  section1.style.display = "none";
  section2.style.display = "block";
};
const handleSectionCancel = e => {
  e.preventDefault();
  section1.style.display = "block";
  section2.style.display = "none";
};
const init = () => {
  add.addEventListener("click", handleSeciontAdd);
  cancel.addEventListener("click", handleSectionCancel);
};
if (sectionContainer) {
  init();
}
