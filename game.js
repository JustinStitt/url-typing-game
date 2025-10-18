const sz = 50;
const space_character = "~";
const blank_char = "_"
const min_delay = 45; // we get rate-limited around here
const start_time = performance.now();

let game = blank_char.repeat(sz) + 'test';
let to_type = ""
let first_typable = null;
let successfully_typed_chars = 0;
let delay = 100;

window.location.hash = game;

first_typable = getFirstTypable();

function getFirstTypable(want_idx = false) {
  for (let i = 0; i < game.length; ++i) {
    const c = game[i];
    if ((c >= 'a' && c <= 'z') || c == space_character) {
      if (want_idx) return i;
      return c;
    }
  }
  return null;
}

function getWPM() {
  return Math.floor((successfully_typed_chars / 5) / ((performance.now() - start_time) / 60000));
}



function lose() {
  alert(`you lost... wpm: ${getWPM()}`);
}

function progress() {
  leftmost = game[0]
  if ((leftmost >= 'a' && leftmost <= 'z') || leftmost == space_character) {
    lose();
  }
  game = game.substring(1) + blank_char; // remove first, take rest, add blank
  window.location.hash = game + "[" + Math.floor(getWPM()) + "]";

}
// progress string from right to left
setInterval(() => {
  progress()
}, delay)

// spawn new words
setInterval(() => {
  const chosen_word = generateWord()
  game = game.substring(0, game.length - chosen_word.length) + chosen_word
  first_typable = getFirstTypable();
}, delay * 7)

setInterval(() => {
  delay = Math.max(delay - 15, min_delay)
}, 5000) // every 5 seconds, make the game go faster


document.addEventListener("keydown", (event) => {
  key = event.key
  if (key === first_typable) {
    successfully_typed_chars += 1;
    idx = getFirstTypable(true);
    game = game.substring(0, idx) + blank_char + game.substring(idx + 1);
    first_typable = getFirstTypable();
  }
})
