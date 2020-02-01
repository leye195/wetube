import axios from "axios";
const infoSection = document.querySelector(".info__section");
const form = document.querySelector(".link__form");
const linkContainer = document.querySelector(".link__container");
const linkForm = document.querySelector(".link__form form");
const addLink = document.querySelector(".add__link");
const cancelLink = document.querySelector(".cancel__link");
const linkBtn = document.querySelector(".linkbtn");
const desBtn = document.querySelector(".description__btn");
const desCancel = document.querySelector(".description__cancel");
const desForm = document.querySelector(".des__form");
const des = document.querySelector(".description__container");
const confirmLink = document.querySelector(".confirm__link");
const handleLink = e => {
  form.classList.add("cur");
  linkBtn.classList.remove("cur");
};
const handleAddLink = e => {
  const div = document.createElement("div"),
    linkTitle = document.createElement("input"),
    linkURL = document.createElement("input"),
    deleteBtn = document.createElement("button"),
    iconTrash = document.createElement("i");

  div.className = "link__input";
  linkTitle.type = "text";
  linkTitle.name = "title";
  linkTitle.placeholder = "link title";
  linkTitle.required = true;

  linkURL.type = "text";
  linkURL.name = "url";
  linkURL.placeholder = "URL";
  linkURL.required = true;

  deleteBtn.className = "delete_form";
  iconTrash.className = "fas fa-trash-alt";

  deleteBtn.addEventListener("click", handleDeleteLink);

  deleteBtn.appendChild(iconTrash);
  div.appendChild(linkTitle);
  div.appendChild(linkURL);
  div.appendChild(deleteBtn);
  linkForm.insertBefore(div, confirmLink);
};
const handleDeleteLink = e => {
  e.preventDefault();
  const { target } = e;
  let parentNode;
  if (!target.classList.contains("delete_form"))
    parentNode = target.parentNode.parentNode;
  else parentNode = target.parentNode;
  linkForm.removeChild(parentNode);
};
const handleCancel = e => {
  cancelLinkForm(); //hide link form
};
const cancelLinkForm = () => {
  while (linkForm.firstChild) {
    if (linkForm.childNodes.length <= 1) break;
    linkForm.removeChild(linkForm.firstChild);
  }
  linkBtn.classList.add("cur");
  form.classList.remove("cur");
};

const handleAddDes = e => {
  desForm.classList.add("cur");
  desBtn.classList.remove("cur");
};
const handleCancelDes = e => {
  e.preventDefault();
  desForm.classList.remove("cur");
  desBtn.classList.add("cur");
};
const handleSubmitDescription = async e => {
  e.preventDefault();
  const textArea = desForm.querySelector("textarea");
  if (textArea) {
    const val = textArea.value;
    const response = await axios({
      url: "/api/description",
      method: "POST",
      data: {
        description: val
      }
    });
    if (response.status === 200) {
      des.innerHTML = response.data.description;
      textArea.value = "";
    }
  }
};
const handleSubmitLink = async e => {
  e.preventDefault();
  const { target } = e;
  const inputs = target.getElementsByTagName("input");
  let info = [];
  for (let i = 0; i < inputs.length - 1; i += 2) {
    info.push({ link: inputs[i].value, url: inputs[i + 1].value });
  }
  const response = await axios({
    url: "/api/link",
    method: "POST",
    data: {
      links: info
    }
  });
  if (response.status === 200) {
    for (const link of info) {
      createLinkBlock(link);
    }
    cancelLinkForm();
  }
};
const createLinkBlock = info => {
  const linkBlock = document.createElement("div"),
    a_link = document.createElement("a"),
    p = document.createElement("p");
  linkBlock.className = "linkBlock";
  a_link.href = info.url;
  p.innerText = info.link;

  a_link.appendChild(p);
  linkBlock.appendChild(a_link);
  linkContainer.appendChild(linkBlock);
};
const init = () => {
  if (addLink) addLink.addEventListener("click", handleAddLink);
  if (linkBtn) linkBtn.addEventListener("click", handleLink);
  if (cancelLink) cancelLink.addEventListener("click", handleCancel);
  if (desBtn) desBtn.addEventListener("click", handleAddDes);
  if (desCancel) desCancel.addEventListener("click", handleCancelDes);
  if (desForm) desForm.addEventListener("submit", handleSubmitDescription);
  if (linkForm) linkForm.addEventListener("submit", handleSubmitLink);
};
if (infoSection) {
  init();
}
