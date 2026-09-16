const questions = [
  {
    title: "The Jacob Test 👀",
    text: "Whenever people call Jacob on a video call, what are they most likely to find him doing?",
    type: "text",
    answer: "eating",
    hint: "One word. You already know this one. 😂"
  },
  {
    title: "Math Mode 🧠",
    text: "Jacob gave Isabella a little maths challenge once. Now it's his turn: calculate the integral below.",
    type: "text",
    answer: "2",
    math: "∫₀² x dx = ?",
    hint: "Find the area under y = x from 0 to 2. 😉"
  },
  {
    title: "Anime Mode 🍥",
    text: "A young ninja dreams of becoming the leader of his village. He grows up as an outcast, makes powerful friends, faces dangerous enemies and refuses to give up on his dream. What is the title of this anime?",
    type: "text",
    answer: "naruto",
    hint: "You have watched this one... so this should be easy. 😂"
  },
  {
    title: "The Hamburg Incident 🚶🏽‍♂️😂",
    text: "If Jacob tells you, \"Oh, it's just here. It's so close,\" you should be prepared to...",
    type: "text",
    answer: "walk",
    hint: "Think back to Hamburg. 😂"
  }
];

let current = 0;
let selected = null;

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
  if(id === "quiz") renderQuestion();
}

function renderQuestion(){
  const q = questions[current];
  selected = null;

  document.getElementById("questionNumber").textContent =
    `Question ${current+1} of ${questions.length}`;
  document.getElementById("progressBar").style.width =
    `${(current/questions.length)*100}%`;
  document.getElementById("questionTitle").textContent = q.title;

  let questionText = q.text;
  if(q.math){
    questionText += `<br><br><span class="math-question">${q.math}</span>`;
  }
  document.getElementById("questionText").innerHTML = questionText;

  document.getElementById("feedback").textContent = "";

  const area = document.getElementById("answerArea");
  area.innerHTML = `
    <input id="textAnswer" class="answer-input" type="text"
      autocomplete="off" autocapitalize="none"
      placeholder="Type your answer here...">
    <p class="small" style="margin-top:10px;">${q.hint}</p>`;

  setTimeout(() => document.getElementById("textAnswer")?.focus(), 100);
  document.getElementById("submitButton").textContent = "SUBMIT";
  document.getElementById("submitButton").disabled = false;
}

function normalize(s){
  return s.trim().toLowerCase()
    .replace(/[.,!?]/g,"")
    .replace(/\s+/g," ");
}

function submitAnswer(){
  const q = questions[current];
  const input = document.getElementById("textAnswer");

  if(!input || !input.value.trim()){
    document.getElementById("feedback").textContent =
      "Type an answer first. 👀";
    return;
  }

  const correct = normalize(input.value) === normalize(q.answer);

  if(correct){
    document.getElementById("feedback").innerHTML =
      `<span style="color:var(--right)">Correct! ✓</span>`;
    document.getElementById("submitButton").disabled = true;

    setTimeout(()=>{
      current++;
      if(current >= questions.length){
        document.getElementById("progressBar").style.width = "100%";
        showScreen("unlocked");
      } else {
        renderQuestion();
      }
    },650);
  } else {
    document.getElementById("feedback").innerHTML =
      `<span style="color:var(--wrong)">Not quite! Try again. 😏</span>`;
    input.focus();
  }
}

function chooseGift(type){
  if(type === "spa"){
    document.getElementById("finalTitle").textContent =
      "The Luxury Spa Escape 🧖🏽‍♂️❤️🧖🏽‍♀️";
    document.getElementById("finalMessage").innerHTML =
      `Jacob & Abigail, your birthday experience is a <strong>couples spa day</strong>!<br><br>
       Relax, unwind and enjoy some well-deserved time together.`;
    document.getElementById("voucherCode").textContent = "JACOB-SPA-2026";
  } else {
    document.getElementById("finalTitle").textContent =
      "Date Night 🍷🍽️";
    document.getElementById("finalMessage").innerHTML =
      `Jacob & Abigail, your birthday experience is a <strong>three-course dinner for two with wine</strong>!<br><br>
       Good food, good wine and good company.`;
    document.getElementById("voucherCode").textContent = "JACOB-DINNER-2026";
  }
  showScreen("final");
  launchConfetti();
}

function launchConfetti(){
  for(let i=0;i<70;i++){
    const c=document.createElement("div");
    c.className="confetti";
    c.style.left=(Math.random()*100)+"vw";
    c.style.setProperty("--x",((Math.random()-.5)*220)+"px");
    c.style.animationDelay=(Math.random()*.8)+"s";
    c.style.transform=`rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3800);
  }
}
