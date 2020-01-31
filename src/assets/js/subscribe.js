import axios from "axios";
let user_id = document.querySelector(".video__author a");
const subscribe_btn = document.querySelector(".sbtn");
const handleSubscribe = async e => {
  let uid = "";
  if (user_id !== null) {
    uid = user_id.href.split("/users/")[1];
  } else {
    user_id = document.querySelector(".channelBlock a");
    if (user_id === null) uid = window.location.href.split("/users/")[1];
    else uid = user_id.id;
  }
  const response = await axios({
    url: `/api/${uid}/subscribe`,
    method: "POST",
    data: {
      uid
    }
  });
  if (response.status === 200) {
    if (response.data.subscribe === 1) {
      subscribe_btn.className = "sbtn subscribed";
    } else if (response.data.subscribe === 0) {
      subscribe_btn.className = "sbtn subscribe";
    }
  }
};
const init = () => {
  subscribe_btn.addEventListener("click", handleSubscribe);
};
if (subscribe_btn) {
  init();
}
