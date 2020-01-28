import axios from "axios";
const addForm = document.querySelector(".add__comment");
const handleSubmit = e => {
  e.preventDefault();
  const input = document.querySelector(".leavecomment");
  const comment = input.value;
  sendComment(comment);
  input.value = "";
};
const sendComment = async comment => {
  //console.log(comment);
  const vid = document.location.href.split("/videos/")[1];
  //axios.post(`api/${vid}/comment`,{comment});
  const response = await axios({
    url: `/api/${vid}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    createCommentTag(comment);
  }
};
const createCommentTag = comment => {
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

  author__img.innerHTML = "IMG";
  comment__author.appendChild(author__img);

  comment__header.innerHTML = "NAME";
  comment__comment.innerHTML = comment;
  comment__main.appendChild(comment__header);
  comment__main.appendChild(comment__comment);

  comment__body.appendChild(comment__author);
  comment__body.appendChild(comment__main);

  comments__container.prepend(comment__body);
};
const init = () => {
  addForm.addEventListener("submit", handleSubmit);
};
if (addForm) {
  init();
}
