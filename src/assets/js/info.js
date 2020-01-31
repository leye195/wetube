const infoSection = document.querySelector(".info__section");
const linkForm = document.querySelector(".link__form form");
const addLink = document.querySelector(".add__link");
const deleteLink = document.querySelector(".delete__form");
const cancelLink = document.querySelector(".cancel__link");
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

  linkURL.type = "text";
  linkURL.name = "url";
  linkURL.placeholder = "URL";

  deleteBtn.className = "delete_form";
  iconTrash.className = "fas fa-trash-alt";

  deleteBtn.addEventListener("click", handleDeleteLink);

  deleteBtn.appendChild(iconTrash);
  div.appendChild(linkTitle);
  div.appendChild(linkURL);
  div.appendChild(deleteBtn);
  linkForm.appendChild(div);
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
const init = () => {
  addLink.addEventListener("click", handleAddLink);
};
if (infoSection) {
  init();
}
