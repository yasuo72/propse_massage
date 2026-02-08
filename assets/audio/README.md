# 🎵 Music Setup Guide

## Where to Add Music Files

Place your music files in this folder: `assets/audio/`

## Required Files

Rename your music files to match the playlist in `script.js`:

1. **song1.mp3** - "Can't Help Falling in Love" - Elvis Presley
2. **song2.mp3** - "Perfect" - Ed Sheeran
3. **song3.mp3** - "All of Me" - John Legend
4. **song4.mp3** - "Thinking Out Loud" - Ed Sheeran
5. **song5.mp3** - "A Thousand Years" - Christina Perri
6. **song6.mp3** - "Love Story" - Taylor Swift

## How to Add Your Music

### Step 1: Download Your Songs
- Download MP3 files of your chosen romantic songs
- Make sure they're high quality (192kbps or higher)
- Keep file sizes reasonable (under 5MB each)

### Step 2: Rename Files
Rename your downloaded files to:
- `song1.mp3`
- `song2.mp3`
- `song3.mp3`
- `song4.mp3`
- `song5.mp3`
- `song6.mp3`

### Step 3: Place in Folder
Copy the files to: `c:\Users\Rohit\love\assets\audio\`

### Step 4: Update Playlist (Optional)
If you want different songs, edit `script.js`:
```javascript
const playlist = [
    { title: "Your Song 1", artist: "Artist Name", file: "assets/audio/song1.mp3" },
    { title: "Your Song 2", artist: "Artist Name", file: "assets/audio/song2.mp3" },
    // Add more songs...
];
```

## Recommended Valentine's Day Songs

Here are perfect songs for your Valentine's Day proposal:

1. **Perfect** - Ed Sheeran
2. **Can't Help Falling in Love** - Elvis Presley
3. **All of Me** - John Legend
4. **Thinking Out Loud** - Ed Sheeran
5. **A Thousand Years** - Christina Perri
6. **Love Story** - Taylor Swift
7. **Beautiful** - Christina Aguilera
8. **My Heart Will Go On** - Celine Dion
9. **Unchained Melody** - The Righteous Brothers
10. **At Last** - Etta James

## Free Music Sources

If you don't have the songs, you can find them here:

### Legal Sources:
- **YouTube Music** - Download for offline use (YouTube Premium)
- **Spotify** - Download for offline use (Premium)
- **Apple Music** - Download for offline use
- **Amazon Music** - Purchase and download

### Free Options:
- **Free Music Archive** - freemusicarchive.org
- **YouTube Audio Library** - Free for use
- **Pixabay Music** - pixabay.com/music

## Audio Format Requirements

- **Format**: MP3 (recommended)
- **Bitrate**: 192kbps or higher
- **Sample Rate**: 44.1kHz
- **File Size**: Under 5MB each
- **Duration**: Full songs or edited versions

## Testing Your Music

1. Add your music files to `assets/audio/`
2. Refresh the webpage
3. Click anywhere to start audio
4. Use the play/pause button to control
5. Use volume slider to adjust

## Troubleshooting

**Music not playing?**
- Check if files are in correct folder
- Verify file names match exactly
- Check browser console for errors
- Try clicking on the page to start audio

**Audio cutting out?**
- Check file sizes (too large?)
- Verify internet connection
- Try different browser

**Wrong song playing?**
- Check playlist order in script.js
- Verify file names match
- Clear browser cache

## Pro Tips

1. **Volume Normalization**: Use tools like Audacity to normalize all songs to same volume
2. **Fade Transitions**: Edit songs to have smooth fade in/out
3. **Trim Silence**: Remove silence from beginning/end
4. **Crossfade**: Create seamless transitions between songs

## Custom Playlists

Create your own playlist by editing the `playlist` array in `script.js`:

```javascript
const playlist = [
    { 
        title: "Your Special Song", 
        artist: "Artist Name", 
        file: "assets/audio/your-song.mp3" 
    },
    {
        title: "Another Song",
        artist: "Artist Name",
        file: "assets/audio/another-song.mp3"
    }
];
```

## Audio Controls

The website includes:
- **Play/Pause button** - Toggle music
- **Volume slider** - Adjust volume (0-100%)
- **Now playing display** - Shows current song
- **Auto-play on first click** - Starts when user interacts

## Browser Compatibility

Audio works on all modern browsers:
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## Need Help?

Check the main README.md or CUSTOMIZATION.md for more help!

---

**Happy Valentine's Day, Rohit! 💕**
