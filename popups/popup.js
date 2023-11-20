const addButton = document.getElementById("addButton");
const deleteBtn = document.getElementById("deleteButton");
const twitterForm = document.getElementById("twitterForm");
const twitterUrlInput = document.getElementById("twitterUrl");
const confirmationMessage = document.getElementById("confirmationMessage");
const msg = document.getElementById("message");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", function () {
    const twitterUrl = twitterUrlInput.value.trim();

    if (twitterUrl === "") {
      displayErrorMessage("Please enter a valid Twitter URL or Username.");
      twitterUrlInput.classList.add("error");
      return;
    }

    clearErrorStyles();

    addTwitterUsername(twitterUrl);
  });

  deleteBtn.addEventListener("click", deleteTwitterUsername);

  displaySavedUsername();
});

function clearErrorStyles() {
  twitterUrlInput.classList.remove("error");

  const errorMessage = document.getElementById("errorMessage");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function displayErrorMessage(message) {
  let errorMessage = document.getElementById("errorMessage");

  if (!errorMessage) {
    errorMessage = document.createElement("div");
    errorMessage.id = "errorMessage";
    errorMessage.style.color = "#ff6b6b";
    twitterForm.appendChild(errorMessage);
  }

  errorMessage.textContent = message;
}

function addTwitterUsername(twitterUrl) {
  const username = extractUsername(twitterUrl);

  if (!username) {
    console.error("Invalid Twitter URL");
    return;
  }

  chrome.storage.sync.set({ username: username }, function () {
    console.log("Username added/updated:", username);

    displayConfirmationMessage(username);
    hideInputField();
    showDeleteButton();
  });
  sendMessageToContentScript("reloadPage");
}

function deleteTwitterUsername() {
  chrome.storage.sync.remove("username", function () {
    console.log("Username deleted");
    showInputField();
    hideDeleteButton();
  });
  sendMessageToContentScript("reloadPage");
}

function hideInputField() {
  twitterForm.style.display = "none";
}

function showInputField() {
  twitterForm.style.display = "block";
}

function hideDeleteButton() {
  deleteBtn.style.display = "none";
  confirmationMessage.textContent = "";
}

function showDeleteButton() {
  deleteBtn.style.display = "block";
}

function displayConfirmationMessage(username) {
  confirmationMessage.textContent = `@${username} is saved.`;
}

function extractUsername(input) {
  input = input.trim();

  const urlMatch = input.match(/twitter\.com\/([^\/?]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }

  return input.replace(/^@/, "");
}

function displaySavedUsername() {
  chrome.storage.sync.get("username", function (data) {
    const savedUsername = data.username;
    if (savedUsername) {
      displayConfirmationMessage(savedUsername);
      hideInputField();
      showDeleteButton();
    }
  });
}

function sendMessageToContentScript(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: function (message) {
        if (message === "reloadPage" && location.host === "twitter.com") {
          location.reload();
        }
      },
      args: [message],
    });
  });
}
