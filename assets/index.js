let topZ = 1000;

// ---------- LOAD YAML DATA ----------
fetch('assets/data.yml')
  .then(res => res.text())
  .then(text => {
    const data = jsyaml.load(text);

    // Publications
    const pubList = document.getElementById('publications-list');
    data.publications.forEach(pub => {
      const a = document.createElement('a');
      a.href = pub.link;
      a.target = "_blank";
      a.textContent = pub.title;
      pubList.appendChild(a);
      pubList.appendChild(document.createElement('br'));
    });

    // Projects
    const projList = document.getElementById('projects-list');
    data.projects.forEach(proj => {
      const a = document.createElement('a');
      a.href = proj.link;
      a.target = "_blank";
      a.textContent = proj.name;
      projList.appendChild(a);
      projList.appendChild(document.createElement('br'));
    });

    // Teaching
    const teachList = document.getElementById('teaching-list');
    data.teaching.forEach(course => {
      const a = document.createElement('a');
      a.href = course.syllabus;
      a.target = "_blank";
      a.textContent = course.course;
      teachList.appendChild(a);
      teachList.appendChild(document.createElement('br'));
    });
  });

// ---------- POPUP MANAGEMENT ----------
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pw = popup.offsetWidth;
  const ph = popup.offsetHeight;

  const offsetX = (Math.random() * 60) - 30;
  const offsetY = (Math.random() * 60) - 30;

  popup.style.left = `${(vw - pw)/2 + offsetX}px`;
  popup.style.top = `${(vh - ph)/2 + offsetY}px`;
  topZ++;
  popup.style.zIndex = topZ;
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

document.getElementById('close-all-btn').addEventListener('click', () => {
  document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
});

// ---------- DRAGGABLE & RESIZABLE POPUPS ----------
document.querySelectorAll('.popup').forEach(popup => {
  const header = popup.querySelector('.popup-header');

  // Drag
  let isDragging = false, offsetX = 0, offsetY = 0;
  header.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
    topZ++;
    popup.style.zIndex = topZ;
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    popup.style.left = (e.clientX - offsetX) + 'px';
    popup.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => isDragging = false);

  // Resize
  const resizer = document.createElement('div');
  resizer.style.width = '12px';
  resizer.style.height = '12px';
  resizer.style.background = '#c4a7e7';
  resizer.style.position = 'absolute';
  resizer.style.right = '0';
  resizer.style.bottom = '0';
  resizer.style.cursor = 'se-resize';
  popup.appendChild(resizer);

  let isResizing = false, startX = 0, startY = 0, startWidth = 0, startHeight = 0;
  resizer.addEventListener('mousedown', e => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = popup.offsetWidth;
    startHeight = popup.offsetHeight;
    topZ++;
    popup.style.zIndex = topZ;
    e.stopPropagation();
  });

  document.addEventListener('mousemove', e => {
    if (!isResizing) return;
    popup.style.width = (startWidth + e.clientX - startX) + 'px';
    popup.style.height = (startHeight + e.clientY - startY) + 'px';
  });

  document.addEventListener('mouseup', () => isResizing = false);
});

// ---------- FUN FACTS ----------
const funFacts = [
  "You found a hidden fun fact! 🌟",
  "Keep exploring! Did you know? 💡",
  "Fun fact: Interactive media preserves culture! 🎮",
  "Tip: Collaboration sparks creativity! ✨"
];

function createFunFact() {
  const text = funFacts[Math.floor(Math.random() * funFacts.length)];
  const popup = document.createElement('div');
  popup.className = 'popup';
  const width = 220, height = 100;
  const vw = window.innerWidth, vh = window.innerHeight;
  const offsetX = (Math.random() * 60) - 30, offsetY = (Math.random() * 60) - 30;

  popup.style.width = width + 'px';
  popup.style.height = height + 'px';
  popup.style.left = `${(vw - width)/2 + offsetX}px`;
  popup.style.top = `${(vh - height)/2 + offsetY}px`;
  popup.style.position = 'absolute';
  popup.style.display = 'block';
  popup.style.zIndex = ++topZ;
  popup.style.background = '#e3d7ff';
  popup.style.border = '2px solid #c4a7e7';
  popup.style.borderRadius = '12px';
  popup.style.boxShadow = '4px 4px 0 #c4a7e7';

  popup.innerHTML = `
    <div class="popup-header">Fun Fact <button class="popup-close">X</button></div>
    <div class="popup-content">${text}</div>
  `;
  document.body.appendChild(popup);
  popup.querySelector('.popup-close').onclick = () => popup.remove();
}

// Click bio image to create fun fact
document.querySelector('.bio-box img').addEventListener('click', createFunFact);

// ---------- ZELDA EASTER EGG ----------
document.getElementById('footer-easter-egg').addEventListener('click', () => {
  const popup = document.createElement('div');
  popup.className = 'popup';
  const width = 300, height = 120;
  const vw = window.innerWidth, vh = window.innerHeight;

  popup.style.width = width + 'px';
  popup.style.height = height + 'px';
  popup.style.left = ((vw - width)/2) + 'px';
  popup.style.top = ((vh - height)/2) + 'px';
  popup.style.position = 'absolute';
  popup.style.display = 'block';
  popup.style.background = '#e3d7ff';
  popup.style.border = '2px solid #c4a7e7';
  popup.style.borderRadius = '12px';
  popup.style.boxShadow = '4px 4px 0 #c4a7e7';
  popup.style.zIndex = ++topZ;

  popup.innerHTML = `
    <div class="popup-header">🎮 Zelda Easter Egg <button class="popup-close">X</button></div>
    <div class="popup-content">
      <div class="marquee"><span>🔺 You found the Triforce! 🔺</span></div>
      <p style="color:#6a5acd; margin-top:0.5rem;">It's dangerous to go alone… take this! 🗡️</p>
    </div>
  `;
  document.body.appendChild(popup);
  popup.querySelector('.popup-close').onclick = () => popup.remove();
});
