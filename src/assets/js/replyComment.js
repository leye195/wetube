import axios from "axios";
import moment from "moment";
(() => {
  const replyBtns = document.querySelectorAll(".comment__reply");
  const replyCancel = document.querySelectorAll(".reply__cancel");
  const replySubmit = document.querySelectorAll(".reply__submit");
  const replyCnt = document.querySelectorAll(".reply__cnt");
  const findParent = (target, className) => {
    let tmp = target;
    while (!tmp.classList.contains(className)) {
      tmp = tmp.parentNode;
    }
    return tmp;
  };
  const toggleReply = e => {
    const { currentTarget } = e;
    let tmp = findParent(currentTarget, "comment__body").nextSibling;
    if (tmp.style.display === "none") tmp.style.display = "flex";
    else tmp.style.display = "none";
  };
  const closeReply = e => {
    const { target } = e;
    let tmp = findParent(target, "comment__reply__form");
    tmp.style.display = "none";
  };
  const submitReply = async e => {
    const { target } = e;
    let cid = findParent(target, "comment__wrapper").id;
    let text = findParent(target, "btn__container").previousSibling;
    const response = await axios.post(
      `/api/comment/${cid}/reply`,
      {
        content: text.value
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      text.value = "";
    }
  };
  const getReplies = async e => {
    const {
      target: { nextSibling }
    } = e;
    if (
      nextSibling.classList.contains("hidden") &&
      e.target.innerText !== "0 Replies"
    ) {
      if (nextSibling.childElementCount <= 0) {
        let cid = findParent(e.target, "comment__wrapper").id;
        const response = await axios.get(`/api/comment/${cid}/reply`);
        if (response.status === 200) showReplyList(response.data, nextSibling);
      }
      nextSibling.classList.remove("hidden");
    } else {
      nextSibling.classList.add("hidden");
    }
  };
  const showReplyList = (data, target) => {
    const ul = target;
    data.map(v => {
      const li = document.createElement("li"),
        replyAuthor = document.createElement("div"),
        replyMain = document.createElement("div"),
        img = document.createElement("img"),
        replyHeader = document.createElement("p"),
        replyContent = document.createElement("p"),
        replyTimeWrapper = document.createElement("div"),
        replyCreated = document.createElement("p");

      li.className = "reply__body";
      replyAuthor.className = "reply__author";
      replyMain.className = "reply__main";
      replyHeader.className = "reply__header";
      replyContent.className = "reply__content";
      replyTimeWrapper.className = "reply__time__wrapper";
      replyCreated.className = "reply__created";

      img.src = v.creator.avatarUrl;
      replyHeader.innerText = v.creator.name;
      replyContent.innerText = v.text;
      replyCreated.innerText = moment(v.createdAt).format(
        "YYYY/MM/DD HH:MM:SS"
      );
      replyAuthor.appendChild(img);
      replyTimeWrapper.appendChild(replyCreated);

      replyMain.appendChild(replyHeader);
      replyMain.appendChild(replyContent);
      replyMain.appendChild(replyTimeWrapper);

      li.appendChild(replyAuthor);
      li.appendChild(replyMain);
      ul.appendChild(li);
    });
  };
  const init = () => {
    [].forEach.call(replyBtns, v => {
      v.addEventListener("click", toggleReply);
    });
    [].forEach.call(replyCancel, v => {
      v.addEventListener("click", closeReply);
    });
    [].forEach.call(replySubmit, v => {
      v.addEventListener("click", submitReply);
    });
    [].forEach.call(replyCnt, v => {
      v.addEventListener("click", getReplies);
    });
  };
  init();
})();
