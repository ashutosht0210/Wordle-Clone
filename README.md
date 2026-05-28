# 🟩 Wordle Clone

A browser-based Wordle clone built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## 🔗 Live Demo

👉 [Play it here]()

---

## 📁 Project Structure

```
wordle/
├── index.html          # Main HTML file (welcome screen + game UI)
├── style.css           # All styling (dark theme, animations, keyboard)
├── app.js              # Core game logic
└── Resources/
    ├── answer.js       # Array of valid answer words (exported as `answer`)
    └── guess.js        # Set of valid guessable words (exported as `validGuess`)
```

---

## 🎮 How to Play

1. Open `index.html` in a browser.
2. Click **Play** on the welcome screen.
3. Type a 5-letter word using your keyboard or the on-screen keyboard.
4. Press **Enter** to submit your guess.
5. Tiles change colour based on your guess:
   - 🟩 **Green** — Letter is in the correct position.
   - 🟨 **Yellow** — Letter is in the word but wrong position.
   - ⬛ **Grey** — Letter is not in the word.
6. You have **6 attempts** to guess the word. Good luck!

---

## 🚀 Getting Started

No build step or server required. Just open the file:

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Serve locally (recommended to avoid any CORS issues)
npx serve .
# or
python3 -m http.server
```

Then navigate to `http://localhost:8000` (or whichever port is shown).

---

## ⚙️ How It Works

### `Resources/answer.js`
Exports an array called `answer` — a curated list of 5-letter words. A random word is picked from this list at the start of each game.

### `Resources/guess.js`
Exports a `Set` called `validGuess` — all words the game accepts as valid guesses. If a typed word isn't in this set, it's rejected with a "Not in word list" shake animation.

### `app.js`
Handles all game logic:
- **Welcome screen** — hides on Play button click.
- **Keyboard input** — listens for physical keystrokes (`keydown` event) and on-screen key clicks.
- **Letter entry** — fills grid boxes one at a time; Backspace removes the last letter.
- **Guess validation** — checks the guess against `validGuess` before evaluating.
- **Result scoring** — uses a frequency map to correctly handle duplicate letters.
- **Colour feedback** — applied with staggered `setTimeout` delays (300ms per tile) for a flip effect.
- **Keyboard colouring** — on-screen keys are also coloured to reflect discovered letter states.
- **Win/loss detection** — shows a status message on win; reveals the answer after 6 failed attempts.

---

## ✨ Features

- ⌨️ Physical keyboard + on-screen keyboard support
- 🔄 Animated tile flip on guess submission
- 📳 Shake animation for invalid words
- 🎨 Dark theme matching the NYT Wordle aesthetic
- 🔡 Duplicate letter handling (frequency-map based scoring)
- 📱 Responsive layout

---

## 🛠️ Customisation

| What | Where | How |
|---|---|---|
| Add/change answer words | `Resources/answer.js` | Edit the `answer` array |
| Add valid guesses | `Resources/guess.js` | Add words to the `validGuess` Set |
| Change colours | `style.css` | Edit `.correct-place`, `.wrong-place`, `.not-present` classes |
| Change animation speed | `app.js` | Adjust the `i * 300` delay in the result loop |

---

## 🌐 External Dependencies

All loaded via CDN — no installation needed:

| Resource | Purpose |
|---|---|
| [Google Fonts – Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab) | Welcome screen heading |
| [Google Fonts – Google Sans Flex](https://fonts.google.com/) | Body text |
| [Font Awesome 7](https://fontawesome.com/) | Icons (menu, help, backspace) |
| [NYT Wordle icon](https://www.nytimes.com) | Welcome screen logo |

---

## 📌 Known Limitations

- No local storage — refreshing the page resets the game and picks a new word.
- No statistics tracking between sessions.

---

## 📄 License

This project is a personal/educational clone of the NYT Wordle game. Not affiliated with or endorsed by The New York Times.