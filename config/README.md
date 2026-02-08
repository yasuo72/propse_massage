# 📝 Configuration Guide

This folder contains all the personalization data for your proposal website. Edit these files to customize the website without touching the code!

## Files

### `config.json` - Main Configuration File

This file contains all the personalization data:

```json
{
  "names": {
    "yourName": "Rohit",
    "herName": "Sonam"
  },
  "proposal": {
    "title": "Our Forever",
    "question": "Will You Marry Me?",
    "subtitle": "Click the heart to open"
  },
  "celebration": {
    "title": "SHE SAID YES!",
    "loveLetter": {
      "greeting": "My Dearest",
      "closing": "With all my love,",
      "message": "Your love letter text here..."
    }
  },
  "relationship": {
    "startDate": "2026-02-09"
  },
  "memories": [...],
  "loveReasons": [...]
}
```

## How to Customize

### 1. Change Names
Edit `names.yourName` and `names.herName` in `config.json`:
```json
"names": {
  "yourName": "Your Name",
  "herName": "Her Name"
}
```

### 2. Customize Proposal Text
Edit the `proposal` section:
```json
"proposal": {
  "title": "Our Forever",
  "question": "Will You Marry Me?",
  "subtitle": "Click the heart to open"
}
```

### 3. Write Your Love Letter
Edit the `celebration.loveLetter` section:
```json
"loveLetter": {
  "greeting": "My Dearest",
  "closing": "With all my love,",
  "message": "Line 1\nLine 2\nLine 3..."
}
```
Use `\n` for line breaks.

### 4. Add Your Memories
Edit the `memories` array:
```json
"memories": [
  {
    "date": "First Date",
    "title": "Where It All Began",
    "desc": "Your description"
  },
  // Add more memories...
]
```

### 5. Add Love Reasons
Edit the `loveReasons` array:
```json
"loveReasons": [
  "Your smile lights up my darkest days",
  "The way you laugh at my terrible jokes",
  // Add more reasons...
]
```

### 6. Set Relationship Start Date
Edit `relationship.startDate`:
```json
"relationship": {
  "startDate": "2024-02-08"
}
```

## Tips

- **JSON Format**: Make sure to use proper JSON syntax (quotes around keys and strings)
- **Line Breaks**: Use `\n` for line breaks in the love letter
- **Commas**: Don't forget commas between items in arrays and objects
- **Validation**: Use a JSON validator if you get errors

## Example: Complete Customization

```json
{
  "names": {
    "yourName": "John",
    "herName": "Jane"
  },
  "proposal": {
    "title": "Our Love Story",
    "question": "Will You Be My Forever?",
    "subtitle": "Click to open"
  },
  "celebration": {
    "title": "SHE SAID YES!",
    "loveLetter": {
      "greeting": "My Beloved Jane",
      "closing": "Forever Yours,",
      "message": "From the moment we met, I knew you were the one.\n\nEvery day with you is a gift I treasure.\n\nI can't wait to spend forever with you."
    }
  },
  "relationship": {
    "startDate": "2023-01-15"
  },
  "memories": [
    {
      "date": "January 15, 2023",
      "title": "Our First Meeting",
      "desc": "Coffee shop on a rainy morning"
    }
  ],
  "loveReasons": [
    "Your beautiful smile",
    "Your kind heart",
    "The way you make me laugh"
  ]
}
```

## Troubleshooting

**Website showing "Loading..." instead of names?**
- Check if `config.json` is in the correct location
- Verify JSON syntax is correct
- Check browser console for errors

**Changes not appearing?**
- Refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Check if config.json was saved correctly

**JSON errors?**
- Use a JSON validator like jsonlint.com
- Check for missing quotes, commas, or brackets
- Make sure all strings are quoted

## Need Help?

- Check the main README.md
- See CUSTOMIZATION.md for more details
- Review the code comments in script.js

---

**Happy proposing! 💍**
