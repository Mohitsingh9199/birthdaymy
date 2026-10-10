# 🎂💖 Birthday Surprise Website

A romantic, interactive, multi-page birthday surprise website — a personal digital gift that feels magical, emotional, and unique.

## 📁 Project Structure

```
project128/
├── index.html          ← Main HTML (do NOT edit)
├── style.css           ← All styles (do NOT edit)
├── script.js           ← All logic (do NOT edit)
├── config.js           ← ✅ EDIT THIS FILE for all content
├── README.md           ← You are here
└── assets/
    ├── music.mp3       ← Drop your music file here
    ├── og-thumbnail.jpg← WhatsApp link preview image
    └── photos/
        ├── photo1.jpg  ← Replace with your photos
        ├── photo2.jpg
        ├── photo3.jpg
        ├── photo4.jpg
        ├── photo5.jpg
        └── photo6.jpg
```

## 🎨 How to Customize

### 1. Replace Photos
- Put your photos in `/assets/photos/`
- Name them `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
- Update `photoCount` in `config.js` to match total photos
- Keep photos under 1200px width for fast loading
- Supported: `.jpg`, `.png`, `.webp`

### 2. Edit Messages & Content
Open **`config.js`** and change:
- `herName` — Her name
- `myName` — Your name  
- `herBirthday` — Her birthday date
- `messages` — Array of love messages (Page 2)
- `quizQuestions` — Quiz questions and options (Page 4)
- `memoryMessages` — Messages revealed in memory game (Page 5)
- `loveLetterText` — The final love letter (Page 7)
- Use `{name}` in text and it auto-replaces with her name
- Use `{myname}` for your name

### 3. Add Background Music
- Drop a `.mp3` file at `/assets/music.mp3`
- Music plays after first tap (browser autoplay policy)

### 4. WhatsApp Link Preview
- Replace `/assets/og-thumbnail.jpg` with your custom image (1200×630px)
- Edit `ogTitle` and `ogDescription` in `config.js`

## 🚀 How to Deploy (Free)

### Option A: Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com) → Sign up
2. Drag & drop the entire `project128` folder
3. Done! You get a URL like `https://your-surprise.netlify.app`

### Option B: GitHub Pages
1. Create a new GitHub repository
2. Upload all project files
3. Go to Settings → Pages → Source: main branch → Save
4. Your URL: `https://yourusername.github.io/repo-name`

### Option C: Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Import your repo or drag & drop
3. Deploy — get URL instantly

## 📱 Share via WhatsApp
Once deployed, copy your URL and send it to her! The Open Graph tags will show a cute preview card with title "Ek surprise tumhare liye 💖".

## 🎯 Features
- 7 interactive pages with smooth transitions
- Animated gradient background with floating hearts & petals
- "Catch the Hearts" mini-game
- Relationship quiz with fun responses
- Memory match card game
- Countdown with heartbeat animation & fireworks
- Birthday cake with blow-out animation
- Infinite photo slideshow with Ken Burns effect
- Typewriter love letter effect
- Confetti, balloons, sparkles on every tap
- Fully responsive (360px → 1366px+)
- Respects `prefers-reduced-motion`
- Works offline — no backend needed

## 💡 Tips
- Test on your phone before sending!
- Use warm, meaningful photos (not too many — 6-10 is perfect)
- Write the love letter from your heart
- The quiz should have inside jokes you both understand
- Background music should be a song meaningful to you both

---
*Made with love 💖*
