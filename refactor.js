function createButtons() {
  const element = document.querySelector('[data-testid="UserName"]');

  if (
    element &&
    location.href.endsWith("RiseWithSobin") &&
    document.querySelectorAll("#xeasy").length === 0
  ) {
    var buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.marginBottom = "10px";
    buttonContainer.id = "xeasy";

    var buttonElement1 = document.createElement("button");
    buttonElement1.textContent = "Analytics";
    buttonElement1.style.backgroundColor = "#1DA1F2";
    buttonElement1.style.color = "white";
    buttonElement1.style.fontWeight = "bold";
    buttonElement1.style.width = "100px";
    buttonElement1.style.borderRadius = "10px";
    buttonElement1.style.padding = "10px";
    buttonElement1.style.border = "none";
    buttonElement1.style.cursor = "pointer";
    buttonElement1.style.outline = "none";
    buttonElement1.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
    buttonElement1.style.transition = "all 0.3s ease";
    buttonElement1.style.zIndex = "1000";

    var buttonElement2 = document.createElement("button");
    buttonElement2.textContent = "Scheduled";
    buttonElement2.style.backgroundColor = "#1DA1F2";
    buttonElement2.style.color = "white";
    buttonElement2.style.fontWeight = "bold";
    buttonElement2.style.width = "100px";
    buttonElement2.style.borderRadius = "10px";
    buttonElement2.style.padding = "10px";
    buttonElement2.style.border = "none";
    buttonElement2.style.cursor = "pointer";
    buttonElement2.style.outline = "none";
    buttonElement2.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
    buttonElement2.style.transition = "all 0.3s ease";
    buttonElement2.style.zIndex = "1000";
    buttonElement2.style.marginLeft = "10px";

    buttonElement1.addEventListener("click", function () {
      window.open("https://analytics.twitter.com/", "_blank");
    });

    buttonElement2.addEventListener("click", function () {
      window.open("https://twitter.com/compose/tweet/unsent/scheduled");
    });

    // Append buttons to the container
    buttonContainer.appendChild(buttonElement1);
    buttonContainer.appendChild(buttonElement2);

    element.parentNode.insertBefore(buttonContainer, element.nextSibling);
  } else {
    console.log("Target element not found");
  }
}

function handleMutation(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // Target element or its child has been added, call the function
      createButtons();

      // Disconnect the observer since we've done our job
      observer.disconnect();
    }
  }
}

function onUrlChange() {
  console.log("URL changed!", location.href);
}

function checkAndCreateButtons() {
  const buttonsCreated = localStorage.getItem("buttonsCreated");

  if (!buttonsCreated) {
    createButtons();
    localStorage.setItem("buttonsCreated", "true");
  }
}

// Check and create buttons on initial page load
document.addEventListener("DOMContentLoaded", function () {
  checkAndCreateButtons();
});

// Check and create buttons when the URL changes
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
    checkAndCreateButtons();
  }
}).observe(document, { subtree: true, childList: true });
