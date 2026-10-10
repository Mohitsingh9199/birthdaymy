// ══════════════════════════════════════════════════════════════
//  🎂 BIRTHDAY SURPRISE — MAIN SCRIPT
//  All logic: page transitions, games, animations, music
// ══════════════════════════════════════════════════════════════

(function () {
  "use strict";

  // ─── Helpers ──────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  /** Replace {name} and {myname} placeholders */
  function t(str) {
    return str
      .replace(/\{name\}/gi, CONFIG.herName)
      .replace(/\{myname\}/gi, CONFIG.myName);
  }

  /** Check if reduced motion is preferred */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ─── State ────────────────────────────────────────────────
  let currentPage = 0;
  let musicPlaying = false;
  let audio = null;

  // ═══════════════════════════════════════════════════════════
  //  INITIALIZATION
  // ═══════════════════════════════════════════════════════════
  function init() {
    // Set up audio
    audio = new Audio(CONFIG.musicPath);
    audio.loop = true;
    audio.volume = 0.4;

    // Populate text from config
    populateText();

    // Init background particles
    if (!prefersReducedMotion) {
      initBgCanvas();
      initSparkleCanvas();
      initStarryBg();
    }

    // Event listeners
    setupEventListeners();

    // Show first page
    showPage(0);
  }

  // ═══════════════════════════════════════════════════════════
  //  TEXT POPULATION
  // ═══════════════════════════════════════════════════════════
  function populateText() {
    // Page 1
    $("#welcomeText").textContent = t(CONFIG.welcomeText);
    $("#startBtnText").textContent = CONFIG.welcomeButton;

    // Page 2
    $("#messagesTitle").textContent = t(CONFIG.messagesTitle);

    // Page 3
    $("#catchTitle").textContent = t(CONFIG.catchHeartsTitle);
    $("#catchInstruction").textContent = t(CONFIG.catchHeartsInstruction);
    $("#catchWinTitle").textContent = t(CONFIG.catchHeartsWinTitle);
    $("#catchWinBtn").textContent = CONFIG.catchHeartsWinButton;

    // Page 4
    $("#quizTitle").textContent = t(CONFIG.quizTitle);
    $("#quizResultTitle").textContent = t(CONFIG.quizResultTitle);
    $("#quizResultMessage").textContent = t(CONFIG.quizResultMessage);
    $("#quizNextPageBtn").textContent = CONFIG.quizNextButton;

    // Page 5
    $("#memoryTitle").textContent = t(CONFIG.memoryTitle);
    $("#memoryInstruction").textContent = t(CONFIG.memoryInstruction);
    $("#memoryWinTitle").textContent = t(CONFIG.memoryWinTitle);
    $("#memoryWinBtn").textContent = CONFIG.memoryWinButton;
    $("#memorySkipBtn").textContent = CONFIG.memorySkipButton;

    // Page 6
    $("#countdownText").textContent = t(CONFIG.countdownText);

    // Page 7
    $("#birthdayHeading").textContent = t(CONFIG.birthdayHeading);
    $("#blowText").textContent = t(CONFIG.blowOutText);
  }

  // ═══════════════════════════════════════════════════════════
  //  EVENT LISTENERS
  // ═══════════════════════════════════════════════════════════
  function setupEventListeners() {
    // Lock Screen
    $("#lockBtn").addEventListener("click", () => {
      const val = $("#lockInput").value.trim().toLowerCase();
      const lockCard = $("#lockCard");
      
      if (val === "6 march" || val === "6th march") {
        $("#lockError").textContent = "";
        createSparkleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
        goToPage(1);
      } else {
        $("#lockError").textContent = "Galat password! Try again.";
        // Shake animation
        lockCard.classList.remove("shake");
        void lockCard.offsetWidth; // trigger reflow
        lockCard.classList.add("shake");
      }
    });

    // Handle Enter key for lock input
    $("#lockInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        $("#lockBtn").click();
      }
    });

    // Music toggle
    $("#musicToggle").addEventListener("click", toggleMusic);

    // Page 1 -> Page 2
    $("#startBtn").addEventListener("click", () => {
      startMusic();
      burstConfetti();
      // Show gift animation then transition
      const giftBox = $("#giftBox");
      const heart = $("#glowingHeart");
      heart.style.display = "none";
      giftBox.classList.add("show");
      setTimeout(() => giftBox.classList.add("opened"), 300);
      setTimeout(() => goToPage(2), 1500);
    });

    // Page 2: Messages navigation
    $("#nextMessageBtn").addEventListener("click", nextMessage);

    // Page 3: Catch Hearts win -> Page 4
    $("#catchWinBtn").addEventListener("click", () => goToPage(4));

    // Page 4: Quiz next page
    $("#quizNextPageBtn").addEventListener("click", () => goToPage(5));
    $("#quizNextBtn").addEventListener("click", nextQuizQuestion);

    // Page 5: Memory match
    $("#memoryWinBtn").addEventListener("click", () => goToPage(6));
    $("#memorySkipBtn").addEventListener("click", () => goToPage(6));
    $("#memoryPopupClose").addEventListener("click", () => {
      $("#memoryPopup").style.display = "none";
    });

    // Page 7: Cake blow out
    $(".cake").addEventListener("click", blowOutCandles);

    // Page 7: Replay + Save
    $("#replayBtn").addEventListener("click", replayLoveLetter);
    $("#saveBtn").addEventListener("click", () => {
      alert(
        "📸 Screenshot lelo is page ka aur apni gallery mein save karo!\n\n" +
          "Tip: Phone pe power + volume down dabao ya swipe down karke screenshot lo."
      );
    });

    // Sparkle effect on tap/click
    if (!prefersReducedMotion) {
      document.addEventListener("click", (e) => {
        // Only create sparkle if not clicking on the catch canvas (it has its own hearts)
        if (e.target.id !== "catchCanvas") {
           createSparkleEffect(e);
        }
      });
      document.addEventListener("touchstart", (e) => {
        if (e.target.id !== "catchCanvas") {
           const touch = e.touches[0];
           createSparkleEffect({ clientX: touch.clientX, clientY: touch.clientY });
        }
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  MUSIC CONTROLS
  // ═══════════════════════════════════════════════════════════
  function startMusic() {
    if (audio && !musicPlaying) {
      audio.play().catch(() => {}); // Ignore autoplay block
      musicPlaying = true;
      $(".music-icon").textContent = "🔊";
      $("#musicToggle").classList.add("playing");
    }
  }

  function toggleMusic() {
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      musicPlaying = false;
      $(".music-icon").textContent = "🔇";
      $("#musicToggle").classList.remove("playing");
    } else {
      audio.play().catch(() => {});
      musicPlaying = true;
      $(".music-icon").textContent = "🔊";
      $("#musicToggle").classList.add("playing");
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  PAGE TRANSITIONS
  // ═══════════════════════════════════════════════════════════
  function goToPage(num) {
    if (num === currentPage) return;
    showPage(num);
  }

  function showPage(num) {
    const oldPage = $(".page-active");
    const newPage = $(`#page${num}`);

    if (oldPage) {
      oldPage.classList.remove("page-active");
      oldPage.classList.add("page-exit");
      setTimeout(() => oldPage.classList.remove("page-exit"), 600);
    }

    setTimeout(() => {
      newPage.classList.add("page-active");
      newPage.scrollTop = 0;
    }, oldPage ? 200 : 0);

    currentPage = num;
    updateProgress(num);

    // Page-specific init
    switch (num) {
      case 2:
        initMessages();
        break;
      case 3:
        initCatchGame();
        break;
      case 4:
        initQuiz();
        break;
      case 5:
        initMemoryGame();
        break;
      case 6:
        startCountdown();
        break;
      case 7:
        initFinalPage();
        break;
    }
  }

  function updateProgress(num) {
    const bar = $("#progressBar");
    if (num > 1) bar.classList.add("visible");
    else bar.classList.remove("visible");

    $$(".progress-heart").forEach((h) => {
      const p = parseInt(h.dataset.page);
      if (p <= num) {
        h.classList.add("filled");
        h.textContent = "♥";
      } else {
        h.classList.remove("filled");
        h.textContent = "♡";
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  BACKGROUND PARTICLES (hearts, petals, stars)
  // ═══════════════════════════════════════════════════════════
  let bgCtx, bgCanvas;
  const particles = [];

  function initBgCanvas() {
    bgCanvas = $("#bgCanvas");
    bgCtx = bgCanvas.getContext("2d");
    resizeBgCanvas();
    window.addEventListener("resize", resizeBgCanvas);

    // Create initial particles
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle());
    }
    animateBg();
  }

  function resizeBgCanvas() {
    if (bgCanvas) {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    }
  }

  function createParticle() {
    const types = ["heart", "petal", "star"];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 12 + 6,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.4 + 0.1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      type,
    };
  }

  function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    const topY = y - size / 2;
    ctx.moveTo(x, topY + size / 4);
    ctx.bezierCurveTo(
      x, topY, x - size / 2, topY, x - size / 2, topY + size / 4
    );
    ctx.bezierCurveTo(
      x - size / 2, topY + size / 2, x, topY + size * 0.6, x, topY + size * 0.8
    );
    ctx.bezierCurveTo(
      x, topY + size * 0.6, x + size / 2, topY + size / 2, x + size / 2, topY + size / 4
    );
    ctx.bezierCurveTo(
      x + size / 2, topY, x, topY, x, topY + size / 4
    );
    ctx.fill();
  }

  function animateBg() {
    if (!bgCtx) return;
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    particles.forEach((p) => {
      bgCtx.save();
      bgCtx.translate(p.x, p.y);
      bgCtx.rotate((p.rotation * Math.PI) / 180);
      bgCtx.globalAlpha = p.opacity;

      if (p.type === "heart") {
        bgCtx.fillStyle = "#f8a4c8";
        drawHeart(bgCtx, 0, 0, p.size);
      } else if (p.type === "petal") {
        bgCtx.fillStyle = "#fdd5e8";
        bgCtx.beginPath();
        bgCtx.ellipse(0, 0, p.size / 3, p.size, 0, 0, Math.PI * 2);
        bgCtx.fill();
      } else {
        // Star / twinkle
        bgCtx.fillStyle = "#ffd700";
        bgCtx.beginPath();
        const s = p.size / 3;
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? s : s / 2;
          if (i === 0) bgCtx.moveTo(r * Math.cos(angle), r * Math.sin(angle));
          else bgCtx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
        }
        bgCtx.closePath();
        bgCtx.fill();
      }

      bgCtx.restore();

      // Move
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      // Wrap around
      if (p.y > window.innerHeight + 20) {
        p.y = -20;
        p.x = Math.random() * window.innerWidth;
      }
      if (p.x < -20) p.x = window.innerWidth + 20;
      if (p.x > window.innerWidth + 20) p.x = -20;
    });

    requestAnimationFrame(animateBg);
  }

  // ═══════════════════════════════════════════════════════════
  //  SPARKLE / HEART BURST ON TAP
  // ═══════════════════════════════════════════════════════════
  let sparkleCtx, sparkleCanvasEl;
  const sparkles = [];

  function initSparkleCanvas() {
    sparkleCanvasEl = $("#sparkleCanvas");
    sparkleCtx = sparkleCanvasEl.getContext("2d");
    resizeSparkleCanvas();
    window.addEventListener("resize", resizeSparkleCanvas);
    animateSparkles();
  }

  function resizeSparkleCanvas() {
    if (sparkleCanvasEl) {
      sparkleCanvasEl.width = window.innerWidth;
      sparkleCanvasEl.height = window.innerHeight;
    }
  }

  function createSparkleEffect(e) {
    const x = e.clientX;
    const y = e.clientY;
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.3;
      const speed = Math.random() * 3 + 2;
      const type = Math.random() > 0.5 ? "sparkle" : "miniHeart";
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 6 + 3,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        color:
          type === "sparkle"
            ? `hsl(${40 + Math.random() * 20}, 100%, 70%)`
            : "#f8a4c8",
        type,
      });
    }
  }

  function animateSparkles() {
    if (!sparkleCtx) return;
    sparkleCtx.clearRect(0, 0, sparkleCanvasEl.width, sparkleCanvasEl.height);

    for (let i = sparkles.length - 1; i >= 0; i--) {
      const s = sparkles[i];
      sparkleCtx.save();
      sparkleCtx.globalAlpha = s.life;

      if (s.type === "miniHeart") {
        sparkleCtx.fillStyle = s.color;
        drawHeart(sparkleCtx, s.x, s.y, s.size);
      } else {
        sparkleCtx.fillStyle = s.color;
        sparkleCtx.beginPath();
        sparkleCtx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
        sparkleCtx.fill();
      }

      sparkleCtx.restore();

      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.05; // gravity
      s.life -= s.decay;

      if (s.life <= 0) sparkles.splice(i, 1);
    }

    requestAnimationFrame(animateSparkles);
  }

  // ═══════════════════════════════════════════════════════════
  //  STARRY BACKGROUND (Page 1)
  // ═══════════════════════════════════════════════════════════
  function initStarryBg() {
    const container = $("#starryBg");
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: white;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.7 + 0.3};
        animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s;
      `;
      container.appendChild(star);
    }

    // Add twinkle keyframe dynamically
    if (!document.querySelector("#twinkle-style")) {
      const style = document.createElement("style");
      style.id = "twinkle-style";
      style.textContent = `
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  CONFETTI BURST
  // ═══════════════════════════════════════════════════════════
  function burstConfetti(count = 50) {
    const colors = [
      "#f8a4c8",
      "#ffd700",
      "#9b59b6",
      "#e85d9a",
      "#d4a373",
      "#fdd5e8",
      "#6b2d7b",
    ];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = Math.random() * 2 + 2 + "s";
      piece.style.animationDelay = Math.random() * 0.5 + "s";
      const shapes = ["circle", ""];
      if (Math.random() > 0.5) {
        piece.style.borderRadius = "50%";
      } else {
        piece.style.width = Math.random() * 8 + 6 + "px";
        piece.style.height = Math.random() * 14 + 6 + "px";
      }
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  PAGE 2: LOVE MESSAGES
  // ═══════════════════════════════════════════════════════════
  let messageIndex = 0;
  let messageTyping = false;

  function initMessages() {
    messageIndex = 0;
    showMessage(0);
  }

  function showMessage(idx) {
    if (idx >= CONFIG.messages.length) return;

    const msg = CONFIG.messages[idx];
    const emojiEl = $("#messageEmoji");
    const textEl = $("#messageText");
    const counterEl = $("#messageCounter");
    const btn = $("#nextMessageBtn");

    // Update emoji
    emojiEl.textContent = msg.emoji;
    emojiEl.style.animation = "none";
    void emojiEl.offsetHeight; // reflow
    emojiEl.style.animation = "emojiFloat 2s ease-in-out infinite";

    // Update counter
    counterEl.textContent = `${idx + 1} / ${CONFIG.messages.length}`;

    // Typing effect
    textEl.textContent = "";
    textEl.classList.add("typing");
    textEl.classList.remove("done");
    messageTyping = true;

    // Update button text
    if (idx === CONFIG.messages.length - 1) {
      btn.textContent = CONFIG.messagesDoneButton;
    } else {
      btn.textContent = CONFIG.messagesNextButton;
    }
    btn.disabled = true;

    typeText(textEl, t(msg.text), 0, () => {
      textEl.classList.remove("typing");
      textEl.classList.add("done");
      messageTyping = false;
      btn.disabled = false;
    });
  }

  function nextMessage() {
    if (messageTyping) return;
    messageIndex++;
    if (messageIndex >= CONFIG.messages.length) {
      goToPage(3);
      return;
    }

    // Quick card animation
    const card = $("#messageCard");
    card.classList.add("swipe-left");
    setTimeout(() => {
      card.classList.remove("swipe-left");
      showMessage(messageIndex);
    }, 300);
  }

  /** Typewriter effect */
  function typeText(el, text, charIdx, callback) {
    if (charIdx >= text.length) {
      callback();
      return;
    }
    el.textContent += text[charIdx];
    let delay = 35;
    // Pause at punctuation
    if (".!?।".includes(text[charIdx])) delay = 300;
    else if (",;:".includes(text[charIdx])) delay = 150;
    else if (text[charIdx] === "\n") delay = 200;

    setTimeout(() => typeText(el, text, charIdx + 1, callback), delay);
  }

  // ═══════════════════════════════════════════════════════════
  //  PAGE 3: CATCH THE HEARTS GAME
  // ═══════════════════════════════════════════════════════════
  let catchCanvas, catchCtx;
  let catchScore = 0;
  let catchAnimId = null;
  let basket = { x: 0, y: 0, w: 70, h: 50 };
  let fallingHearts = [];
  let catchGameRunning = false;

  function initCatchGame() {
    catchCanvas = $("#catchCanvas");
    catchCtx = catchCanvas.getContext("2d");
    catchScore = 0;
    fallingHearts = [];
    catchGameRunning = true;

    // Size canvas
    resizeCatchCanvas();
    window.addEventListener("resize", resizeCatchCanvas);

    // Position basket at bottom center
    basket.x = catchCanvas.width / 2 - basket.w / 2;
    basket.y = catchCanvas.height - basket.h - 10;

    updateCatchScore();

    // Touch/mouse controls
    catchCanvas.addEventListener("touchmove", onCatchTouch, { passive: false });
    catchCanvas.addEventListener("mousemove", onCatchMouse);

    // Keyboard controls
    document.addEventListener("keydown", onCatchKey);

    // Start spawning hearts
    catchSpawnLoop();
    catchAnimate();
  }

  function resizeCatchCanvas() {
    if (!catchCanvas) return;
    const rect = catchCanvas.getBoundingClientRect();
    catchCanvas.width = rect.width;
    catchCanvas.height = rect.height;
    basket.y = catchCanvas.height - basket.h - 10;
  }

  function onCatchTouch(e) {
    e.preventDefault();
    const rect = catchCanvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    basket.x = Math.max(0, Math.min(x - basket.w / 2, catchCanvas.width - basket.w));
  }

  function onCatchMouse(e) {
    const rect = catchCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    basket.x = Math.max(0, Math.min(x - basket.w / 2, catchCanvas.width - basket.w));
  }

  function onCatchKey(e) {
    if (currentPage !== 3 || !catchGameRunning) return;
    if (e.key === "ArrowLeft") basket.x = Math.max(0, basket.x - 30);
    if (e.key === "ArrowRight")
      basket.x = Math.min(catchCanvas.width - basket.w, basket.x + 30);
  }

  function catchSpawnLoop() {
    if (!catchGameRunning) return;
    fallingHearts.push({
      x: Math.random() * (catchCanvas.width - 30) + 15,
      y: -20,
      size: Math.random() * 15 + 20,
      speed: Math.random() * 2 + 1.5,
      wobble: Math.random() * Math.PI * 2,
    });
    setTimeout(catchSpawnLoop, Math.random() * 800 + 400);
  }

  function catchAnimate() {
    if (!catchGameRunning) return;
    catchCtx.clearRect(0, 0, catchCanvas.width, catchCanvas.height);

    // Draw basket
    catchCtx.save();
    catchCtx.fillStyle = "rgba(248,164,200,0.3)";
    catchCtx.strokeStyle = "#f8a4c8";
    catchCtx.lineWidth = 2;
    catchCtx.beginPath();
    catchCtx.roundRect(basket.x, basket.y, basket.w, basket.h, 10);
    catchCtx.fill();
    catchCtx.stroke();
    // Basket emoji
    catchCtx.font = "32px serif";
    catchCtx.textAlign = "center";
    catchCtx.fillText("🧺", basket.x + basket.w / 2, basket.y + basket.h - 8);
    catchCtx.restore();

    // Draw & move falling hearts
    for (let i = fallingHearts.length - 1; i >= 0; i--) {
      const h = fallingHearts[i];
      h.y += h.speed;
      h.wobble += 0.03;
      const wx = Math.sin(h.wobble) * 1.5;
      h.x += wx;

      catchCtx.save();
      catchCtx.globalAlpha = 0.9;
      catchCtx.fillStyle = "#f8a4c8";
      drawHeart(catchCtx, h.x, h.y, h.size);
      catchCtx.restore();

      // Check collision with basket
      if (
        h.y + h.size / 2 >= basket.y &&
        h.x >= basket.x &&
        h.x <= basket.x + basket.w
      ) {
        fallingHearts.splice(i, 1);
        catchScore++;
        updateCatchScore();

        // Love message popup every 5 hearts
        if (catchScore % 5 === 0 && catchScore <= CONFIG.catchHeartsTarget) {
          const msgIdx = catchScore / 5 - 1;
          if (CONFIG.catchHeartsMessages[msgIdx]) {
            showCatchPopup(CONFIG.catchHeartsMessages[msgIdx]);
          }
        }

        // Win condition
        if (catchScore >= CONFIG.catchHeartsTarget) {
          catchGameRunning = false;
          burstConfetti(60);
          setTimeout(() => {
            $("#catchWinOverlay").style.display = "flex";
          }, 500);
          return;
        }
        continue;
      }

      // Remove if off screen
      if (h.y > catchCanvas.height + 30) {
        fallingHearts.splice(i, 1);
      }
    }

    catchAnimId = requestAnimationFrame(catchAnimate);
  }

  function updateCatchScore() {
    $("#catchScore").textContent = `💖 ${catchScore} / ${CONFIG.catchHeartsTarget}`;
  }

  function showCatchPopup(msg) {
    const popup = document.createElement("div");
    popup.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: rgba(74,25,66,0.9); backdrop-filter: blur(10px);
      border: 2px solid #f8a4c8; border-radius: 20px; padding: 20px 30px;
      color: #fdd5e8; font-size: 18px; z-index: 200; text-align: center;
      animation: popIn 0.4s ease;
    `;
    popup.textContent = msg;
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.style.opacity = "0";
      popup.style.transition = "opacity 0.3s";
      setTimeout(() => popup.remove(), 300);
    }, 1500);
  }

  // ═══════════════════════════════════════════════════════════
  //  PAGE 4: QUIZ
  // ═══════════════════════════════════════════════════════════
  let quizIndex = 0;
  let quizScore = 0;

  function initQuiz() {
    quizIndex = 0;
    quizScore = 0;
    $("#quizContainer").style.display = "flex";
    $("#quizResult").style.display = "none";
    showQuizQuestion(0);
  }

  function showQuizQuestion(idx) {
    if (idx >= CONFIG.quizQuestions.length) {
      showQuizResult();
      return;
    }

    const q = CONFIG.quizQuestions[idx];
    $("#quizProgress").textContent = `Question ${idx + 1} / ${CONFIG.quizQuestions.length}`;
    $("#quizQuestion").textContent = t(q.question);
    $("#quizFeedback").style.display = "none";

    const optionsEl = $("#quizOptions");
    optionsEl.innerHTML = "";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => selectQuizOption(idx, i, btn));
      optionsEl.appendChild(btn);
    });
  }

  function selectQuizOption(qIdx, optIdx, btn) {
    const q = CONFIG.quizQuestions[qIdx];
    const allBtns = $$(".quiz-option-btn");

    allBtns.forEach((b) => b.classList.add("disabled"));

    if (optIdx === q.correct) {
      btn.classList.add("correct");
      quizScore++;
      $("#quizFeedbackText").innerHTML = t(q.rightResponse);
    } else {
      btn.classList.add("wrong");
      // Also highlight correct
      allBtns[q.correct].classList.add("correct");
      $("#quizFeedbackText").innerHTML = t(q.wrongResponse) + `<br><br><span style="font-size: 0.9em; opacity: 0.9;">Sahi jawab ye hona chahiye tha: <strong>${q.options[q.correct]}</strong></span>`;
    }

    $("#quizFeedback").style.display = "block";
  }

  function nextQuizQuestion() {
    quizIndex++;
    showQuizQuestion(quizIndex);
  }

  function showQuizResult() {
    $("#quizContainer").style.display = "none";
    $("#quizResult").style.display = "block";
    $("#quizScoreDisplay").textContent = `Score: ${quizScore} / ${CONFIG.quizQuestions.length}`;
    burstConfetti(40);
  }

  // ═══════════════════════════════════════════════════════════
  //  PAGE 5: MEMORY MATCH GAME
  // ═══════════════════════════════════════════════════════════
  let memoryCards = [];
  let memoryFlipped = [];
  let memoryMatched = 0;
  let memoryLocked = false;

  function initMemoryGame() {
    memoryMatched = 0;
    memoryFlipped = [];
    memoryLocked = false;

    const grid = $("#memoryGrid");
    grid.innerHTML = "";

    // Create pairs (6 pairs = 12 cards)
    // Use photos for card faces
    const pairCount = Math.min(CONFIG.memoryMessages.length, CONFIG.photoCount);
    memoryCards = [];

    for (let i = 0; i < pairCount; i++) {
      memoryCards.push({ id: i, type: "A" });
      memoryCards.push({ id: i, type: "B" });
    }

    // Shuffle
    for (let i = memoryCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
    }

    // Build cards
    memoryCards.forEach((card, idx) => {
      const wrapper = document.createElement("div");
      wrapper.className = "memory-card-wrapper";
      wrapper.dataset.idx = idx;
      wrapper.dataset.id = card.id;

      const inner = document.createElement("div");
      inner.className = "memory-card-inner";

      const front = document.createElement("div");
      front.className = "memory-card-front";
      front.textContent = "💖";

      const back = document.createElement("div");
      back.className = "memory-card-back";

      // Use photo for back
      const photoIdx = (card.id % CONFIG.photoCount) + 1;
      const img = document.createElement("img");
      img.src = `${CONFIG.photoPath}${photoIdx}${CONFIG.photoExtension}`;
      img.alt = "Memory";
      img.loading = "lazy";
      back.appendChild(img);

      inner.appendChild(front);
      inner.appendChild(back);
      wrapper.appendChild(inner);

      wrapper.addEventListener("click", () => flipMemoryCard(wrapper));
      grid.appendChild(wrapper);
    });
  }

  function flipMemoryCard(wrapper) {
    if (memoryLocked) return;
    if (wrapper.classList.contains("flipped")) return;
    if (wrapper.classList.contains("matched")) return;

    wrapper.classList.add("flipped");
    memoryFlipped.push(wrapper);

    if (memoryFlipped.length === 2) {
      memoryLocked = true;
      const [a, b] = memoryFlipped;

      if (a.dataset.id === b.dataset.id) {
        // Match!
        a.classList.add("matched");
        b.classList.add("matched");
        memoryMatched++;
        memoryFlipped = [];
        memoryLocked = false;

        // Show message
        const msgIdx = parseInt(a.dataset.id);
        if (CONFIG.memoryMessages[msgIdx]) {
          setTimeout(() => {
            $("#memoryPopupText").textContent = CONFIG.memoryMessages[msgIdx];
            $("#memoryPopup").style.display = "flex";
          }, 400);
        }

        // Check win
        const pairCount = Math.min(
          CONFIG.memoryMessages.length,
          CONFIG.photoCount
        );
        if (memoryMatched >= pairCount) {
          setTimeout(() => {
            burstConfetti(50);
            $("#memoryWinOverlay").style.display = "flex";
          }, 800);
        }
      } else {
        // No match — flip back
        setTimeout(() => {
          a.classList.remove("flipped");
          b.classList.remove("flipped");
          memoryFlipped = [];
          memoryLocked = false;
        }, 900);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  PAGE 6: COUNTDOWN
  // ═══════════════════════════════════════════════════════════
  function startCountdown() {
    const numEl = $("#countdownNumber");
    const ringEl = $("#heartbeatRing");
    ringEl.classList.add("beating");

    let count = 5;
    numEl.textContent = count;
    numEl.classList.add("show");

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        numEl.classList.remove("show");
        setTimeout(() => {
          numEl.textContent = count;
          numEl.classList.add("show");
        }, 100);
      } else {
        clearInterval(interval);
        numEl.classList.remove("show");
        ringEl.classList.remove("beating");

        // Fireworks then transition
        launchFireworks();
        setTimeout(() => goToPage(7), 2500);
      }
    }, 1000);
  }

  // ═══════════════════════════════════════════════════════════
  //  FIREWORKS (Canvas)
  // ═══════════════════════════════════════════════════════════
  function launchFireworks() {
    const canvas = $("#fireworksCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fwParticles = [];
    const colors = [
      "#f8a4c8",
      "#ffd700",
      "#9b59b6",
      "#e85d9a",
      "#fdd5e8",
      "#d4a373",
    ];

    // Create 5 burst origins
    for (let b = 0; b < 5; b++) {
      const cx = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
      const cy = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 * i) / 40;
        const speed = Math.random() * 4 + 2;
        fwParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: Math.random() * 0.015 + 0.008,
          color,
          size: Math.random() * 3 + 1,
          delay: b * 300,
          born: performance.now(),
        });
      }
    }

    const startTime = performance.now();

    function animFW(now) {
      ctx.fillStyle = "rgba(13,5,32,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      fwParticles.forEach((p) => {
        if (now - startTime < p.delay) {
          alive = true;
          return;
        }
        if (p.life <= 0) return;
        alive = true;

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.life -= p.decay;
      });

      if (alive) requestAnimationFrame(animFW);
    }

    requestAnimationFrame(animFW);
  }

  // ═══════════════════════════════════════════════════════════
  //  PAGE 7: FINAL BIRTHDAY PAGE
  // ═══════════════════════════════════════════════════════════
  let slideshowTimer = null;
  let slideshowIndex = 0;
  let letterStarted = false;

  function initFinalPage() {
    burstConfetti(80);
    startBalloons();
    startFinalCanvasEffects();
    initMarquee();
    setupLetterObserver();
  }

  // ─── Balloons ─────────────────────────────────────────────
  function startBalloons() {
    const colors = [
      "#f8a4c8",
      "#ffd700",
      "#9b59b6",
      "#e85d9a",
      "#d4a373",
      "#fdd5e8",
    ];

    function spawnBalloon() {
      if (currentPage !== 7) return;
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = Math.random() * 90 + 5 + "%";
      balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.animationDuration = Math.random() * 4 + 5 + "s";
      document.body.appendChild(balloon);
      setTimeout(() => balloon.remove(), 10000);

      setTimeout(spawnBalloon, Math.random() * 1500 + 500);
    }
    spawnBalloon();
  }

  // ─── Final Canvas (continuous confetti & fireworks) ────────
  function startFinalCanvasEffects() {
    const canvas = $("#finalCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const fxParticles = [];
    const colors = ["#f8a4c8", "#ffd700", "#9b59b6", "#e85d9a", "#d4a373"];

    function spawnBurst() {
      if (currentPage !== 7) return;
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = Math.random() * 2 + 1;
        fxParticles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
          color,
          size: Math.random() * 2 + 1,
        });
      }
      setTimeout(spawnBurst, Math.random() * 2000 + 1000);
    }
    spawnBurst();

    function animFinal() {
      if (currentPage !== 7) return;
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = fxParticles.length - 1; i >= 0; i--) {
        const p = fxParticles[i];
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life -= p.decay;

        if (p.life <= 0) fxParticles.splice(i, 1);
      }
      requestAnimationFrame(animFinal);
    }
    requestAnimationFrame(animFinal);
  }

  // ─── Photo Marquee (two rows, opposite directions) ─────
  function initMarquee() {
    const track1 = $("#marqueeTrack1");
    const track2 = $("#marqueeTrack2");
    track1.innerHTML = "";
    track2.innerHTML = "";

    // Split photos into two sets: odd → row 1, even → row 2
    const row1Photos = [];
    const row2Photos = [];
    for (let i = 1; i <= CONFIG.photoCount; i++) {
      const src = `${CONFIG.photoPath}${i}${CONFIG.photoExtension}`;
      if (i % 2 !== 0) row1Photos.push(src);
      else row2Photos.push(src);
    }

    // If one row is empty (e.g. only 1 photo), use all in both
    if (row1Photos.length === 0) row1Photos.push(...row2Photos);
    if (row2Photos.length === 0) row2Photos.push(...row1Photos);

    // Helper: build photo elements for a track, duplicated for seamless loop
    function buildTrack(track, photos) {
      // Repeat photos to ensure they cover even wide screens without gaps
      let baseSet = [];
      for (let i = 0; i < 4; i++) {
        baseSet.push(...photos);
      }
      
      // We add the baseSet twice so CSS translateX(-50%) loops perfectly over identical halves
      const allPhotos = [...baseSet, ...baseSet];
      allPhotos.forEach((src) => {
        const wrapper = document.createElement("div");
        wrapper.className = "marquee-photo";
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Memory";
        img.loading = "lazy";
        img.draggable = false;
        wrapper.appendChild(img);
        track.appendChild(wrapper);
      });
    }

    buildTrack(track1, row1Photos);
    buildTrack(track2, row2Photos);
  }

  // ─── Love Letter Typing Effect ────────────────────────────
  function setupLetterObserver() {
    letterStarted = false;
    const container = $("#loveLetterContainer");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !letterStarted) {
            letterStarted = true;
            startLoveLetterTyping();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    // Also start after a delay as fallback (if scrolling doesn't trigger)
    setTimeout(() => {
      if (!letterStarted) {
        letterStarted = true;
        startLoveLetterTyping();
      }
    }, 5000);
  }

  function startLoveLetterTyping() {
    const textEl = $("#loveLetterText");
    const sigEl = $("#loveLetterSignature");
    const fullText = t(CONFIG.loveLetterText);

    textEl.textContent = "";
    textEl.classList.add("typing");
    sigEl.style.display = "none";

    typeText(textEl, fullText, 0, () => {
      textEl.classList.remove("typing");
      // Show signature
      sigEl.textContent = t(CONFIG.loveLetterSignature);
      sigEl.style.display = "block";
    });
  }

  function replayLoveLetter() {
    letterStarted = true;
    startLoveLetterTyping();
    // Scroll to letter
    $("#loveLetterContainer").scrollIntoView({ behavior: "smooth" });
  }

  // ─── Blow Out Candles ─────────────────────────────────────
  function blowOutCandles() {
    const container = $(".cake-container");
    if (container.classList.contains("blown")) return;
    container.classList.add("blown");
    burstConfetti(40);
  }

  // ═══════════════════════════════════════════════════════════
  //  LAUNCH
  // ═══════════════════════════════════════════════════════════
  document.addEventListener("DOMContentLoaded", init);

})();
