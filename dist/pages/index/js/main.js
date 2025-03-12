const universalErrorMessage = document.getElementById(
  "universal-errors-messages",
);

const copyButton = document.getElementById("copy-button");
const contractAddress = document.getElementById("contract-address");
const copyrightYearDisplay = document.getElementById("copyright-year-display");

copyButton.addEventListener("click", (e) => {
  // First, check if the Clipboard API is available
  if (!navigator.clipboard) {
    showError(
      "Your browser doesn't support the Clipboard API. Please try a modern browser.",
    );
    return;
  }

  navigator.clipboard
    .writeText(contractAddress.textContent)
    .then(() => {
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 2000);
    })
    .catch((reason) => {
      showError(
        "Failed to copy the text. Please make sure your browser supports copying text.",
      );
    });
});

function showError(message) {
  universalErrorMessage.textContent = "Error: " + message;
  universalErrorMessage.classList.add("show");

  // Update ARIA for accessibility
  universalErrorMessage.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    universalErrorMessage.classList.remove("show");

    // Wait for the transition to complete before hiding from screen readers
    setTimeout(() => {
      universalErrorMessage.setAttribute("aria-hidden", "true");
    }, 300);
  }, 5000);
}

const currentYear = new Date().getFullYear();
copyrightYearDisplay.textContent = currentYear;
