import axios from "axios";
const commentsContainer = document.querySelector(".comments__container");
const addForm = document.querySelector(".add__comment");
const commentNumber = document.querySelector(".video__comment-number");
const deleteBtn = document.querySelectorAll(".comment__delete");
const handleSubmit = e => {
  e.preventDefault();
  const input = document.querySelector(".leavecomment");
  const comment = input.value;
  sendComment(comment);
  input.value = "";
};
const sendComment = async comment => {
  const vid = document.location.href.split("/videos/")[1];
  //axios.post(`api/${vid}/comment`,{comment});
  const response = await axios({
    url: `/api/${vid}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  console.log(response);
  if (response.status === 200) {
    const { name, avatarUrl } = response.data;
    addCommentTag(comment, name, avatarUrl);
  }
};
const addCommentTag = (
  comment,
  name,
  avatarUrl = "/static/defautAvatar.png"
) => {
  const comments__container = document.querySelector(".comments__container"),
    comment__body = document.createElement("div"),
    comment__author = document.createElement("div"),
    comment__main = document.createElement("div"),
    comment__header = document.createElement("p"),
    comment__comment = document.createElement("p"),
    author__img = document.createElement("img");

  comment__body.className = "comment__body";
  comment__author.className = "comment__author";
  comment__main.className = "comment__main";
  comment__header.className = "comment__header";
  comment__comment.className = "comment_comment";

  author__img.src = avatarUrl;
  comment__author.appendChild(author__img);

  comment__header.innerHTML = name;
  comment__comment.innerHTML = comment;
  comment__main.appendChild(comment__header);
  comment__main.appendChild(comment__comment);

  comment__body.appendChild(comment__author);
  comment__body.appendChild(comment__main);

  comments__container.prepend(comment__body);
  increaseNumber();
};
const increaseNumber = () => {
  let number = parseInt(commentNumber.textContent) + 1;
  if (number == 1) {
    commentNumber.textContent = `1 comment`;
  } else {
    commentNumber.textContent = `${number} comments`;
  }
};
const handleDelete = e => {
  const { target } = e;
  const body = target.parentNode.parentNode;
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
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", handleDelete);
  }
};
if (addForm) {
  init();
}
