import axios from "axios";
//let user_id = document.querySelector(".video__author a");
const subscribe_btn = document.querySelectorAll(".sbtn");
const handleSubscribe = async e => {
  const {
    target: { dataset }
  } = e;
  if (dataset.id) {
    const response = await axios({
      url: `/api/${dataset.id}/subscribe`,
      method: "POST",
      data: {
        uid: dataset.id
      }
    });
    if (response.status === 200) {
      if (response.data.subscribe === 1) {
        e.target.className = "sbtn subscribed";
      } else if (response.data.subscribe === 0) {
        e.target.className = "sbtn subscribe";
      }
    }
  }
  /*let uid = "";
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
  }*/
};
const init = () => {
  [].forEach.call(subscribe_btn, v => {
    v.addEventListener("click", handleSubscribe);
  });
};
if (subscribe_btn) {
  init();
}
