/* ===================================================
   LOADER
=================================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.transition = "0.8s";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 3000);

});

/* ===================================================
   CURSOR GLOW
=================================================== */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";

});

/* ===================================================
   ELEMENT
=================================================== */

const welcome = document.getElementById("welcome");
const gameSection = document.getElementById("gameSection");
const successSection = document.getElementById("successSection");

const startBtn = document.getElementById("startGame");

const bgMusic = document.getElementById("bgMusic");

const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const progressFill = document.getElementById("progressFill");

/* ===================================================
   VARIABLE
=================================================== */

let score = 0;

const targetScore = 15;

let timeLeft = 45;

let timer;

let gameRunning = false;

let spawnInterval;

/* ===================================================
   START GAME
=================================================== */

startBtn.addEventListener("click", () => {

    welcome.style.display = "none";

    gameSection.style.display = "flex";

    bgMusic.volume = 0.25;

    bgMusic.play();

    startGame();

});

/* ===================================================
   START SYSTEM
=================================================== */

function startGame(){

    score = 0;

    timeLeft = 45;

    gameRunning = true;

    updateUI();

    timer = setInterval(() => {

        timeLeft--;

        timerText.textContent = timeLeft;

        if(timeLeft <= 0){

            endGame(false);

        }

    },1000);

    spawnInterval = setInterval(() => {

        spawnObject();

    },850);

}

/* ===================================================
   UPDATE UI
=================================================== */

function updateUI(){

    scoreText.textContent = `${score} / ${targetScore}`;

    timerText.textContent = timeLeft;

    progressFill.style.width = (score / targetScore) * 100 + "%";

}

/* ===================================================
   RANDOM OBJECT
=================================================== */

function spawnObject(){

    if(!gameRunning) return;

    const item = document.createElement("div");

    item.classList.add("game-object");

    const random = Math.random();

    let type = "";
    let emoji = "";
    let value = 0;

    if(random < 0.55){

        type = "heart";
        emoji = "❤️";
        value = 1;

    }

    else if(random < 0.70){

        type = "golden";
        emoji = "💖";
        value = 2;

    }

    else if(random < 0.82){

        type = "golden";
        emoji = "⭐";
        value = 3;

    }

    else if(random < 0.93){

        type = "broken";
        emoji = "💔";
        value = -1;

    }

    else{

        type = "bomb";
        emoji = "💣";
        value = -999;

    }

    item.classList.add(type);

    item.textContent = emoji;

    const maxX = gameArea.clientWidth - 70;
    const maxY = gameArea.clientHeight - 70;

    item.style.left = Math.random() * maxX + "px";
    item.style.top = Math.random() * maxY + "px";

    gameArea.appendChild(item);

    /* CLICK */

    item.addEventListener("click", () => {

        if(type === "bomb"){

            timeLeft -= 3;

            if(timeLeft < 0){

                timeLeft = 0;

            }

        }

        else{

            score += value;

            if(score < 0){

                score = 0;

            }

        }

        updateUI();

        item.remove();

        if(score >= targetScore){

            endGame(true);

        }

    });

    /* AUTO REMOVE */

    setTimeout(() => {

        if(item.parentNode){

            item.remove();

        }

    },1800);

}

/* ===================================================
   END GAME
=================================================== */

function endGame(isWin){

    gameRunning = false;

    clearInterval(timer);
    clearInterval(spawnInterval);

    document.querySelectorAll(".game-object").forEach(item => {
        item.remove();
    });

    if(isWin){

        gameSection.style.display = "none";
        successSection.style.display = "flex";

        launchConfetti();

    }else{

        alert("Time's Up! ❤️\nTry Again.");

        location.reload();

    }

}

/* ===================================================
   CONFETTI
=================================================== */

function launchConfetti(){

    if(typeof confetti !== "function") return;

    const duration = 3000;
    const end = Date.now() + duration;

    (function frame(){

        confetti({
            particleCount:4,
            angle:60,
            spread:70,
            origin:{x:0}
        });

        confetti({
            particleCount:4,
            angle:120,
            spread:70,
            origin:{x:1}
        });

        if(Date.now() < end){
            requestAnimationFrame(frame);
        }

    })();

}

/* ===================================================
   OPEN LETTER
=================================================== */

const openLetterBtn = document.getElementById("openLetter");
const letterSection = document.getElementById("letterSection");
const typingLetter = document.getElementById("typingLetter");

openLetterBtn.addEventListener("click", () => {

    successSection.style.display = "none";

    letterSection.style.display = "flex";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    typeLetter();

});

/* ===================================================
   LETTER TEXT
=================================================== */

const letterText = `Dear Sayangg,

Happy National Girlfriend Day ❤️

Thank you for coming into my life.

Thank you for staying beside me.

Maybe I'm not perfect.

Maybe I still make mistakes.

But one thing will never change...

I will always choose you.

Every smile,
every laugh,
and every little moment with you
became one of my favorite memories.

I hope today reminds you
how special you are.

Not only today.

But every single day.

Thank you for being my home,
my happiness,
and my favorite person.

I Lay My Love On You.

Forever Yours,

ANM. ❤️`;

/* ===================================================
   TYPEWRITER
=================================================== */

let letterIndex = 0;
let typingFinished = false;

function typeLetter(){

    typingLetter.innerHTML = "";

    letterIndex = 0;

    typingFinished = false;

    typingEffect();

}

function typingEffect(){

    if(letterIndex < letterText.length){

        typingLetter.innerHTML += letterText.charAt(letterIndex);

        letterIndex++;

        setTimeout(typingEffect,45);

    }else{

        typingFinished = true;

        showNextSections();

    }

}

/* ===================================================
   SHOW NEXT SECTION
=================================================== */

function showNextSections(){

    const gallery = document.querySelector(".gallery-section");
    const reason = document.querySelector(".reason-section");
    const timeline = document.querySelector(".timeline-section");
    const secret = document.querySelector(".secret-section");
    const ending = document.querySelector(".ending-section");

    gallery.style.display = "flex";
    reason.style.display = "flex";
    timeline.style.display = "flex";
    secret.style.display = "flex";
    ending.style.display = "flex";

}

/* ===================================================
   PHOTO ROTATION
=================================================== */

document.querySelectorAll(".photo-card").forEach(card=>{

    const random = Math.floor(Math.random()*12)-6;

    card.style.setProperty("--r",random);

});

/* ===================================================
   IMAGE MODAL
=================================================== */

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".photo-card img").forEach(img=>{

    img.addEventListener("click",()=>{

        modal.style.display="flex";

        modalImg.src = img.src;

    });

});

closeModal.addEventListener("click",()=>{

    modal.style.display="none";

});

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

});

/* ===================================================
   SECRET ACHIEVEMENT
=================================================== */

const secretBtn = document.getElementById("secretBtn");
const achievementPopup = document.getElementById("achievementPopup");
const closeAchievement = document.getElementById("closeAchievement");

secretBtn.addEventListener("click", () => {

    achievementPopup.style.display = "flex";

    if(typeof confetti === "function"){

        confetti({
            particleCount:180,
            spread:90,
            origin:{ y:0.6 }
        });

    }

});

closeAchievement.addEventListener("click", () => {

    achievementPopup.style.display = "none";

});

achievementPopup.addEventListener("click",(e)=>{

    if(e.target === achievementPopup){

        achievementPopup.style.display = "none";

    }

});

/* ===================================================
   REPLAY GAME
=================================================== */

const replayBtn = document.getElementById("replayBtn");

replayBtn.addEventListener("click",()=>{

    location.reload();

});

/* ===================================================
   FLOATING HEART BACKGROUND
=================================================== */

const heartContainer = document.getElementById("heart-effects");

function createFloatingHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-50px";
    heart.style.fontSize = (18 + Math.random() * 20) + "px";
    heart.style.opacity = Math.random() * 0.6 + 0.4;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "0";
    heart.style.transition = "transform 6s linear, opacity 6s linear";

    heartContainer.appendChild(heart);

    requestAnimationFrame(()=>{

        heart.style.transform =
            `translateY(-110vh) translateX(${Math.random()*120-60}px)`;

        heart.style.opacity = "0";

    });

    setTimeout(()=>{

        heart.remove();

    },6000);

}

setInterval(createFloatingHeart,900);

/* ===================================================
   SPARKLE EFFECT
=================================================== */

const sparkleContainer = document.getElementById("sparkles");

function createSparkle(){

    const sparkle = document.createElement("div");

    sparkle.innerHTML = "✨";

    sparkle.style.position = "fixed";
    sparkle.style.left = Math.random()*100 + "vw";
    sparkle.style.top = Math.random()*100 + "vh";
    sparkle.style.fontSize = (10 + Math.random()*18) + "px";
    sparkle.style.opacity = "0";
    sparkle.style.pointerEvents = "none";
    sparkle.style.transition = "1.5s";

    sparkleContainer.appendChild(sparkle);

    requestAnimationFrame(()=>{

        sparkle.style.opacity = "1";
        sparkle.style.transform = "scale(1.5)";

    });

    setTimeout(()=>{

        sparkle.style.opacity = "0";

    },1200);

    setTimeout(()=>{

        sparkle.remove();

    },1800);

}

setInterval(createSparkle,700);

/* ===================================================
   TOUCH SUPPORT
=================================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("touchstart",()=>{

        button.style.transform = "scale(.96)";

    });

    button.addEventListener("touchend",()=>{

        button.style.transform = "";

    });

});

/* ===================================================
   MUSIC RESUME
=================================================== */

document.addEventListener("click",()=>{

    if(bgMusic.paused){

        bgMusic.play().catch(()=>{});

    }

});

/* ===================================================
   PREVENT DOUBLE TAP ZOOM
=================================================== */

let lastTouchEnd = 0;

document.addEventListener("touchend",(event)=>{

    const now = Date.now();

    if(now - lastTouchEnd <= 300){

        event.preventDefault();

    }

    lastTouchEnd = now;

},{passive:false});

/* ===================================================
   END
=================================================== */

console.log("%c❤️ Catch My Heart ❤️",
"font-size:20px;color:#ff4fd8;font-weight:bold;");

console.log("Made with ❤️ by ANM.");
