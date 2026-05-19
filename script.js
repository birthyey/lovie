// script.js

const pages = {
  cake: document.getElementById("cakePage"),
  photo: document.getElementById("photoPage"),
  envelope: document.getElementById("envelopePage"),
  letter: document.getElementById("letterPage")
};

/* PAGE SWITCH */
function switchPage(nextPage){

  Object.values(pages).forEach(page=>{
    page.classList.remove("active");
  });

  setTimeout(()=>{
    nextPage.classList.add("active");
  },100);
}

/* 🎂 MIC BLOW DETECTION */
const flame = document.getElementById("flame");

navigator.mediaDevices.getUserMedia({audio:true})
.then(stream=>{

  const audioContext = new AudioContext();

  const microphone = audioContext.createMediaStreamSource(stream);

  const analyser = audioContext.createAnalyser();

  microphone.connect(analyser);

  const data = new Uint8Array(analyser.fftSize);

  function detectBlow(){

    analyser.getByteTimeDomainData(data);

    let volume = 0;

    for(let i=0;i<data.length;i++){
      volume += Math.abs(data[i] - 128);
    }

    if(volume > 3000){

      flame.style.display = "none";

      setTimeout(()=>{
        switchPage(pages.photo);
      },900);

      return;
    }

    requestAnimationFrame(detectBlow);
  }

  detectBlow();
});

/* 👶 CONTINUE BUTTON */
document
.getElementById("continueBtn")
.addEventListener("click", ()=>{

  switchPage(pages.envelope);

});

/* 💌 ENVELOPE CLICK */
document
.getElementById("envelope")
.addEventListener("click", ()=>{

  switchPage(pages.letter);

  startMusic();

  startTyping();

});

/* 🎵 MUSIC */
function startMusic(){

  const music = document.getElementById("music");

  music.volume = 0;

  music.play();

  const fade = setInterval(()=>{

    if(music.volume < 0.7){

      music.volume += 0.05;

    }else{

      clearInterval(fade);

    }

  },200);
}

/* ✍️ TYPEWRITER */
function startTyping(){

  const text = `Happy birthday, my love.

before you, I never realized how much one person could change the way life feels.

You became my comfort without even trying. You became the person I look for in every moment — whether something good happens or when life feels too heavy to carry.

Thank you for loving me gently.
Thank you for being patient with me.
Thank you for staying even on the days I felt difficult to love.

I know you carry a lot silently sometimes, and I wish I could take away every sadness, pressure, and exhaustion you feel. If I could give you one thing in this life, it would be peace — the kind of peace your heart truly deserves.

I hope you never doubt how important you are.
To me, you are not just someone I love.
You are someone I thank life for every single day.

And no matter where life takes us in the future, a part of my heart will always choose you.

Happy birthday, Lovie.
I love you endlessly.`;

  const output = document.getElementById("typedText");

  output.innerHTML = "";

  let i = 0;

  function typing(){

    if(i < text.length){

      output.innerHTML += text.charAt(i);

      i++;

      setTimeout(typing,28);
    }
  }

  typing();
}