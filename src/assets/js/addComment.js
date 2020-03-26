import axios from "axios";
import moment from "moment";
(() => {
  const commentsContainer = document.querySelector(".comments__container");
  const addForm = document.querySelector(".add__comment");
  const commentNumber = document.querySelector(".video__comment-number");
  const deleteBtn = document.querySelectorAll(".comment__delete i");
  const likeBtn = document.querySelectorAll(".comment__like i");
  const unlikeBtn = document.querySelectorAll(".comment__unlike i");

  const handleSubmit = e => {
    e.preventDefault();
    const input = document.querySelector(".leavecomment");
    const comment = input.value;
    sendComment(comment);
    input.value = "";
  };
  const sendComment = async comment => {
    const vid = document.location.href.split("/videos/")[1];
    const response = await axios({
      url: `/api/${vid}/comment`,
      method: "POST",
      data: {
        comment
      }
    });
    if (response.status === 200) {
      const {
        creator: { _id: uid, name, avatarUrl },
        _id
      } = response.data;
      addCommentTag(_id, comment, name, avatarUrl, uid);
    }
  };
  const getCid = target => {
    let tmp = target;
    while (!tmp.classList.contains("comment__btn__container")) {
      tmp = tmp.parentNode;
    }
    return tmp;
  };
  const postLike = async target => {
    const container = getCid(target);
    const response = await axios.post(
      `/api/comment/${container.dataset.id}/like`,
      {},
      { withCredentials: true }
    );
    if (response.status === 200) {
      container.querySelector(".comment__like__cnt").innerText =
        response.data.like.length;
      container.querySelector(".comment__unlike__cnt").innerText =
        response.data.unlike.length;
    }
  };
  const postUnlike = async target => {
    const container = getCid(target);
    const response = await axios.post(
      `/api/comment/${container.dataset.id}/unlike`,
      {},
      { withCredentials: true }
    );
    if (response.status === 200) {
      container.querySelector(".comment__like__cnt").innerText =
        response.data.like.length;
      container.querySelector(".comment__unlike__cnt").innerText =
        response.data.unlike.length;
    }
  };
  const handleLike = e => {
    const { target } = e;
    postLike(target);
  };
  const handleUnlike = e => {
    const { target } = e;
    postUnlike(target);
  };
  const addCommentTag = (
    _id,
    comment,
    name,
    avatarUrl = "/static/defautAvatar.png",
    uid
  ) => {
    const comments__container = document.querySelector(".comments__container"),
      comment__wrapper = document.createElement("div"),
      time__wrapper = document.createElement("div"),
      btn__container = document.createElement("div"),
      comment__body = document.createElement("div"),
      comment__author = document.createElement("div"),
      comment__main = document.createElement("div"),
      comment__header = document.createElement("p"),
      comment__comment = document.createElement("p"),
      comment__created = document.createElement("p"),
      author__img = document.createElement("img"),
      replyBtn = document.createElement("span"),
      reply_i = document.createElement("i"),
      deleteBtn = document.createElement("span"),
      delete_i = document.createElement("i"),
      likeBtn = document.createElement("span"),
      like_i = document.createElement("i"),
      unlikeBtn = document.createElement("span"),
      unlike_i = document.createElement("i"),
      like_cnt = document.createElement("span"),
      unlike_cnt = document.createElement("span"),
      author__link = document.createElement("a"),
      name__link = document.createElement("a");

    comment__wrapper.className = "comment__wrapper";
    time__wrapper.className = "comment__time__wrapper";
    btn__container.className = "comment__btn__container";
    btn__container.dataset.id = `${_id}`;
    author__link.href = `/users/${uid}`;
    name__link.href = `/users/${uid}`;
    comment__wrapper.id = `${_id}`;
    comment__body.className = "comment__body";
    comment__author.className = "comment__author";
    comment__main.className = "comment__main";
    comment__header.className = "comment__header";
    comment__comment.className = "comment__content";
    comment__created.className = "comment__created";
    replyBtn.className = "comment__reply";
    deleteBtn.className = "comment__delete";
    reply_i.className = "fas fa-reply";
    delete_i.className = "fas fa-trash-alt";
    likeBtn.className = "comment__like";
    like_i.className = "fa fa-thumbs-up";
    unlikeBtn.className = "comment__unlike";
    unlike_i.className = "fa fa-thumbs-down";
    like_cnt.className = "comment__like__cnt";
    unlike_cnt.className = "comment__unlike__cnt";

    delete_i.addEventListener("click", handleDelete);
    like_i.addEventListener("click", handleLike);
    unlike_i.addEventListener("click", handleUnlike);
    author__img.src = avatarUrl;
    author__link.appendChild(author__img);
    comment__author.appendChild(author__link);

    comment__header.innerHTML = name;
    comment__comment.innerHTML = comment;
    comment__created.innerHTML = moment().format("YYYY/MM/DD HH:MM:SS");
    like_cnt.innerText = 0;
    unlike_cnt.innerText = 0;

    replyBtn.appendChild(reply_i);
    deleteBtn.appendChild(delete_i);
    likeBtn.appendChild(like_i);
    likeBtn.appendChild(like_cnt);
    unlikeBtn.appendChild(unlike_i);
    unlikeBtn.appendChild(unlike_cnt);

    btn__container.appendChild(likeBtn);
    btn__container.appendChild(unlikeBtn);

    time__wrapper.appendChild(comment__created);
    time__wrapper.appendChild(btn__container);

    name__link.appendChild(comment__header);

    comment__main.appendChild(comment__header);
    comment__main.appendChild(name__link);
    comment__main.appendChild(time__wrapper);
    comment__main.appendChild(replyBtn);
    comment__main.appendChild(deleteBtn);

    comment__body.appendChild(comment__author);
    comment__body.appendChild(comment__main);

    comment__wrapper.appendChild(comment__body);

    comments__container.prepend(comment__wrapper);
    increaseNumber();
  };
  const increaseNumber = () => {
    let number = parseInt(commentNumber.textContent) + 1;
    if (number == 1) {
      commentNumber.textContent = `1 comment`;
    } else {
      commentNumber.textContent = `${number} comments`;
    }
    window.location.reload();
  };
  const handleDelete = e => {
    const { target } = e;
    let body = target;
    while (!body.classList.contains("comment__wrapper")) {
      body = body.parentNode;
    }
    deleteComment(body);
  };
  const deleteComment = async body => {
    const vid = window.location.href.split("/videos/")[1];
    const response = await axios({
      url: `/api/${vid}/comment/${body.id}`,
      method: "POST"
    });
    if (response.status === 200) {
      commentsContainer.removeChild(body);
      decreaseNumber();
    }
  };
  const decreaseNumber = () => {
    let number = parseInt(commentNumber.textContent) - 1;
    if (number == 1) {
      commentNumber.textContent = `1 comment`;
    } else {
      commentNumber.textContent = `${number} comments`;
    }
  };

  const init = () => {
    addForm.addEventListener("submit", handleSubmit);
    [].forEach.call(deleteBtn, d => {
      d.addEventListener("click", handleDelete);
    });
    [].forEach.call(likeBtn, like => {
      like.addEventListener("click", handleLike);
    });
    [].forEach.call(unlikeBtn, unlike => {
      unlike.addEventListener("click", handleUnlike);
    });
  };
  if (addForm) {
    init();
  }
})();
