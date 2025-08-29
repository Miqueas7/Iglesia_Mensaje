if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("/service-worker.js")
  );
}
const modeToggle = document.getElementById("modeToggle");
const messageFaith = document.getElementById("message-faith");
const messageUniversal = document.getElementById("message-universal");
const offlineBanner = document.getElementById("offlineBanner");
function updateMode() {
  const faith = modeToggle.checked;
  messageFaith.style.display = faith ? "block" : "none";
  messageUniversal.style.display = faith ? "none" : "block";
}
modeToggle?.addEventListener("change", updateMode);
updateMode();
function onStatusChange() {
  if (!navigator.onLine) {
    offlineBanner.classList.add("show");
  } else {
    offlineBanner.classList.remove("show");
  }
}
window.addEventListener("online", onStatusChange);
window.addEventListener("offline", onStatusChange);
onStatusChange();
