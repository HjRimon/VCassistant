let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.getElementById("voiceSelect");
let playButton = document.getElementById("playButton");
let textArea = document.getElementById("textArea");
let isPaused = false;

speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
});

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

textArea.addEventListener("input", () => {
  playButton.disabled = !textArea.value;
});

playButton.addEventListener("click", () => {
  if (!speechSynthesis.speaking && !speechSynthesis.paused) {
    speech.text = textArea.value;
    window.speechSynthesis.speak(speech);
    playButton.innerHTML = '<i class="fa-solid fa-pause"></i>Pause';
  } else if (speechSynthesis.paused && !isPaused) {
    window.speechSynthesis.resume();
    playButton.innerHTML = '<i class="fa-solid fa-pause"></i>Pause';
    isPaused = true;
  } else {
    window.speechSynthesis.cancel();
    playButton.innerHTML = '<i class="fa-solid fa-play"></i>Listen';
    isPaused = false;
  }
});

speech.addEventListener("end", () => {
  playButton.innerHTML = '<i class="fa-solid fa-play"></i>Listen';
  isPaused = false;
});
