(() => {
  const mobile = document.querySelector(".mobile"),
    headerUl = document.querySelector(".header__ul");
  const handleToggle = () => {
    if (!headerUl.classList.contains("show")) headerUl.classList.add("show");
    else headerUl.classList.remove("show");
  };
  const init = () => {
    if (mobile) {
      mobile.addEventListener("click", handleToggle);
    }
  };
  init();
})();
