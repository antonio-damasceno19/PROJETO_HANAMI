const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

textInput.addEventListener("input", updateCounters);

function updateCounters() {
  const text = textInput.value;

  charCount.textContent = text.length;

  const words = text.trim().split(/\s+/);
  wordCount.textContent = text.trim() === "" ? 0 : words.length;
}

function toUpperCaseText() {
  textInput.value = textInput.value.toUpperCase();
  updateCounters();
}

function toLowerCaseText() {
  textInput.value = textInput.value.toLowerCase();
  updateCounters();
}

function removeExtraSpaces() {
  textInput.value = textInput.value.replace(/\s+/g, " ").trim();
  updateCounters();
}

function clearText() {
  textInput.value = "";
  updateCounters();
}
