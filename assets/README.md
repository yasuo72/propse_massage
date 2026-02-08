# Assets Folder

This folder contains all the images, audio files, and other assets for the proposal website.

## Recommended Structure

```
assets/
├── images/
│   ├── memory-1.jpg      # First date photo
│   ├── memory-2.jpg      # First kiss photo
│   ├── memory-3.jpg      # Special trip photo
│   ├── memory-4.jpg      # Moving in photo
│   ├── memory-5.jpg      # Anniversary photo
│   ├── couple-photo.jpg  # Photo for celebration
│   └── placeholder.jpg   # Default image
│
├── audio/
│   ├── song1.mp3         # Can't Help Falling in Love
│   ├── song2.mp3         # Thinking Out Loud
│   ├── song3.mp3         # All of Me
│   ├── song4.mp3         # A Thousand Years
│   ├── song5.mp3         # Marry Me
│   ├── song6.mp3         # Perfect
│   ├── ring-open.mp3     # Sound effect for ring box
│   ├── confetti.mp3      # Confetti pop sound
│   └── celebration.mp3   # Celebration music
│
└── fonts/                # Optional custom fonts
    └── custom-font.ttf
```

## Image Guidelines

### Memory Photos
- **Resolution**: 1920x1080 or higher
- **Format**: JPG or PNG
- **Size**: Under 500KB each for fast loading
- **Style**: Romantic, well-lit photos

### Couple Photo
- **Resolution**: High quality, at least 1080p
- **Format**: JPG or PNG
- **Content**: Beautiful photo of you both together

## Audio Guidelines

### Music Files
- **Format**: MP3 (recommended) or WAV
- **Quality**: 192kbps or higher
- **Length**: Full songs or edited versions
- **Volume**: Normalized to similar levels

### Sound Effects
- **Format**: MP3 or WAV
- **Length**: Short clips (1-3 seconds)
- **Quality**: High fidelity

## How to Add Your Assets

### 1. Add Photos
1. Place your photos in `assets/images/`
2. Rename them to match the memory descriptions
3. Update the `memories` array in `script.js`:
```javascript
const memories = [
    { date: "First Date", title: "Where It All Began", desc: "Coffee shop on a rainy afternoon", image: "assets/images/memory-1.jpg" },
    // Add more memories...
];
```

### 2. Add Music
1. Place your music files in `assets/audio/`
2. Update the `playlist` array in `script.js`:
```javascript
const playlist = [
    { title: "Can't Help Falling in Love", artist: "Elvis Presley", file: "assets/audio/song1.mp3" },
    // Add more tracks...
];
```

3. Update the `initAudio()` function to load your files:
```javascript
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const audio = new Audio(playlist[currentTrack].file);
    audio.loop = true;
    
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;
    
    const source = audioContext.createMediaElementSource(audio);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    audio.play();
}
```

### 3. Add Sound Effects
1. Place sound effects in `assets/audio/`
2. Create audio elements in your HTML or load them in JavaScript:
```javascript
const ringOpenSound = new Audio('assets/audio/ring-open.mp3');
const confettiSound = new Audio('assets/audio/confetti.mp3');

// Play when needed
ringOpenSound.play();
```

## Image Optimization Tips

1. **Compress images**: Use tools like TinyPNG or ImageOptim
2. **Use appropriate formats**: JPG for photos, PNG for graphics
3. **Lazy load**: Load images as user scrolls
4. **Use WebP**: Modern format with better compression
5. **Create multiple sizes**: Different sizes for different devices

## Audio Optimization Tips

1. **Normalize volume**: Ensure all tracks have similar levels
2. **Compress**: Use 192kbps MP3 for good quality/size balance
3. **Trim**: Remove silence from beginning/end
4. **Crossfade**: Smooth transitions between songs
5. **Loop seamlessly**: For background music

## Free Resources

### Images
- Unsplash (unsplash.com) - Free high-quality photos
- Pexels (pexels.com) - Stock photos
- Pixabay (pixabay.com) - Free images and videos

### Audio
- Free Music Archive (freemusicarchive.org)
- YouTube Audio Library
- Pixabay Audio (pixabay.com/music)

### Sound Effects
- Freesound (freesound.org)
- Zapsplat (zapsplat.com)
- Pixabay Sound Effects

## Placeholder Images

If you don't have photos ready yet, you can use placeholder images:
- Use the placeholder.jpg included
- Or generate placeholders using online tools like:
  - placeholder.com
  - via.placeholder.com
  - placehold.co

## Copyright

When using assets:
- Ensure you have rights to use photos
- Use royalty-free music
- Credit creators if required
- Check license terms for free resources

## File Naming Conventions

Use descriptive, lowercase names with hyphens:
- ✅ `memory-first-date.jpg`
- ✅ `song-thinking-out-loud.mp3`
- ❌ `IMG_1234.jpg`
- ❌ `My Song.mp3`

## Backup Your Assets

Always keep backups of your original photos and audio files in a separate location.

---

**Need help?** Check the main README.md for setup instructions!
