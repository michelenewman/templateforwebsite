// assets/index.js

// ---------- POPUP HANDLING ----------
let zIndexCounter = 100;

function openPopup(id) {
  const popup = document.getElementById(id);
  if (!popup) return;

  popup.style.display = "block";

  // Slightly randomize position so they don’t all stack
  popup.style.left = `${100 + Math.random() * 150}px`;
  popup.style.top = `${100 + Math.random() * 100}px`;

  bringToFront(popup);
}

function closePopup(popup) {
  popup.style.display = "none";
}

function bringToFront(popup) {
  zIndexCounter++;
  popup.style.zIndex = zIndexCounter;
}

// Attach close + dragging + resizing
document.querySelectorAll(".popup").forEach((popup) => {
  const closeBtn = popup.querySelector(".popup-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closePopup(popup));
  }

  // Dragging
  const header = popup.querySelector(".popup-header");
  if (header) {
    header.addEventListener("mousedown", (e) => {
      bringToFront(popup);
      let shiftX = e.clientX - popup.getBoundingClientRect().left;
      let shiftY = e.clientY - popup.getBoundingClientRect().top;

      function moveAt(e) {
        popup.style.left = e.pageX - shiftX + "px";
        popup.style.top = e.pageY - shiftY + "px";
      }

      function onMouseMove(e) {
        moveAt(e);
      }

      document.addEventListener("mousemove", onMouseMove);

      header.onmouseup = () => {
        document.removeEventListener("mousemove", onMouseMove);
        header.onmouseup = null;
      };
    });
  }

  // Resizing
  const resizeHandle = popup.querySelector(".popup-resize");
  if (resizeHandle) {
    resizeHandle.addEventListener("mousedown", (e) => {
      bringToFront(popup);
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = parseInt(
        document.defaultView.getComputedStyle(popup).width,
        10
      );
      const startHeight = parseInt(
        document.defaultView.getComputedStyle(popup).height,
        10
      );

      function doDrag(e) {
        popup.style.width = startWidth + e.clientX - startX + "px";
        popup.style.height = startHeight + e.clientY - startY + "px";
      }

      function stopDrag() {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
      }

      document.addEventListener("mousemove", doDrag);
      document.addEventListener("mouseup", stopDrag);
    });
  }
});

// Close All button
document.getElementById("close-all-btn").addEventListener("click", () => {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.style.display = "none";
  });
});

// ---------- YAML LOADING ----------
async function loadYAML() {
  try {
    const response = await fetch("assets/data.yml");
    const text = await response.text();
    const data = jsyaml.load(text);

    if (data.publications) {
      document.getElementById("publications-list").innerHTML =
        data.publications.map((p) => `<p>${p}</p>`).join("");
    }

    if (data.projects) {
      document.getElementById("projects-list").innerHTML =
        data.projects.map((p) => `<p>${p}</p>`).join("");
    }

    if (data.teaching) {
      document.getElementById("teaching-list").innerHTML =
        data.teaching.map((p) => `<p>${p}</p>`).join("");
    }
  } catch (err) {
    console.error("Error loading YAML:", err);
  }
}

loadYAML();

// ---------- EASTER EGGS ----------
document.addEventListener("keydown", (e) => {
  // Zelda Easter egg: Press "z"
  if (e.key.toLowerCase() === "z") {
    const zeldaPopup = document.createElement("div");
    zeldaPopup.className = "popup";
    zeldaPopup.style.width = "300px";
    zeldaPopup.style.height = "150px";
    zeldaPopup.style.left = "50%";
    zeldaPopup.style.top = "50%";
    zeldaPopup.style.transform = "translate(-50%, -50%)";
    zeldaPopup.innerHTML = `
      <div class="popup-header">
        Zelda Secret <button class="popup-close">X</button>
      </div>
      <div class="popup-content">
        <p>It’s dangerous to go alone! Take this.</p>
      </div>
      <div class="popup-resize"></div>
    `;
    document.body.appendChild(zeldaPopup);

    bringToFront(zeldaPopup);

    const closeBtn = zeldaPopup.querySelector(".popup-close");
    closeBtn.addEventListener("click", () => closePopup(zeldaPopup));
  }
});
