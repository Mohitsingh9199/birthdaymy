// ╔═══════════════════════════════════════════════════════════════╗
// ║  🎂 BIRTHDAY SURPRISE CONFIG — Edit everything here!        ║
// ╚═══════════════════════════════════════════════════════════════╝

const CONFIG = {

  // ─── Personal Details ──────────────────────────────────────────
  herName: "Jaanu",          // Replace with her name
  myName: "Tumhara",         // Replace with your name
  herBirthday: "2026-10-15", // Replace with her birthday (YYYY-MM-DD)

  // ─── Photos ────────────────────────────────────────────────────
  // Put photos in /assets/photos/ named photo1.jpg, photo2.jpg, etc.
  photoCount: 8,             // Total number of photos
  photoPath: "assets/photos/photo", // Base path (appends 1.jpg, 2.jpg...)
  photoExtension: ".jpg",

  // ─── Music ─────────────────────────────────────────────────────
  musicPath: "assets/photos/dekhte_dekhte.mp3",

  // ─── Page 1: Welcome ──────────────────────────────────────────
  welcomeText: "Hey {name}... 💖\nEk chhoti si surprise hai\nsirf tumhare liye",
  welcomeButton: "Surprise kholo 🎁",

  // ─── Page 2: Love Messages ────────────────────────────────────
  messagesTitle: "Tumhare Liye Mere Dil Ki Baatein 💌",
  messages: [
    { emoji: "💖", text: "Yaad hai wo din jab tum pehli baar meri zindagi mein aayi thi? Aisa laga tha jaise kisi ne meri sookhi hui duniya mein barish ki pehli boond gira di ho. Tum meri zindagi ka sabse khaas hissa thi." },
    { emoji: "🌹", text: "Tumhari hasi mein ek ajeeb sa sukoon tha. Jab tum hasti thi, toh lagta tha jaise duniya ki saari fikar ek pal mein khatam ho gayi ho. Wo mera sabse favorite gaana tha." },
    { emoji: "🦋", text: "Tumhare saath bitaya gaya ek-ek chhota lamha aaj meri sabse keemti memory ban chuka hai. Un yaadon ki jagah mere dil mein koi nahi le sakta." },
    { emoji: "🌙", text: "Aaj bhi jab raaton ko neend nahi aati, toh bas purani yaadon ko dhoondh liya karta hu. Ek ajeeb sa dard hota hai, par saath hi thoda sukoon bhi mil jata hai ki tum kabhi meri thi." },
    { emoji: "😂", text: "Tumhara wo chhoti-chhoti baaton par chidh jana, aur fir mera tumhe manana... Kasam se, tumhare us cute se gusse ke liye main aaj bhi sab kuch chhod sakta hu." },
    { emoji: "🏠", text: "Maine kabhi kisi aur ke saath wo apnapan feel nahi kiya jo tumhare saath karta tha. Tum mera ek lauta comfort zone thi, jahan main bina kisi dar ke bas apna asli roop dikha sakta tha." },
    { emoji: "🌻", text: "Bhale hi aaj humari raahein alag ho gayi hain, par main aaj bhi yehi dua karta hu ki tum jahan bhi raho, hamesha khush raho aur muskuraati raho." },
    { emoji: "✨", text: "Tumhari aankhon mein jab main dekhta tha na, toh mujhe pura aasmaan nazar aata tha. Lagta tha main duniya ka sabse khushnaseeb insaan hu." },
    { emoji: "🎵", text: "Tumhe yaad hain wo lambi raatein, jab bina waqt dekhe hum ghanton baatein kiya karte the? Wo beete hue pal meri poori zindagi ki sabse khaas daulat (treasure) hain." },
    { emoji: "💫", text: "Mere liye tum sirf ek girlfriend nahi thi. Tum meri sabse achhi dost thi, meri taqat thi. Maine tum mein apni poori duniya dekhi thi." },
    { emoji: "🥰", text: "Aur pata hai? Tumhara chehra aaj bhi meri aankhon ke saamne waisa hi chamakta hai. Tum aaj bhi utni hi pyari aur khoobsurat ho, balki pehle se aur bhi zyada." },
    { emoji: "🌈", text: "Waqt ne jo kiya, wo socha nahi tha. Hum alag zarur ho gaye hain, par mere dil ke ek hisse mein tumhari jagah hamesha waisi hi mehfooz rahega, hamesha ke liye." },
  ],
  messagesNextButton: "Agle message 💌",
  messagesDoneButton: "Ab ek chhota sa game khelte hain 🎮",

  // ─── Page 3: Catch the Hearts Game ────────────────────────────
  catchHeartsTitle: "Catch the Hearts! 💕",
  catchHeartsInstruction: "Hearts ko catch karo! 15 hearts catch karke dikhao 😘",
  catchHeartsTarget: 15,
  catchHeartsMessages: [
    // Shown every 5 hearts
    "Aww, bahut acche! 🥰",
    "Tum toh pro ho! 💖",
    "Tumne mera dil jeet liya! 😘",
  ],
  catchHeartsWinTitle: "Tumne mera dil jeet liya! 😘",
  catchHeartsWinButton: "Aage badho 🎯",

  // ─── Page 4: Quiz ─────────────────────────────────────────────
  quizTitle: "How Well Do You Know Us? 💑",
  quizQuestions: [
    {
      question: "Humari pehli mulaqat kahan hui thi?",
      options: ["Coaching mein", "Park mein", "Online", "Kisi party mein"],
      correct: 0,
      rightResponse: "Sahi jawab! Woh din kitna special tha 🥰",
      wrongResponse: "Galat, par tum phir bhi cute ho 😜",
    },
    {
      question: "Mera favorite cheez tumhare baare mein kya tha?",
      options: ["Tumhari smile", "Tumhari aankhen", "Tumhari hasi", "Sab kuch 💖"],
      correct: 3,
      rightResponse: "Obviously sab kuch! 💖",
      wrongResponse: "Aww close, but it was everything about you! 😘",
    },
    {
      question: "Hum sabse zyada kya karte the saath mein?",
      options: ["Call pe baatein", "Saath ghoomna", "Movies dekhna", "Khana khana"],
      correct: 0,
      rightResponse: "Haan! Humari calls toh endless hoti thi 😂",
      wrongResponse: "Haha, woh bhi sahi hai, par calls toh top pe thi! 📱",
    },
    {
      question: "Agar main ek color hota toh kaunsa hota?",
      options: ["Red ❤️", "Pink 🩷", "Purple 💜", "Gold ✨"],
      correct: 1,
      rightResponse: "Pink — soft, sweet, aur tumhare jaisa 🩷",
      wrongResponse: "Nahi yaar, main toh pink hoon — tumhari tarah sweet 😄",
    },
    {
      question: "Main tumhe sabse zyada kab miss karta hu?",
      options: ["Raat ko", "Subah uthke", "Har waqt", "Jab baat nahi hoti"],
      correct: 2,
      rightResponse: "Har waqt. Literally har ek second 🥺",
      wrongResponse: "Close! But honestly, I miss you every single moment 💕",
    },
    {
      question: "Maine humara future kaisa socha tha?",
      options: ["Bahut khoobsurat 🌈", "Full of adventures 🚀", "Romantic af 💖", "Sab kuch together 🏠"],
      correct: 3,
      rightResponse: "Yes! Socha tha ki sab kuch milke, saath mein karenge 🏠❤️",
      wrongResponse: "Haha sab sahi hain, but together is what I thought! 🥰",
    },
  ],
  quizResultTitle: "Sabse Khaas Insaan 👑",
  quizResultMessage: "Score chahe kuch bhi ho, tum mere liye perfect thi — hamesha yaad rahogi! 💖",
  quizNextButton: "Aage chalo ✨",

  // ─── Page 5: Memory Match Game ────────────────────────────────
  memoryTitle: "Memory Match 🃏",
  memoryInstruction: "Jodi milaao aur hidden messages reveal karo! 💌",
  memoryMessages: [
    "Pehli mulaqat ki yaad 🥰",
    "Humari pehli date 💕",
    "Woh funny wali baat 😂",
    "Late night calls 🌙",
    "Tumhari woh cute si selfie 📸",
    "Humara favorite song 🎵",
  ],
  memoryWinTitle: "Sab jodi mil gayi! 🎉",
  memoryWinButton: "Final surprise ke liye ready? 💫",
  memorySkipButton: "Skip karo ⏭️",

  // ─── Page 6: Countdown ────────────────────────────────────────
  countdownText: "Aur ab...\nsabse khaas surprise\nke liye tayyar ho jao 💫",

  // ─── Page 7: Final Birthday Page ──────────────────────────────
  birthdayHeading: "Happy Birthday, {name}! 🎂💖",
  blowOutText: "Candles ko blow karo! 🕯️ (Tap the cake)",
  loveLetterText: `{name}... 

Happy Birthday.

Mujhe nahi pata aaj tum kaisa feel kar rahi ho, par mere liye aaj ka din utna hi special hai jitna hamesha se tha. Shuru mein jab hum mile the, toh laga tha jaise sab kuch mil gaya mujhe. Tumhari wo pyari si hasi, tumhari choti-choti baatein... main aaj bhi un sab ko bahut miss karta hoon.

Lekin pata nahi humare beech ye sab kaise ho gaya. Ek chhota sa jhagda hi toh tha... uske baad tumne jo kiya, usne mujhe andar tak tod diya. Tumne itni aasani se kisi aur se baat karna shuru kar diya? Kya humara rishta, humara pyaar itna kamzor tha ki tumne ek jhagde ke baad itni jaldi kisi aur ko apni zindagi mein jagah de di?

Main tumse bahut pyaar karta hoon, aaj bhi karta hoon. Lekin jo tumne kiya hai, wo sach mein theek nahi kiya {name}. Ladaai har relationship mein hoti hai, narazgi hoti hai, par usko suljhane ke bajaye kisi aur ka hath thaam lena... ye toh pyaar nahi tha na? Mujhe sach mein bahut takleef hui hai tumhari is baat se. 

Mera dil aaj bhi yahi chahta hai ki kash humara wo pehle wala bond wapas aa jaye, kash sab theek ho jata. Par maine tumhe poore dil se chaha tha aur hamesha chahunga. 

Tum jahan bhi raho, khush raho aur apna khayal rakhna. Happy Birthday.`,
  loveLetterSignature: "Sirf tumhara,\n{myname} 💔",

  // ─── Open Graph / Link Preview ────────────────────────────────
  ogTitle: "Ek surprise tumhare liye 💖",
  ogDescription: "Kuch special hai — sirf tumhare liye banaya hai 🎂🌹",
  ogImage: "assets/og-thumbnail.jpg", // 1200x630 recommended
};
