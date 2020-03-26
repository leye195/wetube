import axios from "axios";
import routes from "../../routes";
(() => {
  const mobile = document.querySelector(".mobile"),
    headerUl = document.querySelector(".header__ul"),
    logoutBtn = document.querySelector(".logoutBtn");
  const handleLogout = async e => {
    const response = await axios.get(routes.logout);
    if (response.status === 200) {
      window.location.href = routes.home;
    }
  };
  const handleToggle = () => {
    if (!headerUl.classList.contains("show")) headerUl.classList.add("show");
    else headerUl.classList.remove("show");
  };
  const init = () => {
    if (mobile) {
      mobile.addEventListener("click", handleToggle);
    }
    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  };
  init();
})();
