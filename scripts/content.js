let firstLoad = true;

function wait(mls = 400) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${mls} mls`);
    }, mls);
  });
}

function createButtons() {
  const el2 = document.querySelector('[data-testid="UserName"]');

  if (
    el2 &&
    document.querySelectorAll("#xeasy").length === 0 &&
    location.href.endsWith("RiseWithSobin") &&
    el2.textContent.split("@")[1] === "RiseWithSobin"
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

    if (
      document.querySelectorAll("#xeasy").length === 0 &&
      location.href.endsWith("RiseWithSobin") &&
      el2.textContent.split("@")[1] === "RiseWithSobin"
    ) {
      // Append buttons to the container
      buttonContainer.appendChild(buttonElement1);
      buttonContainer.appendChild(buttonElement2);
      el2.parentNode.insertBefore(buttonContainer, el2.nextSibling);
    }
  } else {
    console.log("Target element not found");
  }
}
// console.log(
//   document.querySelectorAll("#xeasy").length === 0 &&
//     location.href.endsWith("RiseWithSobin") &&
//     el2.textContent.split("@")[1] === "RiseWithSobin"
// );
// Callback function to be executed when the target element appears
async function handleMutation(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // Target element or its child has been added, call the function
      if (
        document.querySelectorAll("#xeasy").length === 0 &&
        location.href.endsWith("RiseWithSobin")
      )
        if (firstLoad) {
          firstLoad = false;
          await wait();
        }
      createButtons();

      // Disconnect the observer since we've done our job
      observer.disconnect();
    }
  }
}

// Select the target node
const targetNode = document.body;

// Options for the observer (we want to observe changes in the child nodes)
const config = { childList: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(handleMutation);

// Start observing the target node for configured mutations
if (
  document.querySelectorAll("#xeasy").length === 0 &&
  location.href.endsWith("RiseWithSobin")
)
  observer.observe(targetNode, config);
// console.log("====================================");
// console.log(location.href);
// console.log("====================================");

window.addEventListener("load", async (event) => {
  if (
    location.href.endsWith("RiseWithSobin") &&
    document.querySelectorAll("#xeasy").length === 0
  ) {
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
    if (
      location.href.endsWith("RiseWithSobin") &&
      document.querySelectorAll("#xeasy").length === 0
    ) {
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
  let isExist = !!location.href.endsWith("RiseWithSobin");
  if (!isExist) {
    document.querySelectorAll("#xeasy")?.forEach((el) => el.remove());
  }
}
