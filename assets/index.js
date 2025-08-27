// Load YAML data
fetch('assets/data.yml')
  .then(res => res.text())
  .then(text => {
    const data = jsyaml.load(text);

    const pubList = document.getElementById('publications-list');
    data.publications.forEach(pub => {
      const a = document.createElement('a');
      a.href = pub.link;
      a.target = "_blank";
      a.textContent = pub.title;
      pubList.appendChild(a);
      pubList.appendChild(document.createElement('br'));
    });

    const projList = document.getElementById('projects-list');
    data.projects.forEach(proj => {
      const a = document.createElement('a');
      a.href = proj.link;
      a.target = "_blank";
      a.textContent = proj.name;
      projList.appendChild(a);
      projList.appendChild(document.createElement('br'));
    });

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

// Popup functions
function openPopup(id) {
  const popup = document.getElementById(id);
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  popup.style.left = `${(vw - popup.offsetWidth)/2 + (Math.random()*60-30)}px`;
  popup.style.top = `${(vh - popup.offsetHeight)/2 + (Math.random()*60-30)}px`;
  popup.style.display = 'block';
  popup.style.zIndex = 1000;
}
function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}
document.getElementById('close-all-btn').addEventListener('click', () => {
  document.querySelectorAll('.popup').forEach(p => p.style.display='none');
});

// Draggable
document.querySelectorAll('.popup').forEach(popup => {
  const header = popup.querySelector('.popup-header');
  let isDown = false, offsetX = 0, offsetY = 0;
  header.addEventListener('mousedown', e => {
    isDown = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
    popup.style.zIndex = 1000;
  });
  document.addEventListener('mousemove', e => {
    if(!isDown) return;
    popup.style.left = (e.clientX - offsetX) + 'px';
    popup.style.top = (e.clientY - offsetY) + 'px';
  });
  document.addEventListener('mouseup', ()=>{isDown=false});
});

// Fun fact popups
const funFacts = [
  "You found a hidden fun fact! 🌟",
  "Keep exploring! Did you know? 💡",
  "Fun fact: Interactive media preserves culture! 🎮",
  "Tip: Collaboration sparks creativity! ✨"
];
function createFunFact(){
  const text = funFacts[Math.floor(Math.random()*funFacts.length)];
  const popup = document.createElement('div');
  popup.className='popup';
  popup.style.width='220px';
  popup.style.height='100px';
  const vw=window.innerWidth, vh=window.innerHeight;
  popup.style.left=`${(vw-220)/2 + (Math.random()*60-30)}px`;
  popup.style.top=`${(vh-100)/2 + (Math.random()*60-30)}px`;
  popup.style.position='absolute';
  popup.style.display='block';
  popup.style.zIndex=1000;
  popup.style.background='#e3d7ff';
  popup.style.border='2px solid #c4a7e7';
  popup.style.borderRadius='12px';
  popup.style.boxShadow='4px 4px 0 #c4a7e7';
  popup.innerHTML=`<div class="popup-header">Fun Fact <button class="popup-close">X</button></div>
    <div class="popup-content">${text}</div>`;
  document.body.appendChild(popup);
  popup.querySelector('.popup-close').onclick=()=>popup.remove();

  const header=popup.querySelector('.popup-header');
  let isDown=false,dragX=0,dragY=0;
  header.addEventListener('mousedown',e=>{isDown=true;dragX=e.clientX-popup.offsetLeft;dragY=e.clientY-popup.offsetTop;popup.style.zIndex=1000});
  document.addEventListener('mousemove',e=>{if(!isDown)return;popup.style.left=(e.clientX-dragX)+'px';popup.style.top=(e.clientY-dragY)+'px';});
  document.addEventListener('mouseup',()=>{isDown=false});
}
document.querySelector('.bio-box img').addEventListener('click', createFunFact);

// Zelda Easter Egg
document.getElementById('footer-easter-egg').addEventListener('click', ()=>{
  const popup=document.createElement('div');
  popup.className='popup';
  popup.style.width='300px';
  popup.style.height='120px';
  const vw=window.innerWidth,vh=window.innerHeight;
  popup.style.left=((vw-300)/2)+'px';
  popup.style.top=((vh-120)/2)+'px';
  popup.style.position='absolute';
  popup.style.display='block';
  popup.style.background='#e3d7ff';
  popup.style.border='2px solid #c4a7e7';
  popup.style.borderRadius='12px';
  popup.style.boxShadow='4px 4px 0 #c4a7e7';
  popup.style.zIndex=1000;
  popup.innerHTML=`<div class="popup-header">🎮 Zelda Easter Egg <button class="popup-close">X</button></div>
    <div class="popup-content">
      <div class="marquee"><span>🔺 You found the Triforce! 🔺</span></div>
      <p style="color:#6a5acd;margin-top:0.5rem;">It's dangerous to go alone… take this! 🗡️</p>
    </div>`;
  document.body.appendChild(popup);
  popup.querySelector('.popup-close').onclick=()=>popup.remove();
  const header=popup.querySelector('.popup-header');
  let isDown=false,dragX=0,dragY=0;
  header.addEventListener('mousedown',e=>{isDown=true;dragX=e.clientX-popup.offsetLeft;dragY=e.clientY-popup.offsetTop;popup.style.zIndex=1000});
  document.addEventListener('mousemove',e=>{if(!isDown)return;popup.style.left=(e.clientX-dragX)+'px';popup.style.top=(e.clientY-dragY)+'px';});
  document.addEventListener('mouseup',()=>{isDown=false});
});
