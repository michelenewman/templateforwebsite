// Open popup
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = "block";
  popup.style.left = "100px";
  popup.style.top = "100px";
  bringToFront(popup);
}

// Close popup
document.querySelectorAll(".popup-close").forEach(btn => {
  btn.addEventListener("click", e => {
    e.target.closest(".popup").style.display = "none";
  });
});

// Close all
document.getElementById("close-all-btn").addEventListener("click", () => {
  document.querySelectorAll(".popup").forEach(p => p.style.display = "none");
});

// Draggable + resizable + bring-to-front
let highestZ = 1000;
function bringToFront(el) {
  highestZ++;
  el.style.zIndex = highestZ;
}

document.querySelectorAll(".popup").forEach(popup => {
  const header = popup.querySelector(".popup-header");
  let offsetX, offsetY, dragging = false;

  header.addEventListener("mousedown", e => {
    dragging = true;
    bringToFront(popup);
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
  });

  document.addEventListener("mousemove", e => {
    if (dragging) {
      popup.style.left = (e.clientX - offsetX) + "px";
      popup.style.top = (e.clientY - offsetY) + "px";
    }
  });

  document.addEventListener("mouseup", () => dragging = false);
});

// Zelda Easter egg on footer click
document.getElementById("footer-easter-egg").addEventListener("click", () => {
  openPopup("funfact-popup");
});
