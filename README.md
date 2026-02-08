# 💍 Ultimate 3D Animated Proposal Website

A stunning, immersive 3D web experience for the perfect romantic proposal. This single-page application combines cutting-edge WebGL technology, beautiful animations, and heartfelt storytelling to create an unforgettable moment.

## ✨ Features

- **6 Interactive Scenes**: From enchanted entry to celebration
- **3D Graphics**: Powered by Three.js with custom shaders
- **Smooth Animations**: GSAP ScrollTrigger for scroll-based storytelling
- **Particle Effects**: Rose petals, hearts, confetti, and fireworks
- **Audio Integration**: Romantic music playlist with smooth transitions
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Interactive Elements**: Click handlers, hover effects, and more
- **Post-Processing**: Bloom, depth of field, and cinematic effects

## 🚀 Quick Start

1. **Clone or download this project**
2. **Open `index.html` in a modern web browser**
3. **Scroll through the experience**
4. **Click the audio button to start the music**
5. **Enjoy the journey!**

## 📁 Project Structure

```
love/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── script.js           # Main JavaScript logic
├── README.md           # This file
└── assets/             # Images and audio files (create this folder)
```

## 🎨 Customization

### Personalize the Content

Edit `script.js` to customize:

1. **Relationship Start Date** (line ~540):
```javascript
const startDate = new Date('YOUR_DATE_HERE');
```

2. **Memories** (lines ~47-52):
```javascript
const memories = [
    { date: "First Date", title: "Where It All Began", desc: "Your description" },
    // Add more memories...
];
```

3. **Love Reasons** (lines ~39-44):
```javascript
const loveReasons = [
    "Your smile lights up my darkest days",
    // Add more reasons...
];
```

4. **Music Playlist** (lines ~28-36):
```javascript
const playlist = [
    { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
    // Add more tracks...
];
```

### Add Your Own Photos

1. Create an `assets/` folder
2. Add your photos with descriptive names
3. Update the memory cards in `populateMemories()` function

### Add Music Files

1. Place MP3 files in the `assets/` folder
2. Update the `initAudio()` function to load your files
3. Update the playlist array with your song titles

## 🎭 Scene Breakdown

### Scene 1: Enchanted Entry (0-10% scroll)
- Floating rose petals with physics
- Heart-shaped particle system
- Glowing bokeh lights
- "A Journey of Our Love..." title

### Scene 2: Memory Lane (10-30% scroll)
- Interactive photo gallery
- Timeline of key dates
- Hover animations on photos

### Scene 3: Reasons Why I Love You (30-50% scroll)
- Floating heart particles
- 30+ love reasons
- Starfield background

### Scene 4: Our Future Together (50-70% scroll)
- Dream visualization
- Future goals display
- Ethereal atmosphere

### Scene 5: The Big Question (70-90% scroll)
- 3D ring box animation
- Click to open
- Dramatic lighting

### Scene 6: Yes/No Response (90-100% scroll)
- Interactive response buttons
- Confetti explosion
- Fireworks celebration
- Love letter reveal

## 🎵 Audio Integration

The website includes a romantic music playlist. To use actual audio files:

1. Add your MP3 files to the `assets/` folder
2. Modify the `initAudio()` function in `script.js`:
```javascript
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Load your audio files
    const audio = new Audio('assets/your-song.mp3');
    audio.loop = true;
    
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;
    
    // Connect audio to gain node
    const source = audioContext.createMediaElementSource(audio);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    audio.play();
}
```

## 📱 Responsive Design

The website is fully responsive and works on:
- **Desktop** (1920x1080+): Full 3D experience
- **Tablet** (768px - 1024px): Optimized controls
- **Mobile** (320px - 767px): Touch-friendly interface

## 🎨 Color Palette

- Primary: `#FF1744` (Romantic Red)
- Secondary: `#F50057` (Deep Pink)
- Accent: `#FFD700` (Gold)
- Background: Gradient from `#0a0a2e` to `#1a0933` (Deep Purple Night)
- Glow: `#FF69B4` (Hot Pink)

## 🛠️ Technologies Used

- **Three.js** (r128) - 3D graphics and rendering
- **GSAP** (v3.12.2) - Animations and scroll effects
- **HTML5 Canvas** - Rendering surface
- **CSS3** - Styling and animations
- **Vanilla JavaScript** - Core functionality

## 🌐 Browser Compatibility

Works best on modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires WebGL support.

## 📊 Performance

- **Desktop**: 60 FPS target
- **Mobile**: 30 FPS minimum
- **Load Time**: < 5 seconds
- **Optimized**: Progressive loading with elegant loading screen

## 💡 Tips for the Perfect Proposal

1. **Test beforehand**: Try on all devices she might use
2. **Choose the right moment**: Romantic setting, good lighting
3. **Have a backup**: Download the files for offline access
4. **Personalize**: Add your photos, memories, and music
5. **Practice**: Go through the experience yourself first

## 🎁 Deployment Options

### Option 1: Netlify (Easiest)
1. Create a Netlify account
2. Drag and drop the project folder
3. Get your URL instantly

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project directory
3. Follow the prompts

### Option 3: GitHub Pages
1. Create a GitHub repository
2. Push your files
3. Enable GitHub Pages in settings

### Option 4: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 📝 Customization Checklist

- [ ] Update relationship start date
- [ ] Add your photos to memory lane
- [ ] Personalize love reasons
- [ ] Add your music files
- [ ] Update names and dates
- [ ] Add inside jokes and easter eggs
- [ ] Customize the love letter
- [ ] Test on multiple devices
- [ ] Choose perfect moment
- [ ] Have backup plan ready

## 🎯 How to Present

1. **Send a romantic text**: "I have something special to show you..."
2. **Create a QR code**: Link to the website URL
3. **Project on screen**: For a dramatic reveal
4. **Use a tablet**: For an intimate moment
5. **Choose the right timing**: When she's relaxed and happy

## 💕 The Proposal Moment

When she reaches the proposal scene:
1. The ring box will appear
2. She clicks to open it
3. The ring emerges with sparkle effects
4. "Will You Marry Me?" appears
5. She clicks "YES!"
6. Celebration with confetti and fireworks
7. Love letter reveals
8. Option to save the moment

## 🐛 Troubleshooting

**Audio not playing?**
- Check browser autoplay policies
- Try clicking the play button first
- Ensure audio files are in correct format

**3D not rendering?**
- Check WebGL support
- Update browser to latest version
- Check console for errors

**Slow performance?**
- Close other tabs
- Check device specifications
- Try reducing particle count in code

## 📄 License

This project is created for personal use. Feel free to customize and use for your special proposal!

## ❤️ Made with Love

Created for the most important question of your life. May she say YES! 💍

---

**Good luck with your proposal! Here's to forever together!** ✨
