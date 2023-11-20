let firstLoad = true;
let username = "";

chrome.storage.sync.get("username", function (data) {
  console.log("usernames", data);
  username = data.username;
});

function wait(mls = 400) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${mls} mls`);
    }, mls);
  });
}

function createButtonElement(text, url) {
  let buttonElement = document.createElement("button");
  buttonElement.textContent = text;
  buttonElement.classList.add("button");

  buttonElement.addEventListener("click", function () {
    if (text === "Analytics") {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  });

  return buttonElement;
}

function isExist() {
  return (
    document.querySelectorAll("#xeasy").length === 0 &&
    location.href.endsWith(username)
  );
}

function createButtons() {
  if (!username) {
    console.log("Username is undefined. Skipping button creation.");
    return;
  }

  const element = document.querySelector('[data-testid="UserName"]');
  if (element && isExist()) {
    let buttonContainer = document.createElement("div");
    buttonContainer.id = "xeasy";

    let buttonElement1 = createButtonElement(
      "Analytics",
      "https://analytics.twitter.com/"
    );
    let buttonElement2 = createButtonElement(
      "Schedules",
      "https://twitter.com/compose/tweet/unsent/scheduled"
    );
    buttonElement2.style.marginLeft = "10px";

    buttonContainer.appendChild(buttonElement1);
    buttonContainer.appendChild(buttonElement2);
    element.parentNode.insertBefore(buttonContainer, element.nextSibling);
  } else {
    console.log("Target element not found");
  }
}

async function handleMutation(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      if (isExist())
        if (firstLoad) {
          firstLoad = false;
          await wait();
        }
      createButtons();
      observer.disconnect();
    }
  }
}

const targetNode = document.body;
const config = { childList: true };
const observer = new MutationObserver(handleMutation);

if (isExist()) observer.observe(targetNode, config);

window.addEventListener("load", async () => {
  if (isExist()) {
    firstLoad = false;
    await wait(1000);
    createButtons();
  }
  console.log("page is fully loaded");
});

let lastUrl = location.href;
new MutationObserver(async () => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
    if (isExist()) {
      if (firstLoad) {
        firstLoad = false;
        await wait();
      }
      if (!firstLoad) createButtons();
    }
  }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
  console.log("URL changed!!", location.href);
  let isExist = !!location.href.endsWith(username);
  if (!isExist) {
    document.querySelectorAll("#xeasy")?.forEach((el) => el.remove());
  }
}
