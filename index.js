//Selectors
const textInput = document.querySelector(".text-input");
const addBtn = document.querySelector("#add-btn");
const listContainer = document.querySelector(".list-container");

//Events

addBtn.addEventListener("click", () => {
  if (textInput.value === "") {
    alert("Please enter a task");
    return;
  }

  createListEle(textInput.value);
  textInput.value = "";
});

//Functions
function createListEle(listInput) {
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");

  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";

  const lists = document.createElement("p");
  lists.textContent = listInput;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = listInput;
  editInput.classList.add("edit-input");

  const iconContainer = document.createElement("div");
  iconContainer.classList.add("icons-container");

  const pencilIcon = document.createElement("i");
  //   pencilIcon.classList.add("fa-solid", "fa-pencil");
  pencilIcon.setAttribute("class", "fa-solid fa-pencil pencil");
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa-solid fa-trash delete");

  listItem.appendChild(checkInput);
  listItem.appendChild(lists);
  listItem.appendChild(editInput);
  listItem.appendChild(iconContainer);
  iconContainer.appendChild(pencilIcon);
  iconContainer.appendChild(deleteIcon);

  deleteListEle(deleteIcon, listItem);
  editListEle(pencilIcon, lists, editInput);
  checkInput.addEventListener("change", () => {
    checkListEle(checkInput, lists, listItem);
  });

  const listContainer = document.querySelector(".list-container");
  listContainer.appendChild(listItem);
  saveData();
}

function deleteListEle(deleteicon, listItem) {
  deleteicon.addEventListener("click", () => {
    listItem.remove();
  });
}

function editListEle(pencilIcon, lists, editInput) {
  pencilIcon.addEventListener("click", () => {
    if (editInput.style.display === "none" || editInput.style.display === "") {
      editInput.style.display = "block";
      lists.style.display = "none";
      pencilIcon.classList.replace("fa-pencil", "fa-save");
      saveData();
    } else {
      lists.textContent = editInput.value;
      editInput.style.display = "none";
      lists.style.display = "block";
      pencilIcon.classList.replace("fa-save", "fa-pencil");
      saveData();
    }
  });
}

function checkListEle(checkInput, lists, listItem) {
  if (checkInput.checked == true) {
    lists.style.textDecoration = "line-through";
    listItem.style.backgroundColor = "#36C2CE";
    saveData();
  } else {
    lists.style.textDecoration = "none";
    listItem.style.backgroundColor = "white";
    saveData();
  }
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
  listContainer.innerHTML = localStorage.getItem("data") || "";

  const allitems = document.querySelectorAll(".list-item");

  allitems.forEach((item) => {
    const checkInput = item.querySelector('input[type="checkbox"]');

    const lists = item.querySelector("p");
    const editInput = item.querySelector(".edit-input");
    const pencilIcon = item.querySelector(".pencil");
    const deleteIcon = item.querySelector(".delete");

    checkInput.addEventListener("change", () => {
      checkListEle(checkInput, lists, item);
    });
    editListEle(pencilIcon, lists, editInput);
    deleteListEle(deleteIcon, item);
  });
}
showData();
