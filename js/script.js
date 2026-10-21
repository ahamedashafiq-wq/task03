
const modal = document.querySelector("#user-modal");
const openButton = document.querySelector("#open-modal");
const closeButton = document.querySelector("#close-modal");
const cancelButton = document.querySelector("#cancel-modal");
const userForm = document.querySelector("#user-form");
const tableBody = document.querySelector("#user-table-body");
const message = document.querySelector("#form-message");

function openModal() {
  message.textContent = "";
  modal.showModal();
  document.querySelector("#user-name").focus();
}

function closeModal() {
  modal.close();
  openButton.focus();
}

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
cancelButton.addEventListener("click", closeModal);

userForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!userForm.reportValidity()) {
    return;
  }

  const formData = new FormData(userForm);
  const name = formData.get("userName").trim();
  const email = formData.get("userEmail").trim();
  const role = formData.get("userRole");

  if (!name || !email) {
    message.textContent = "Please complete all required fields.";
    return;
  }

  // Build table cells safely without inserting user input as HTML.
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = name;

  const emailCell = document.createElement("td");
  emailCell.textContent = email;

  const roleCell = document.createElement("td");
  roleCell.textContent = role;

  const statusCell = document.createElement("td");
  const badge = document.createElement("span");

  badge.className = "badge badge-success";
  badge.textContent = "Active";

  statusCell.appendChild(badge);

  row.append(nameCell, emailCell, roleCell, statusCell);
  tableBody.prepend(row);

  message.textContent = `${name} has been added successfully.`;
  userForm.reset();

  closeModal();
});

// Native dialog handles Escape and restores focus.
modal.addEventListener("close", () => {
  openButton.focus();
});
