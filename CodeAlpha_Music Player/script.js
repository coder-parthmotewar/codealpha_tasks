const songs = [
  {
    title: "Night Vibes",
    artist: "DJ Relax",
    src: "song1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Dreamscape",
    artist: "Aero Chord",
    src: "song2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "Peaceful Waves",
    artist: "Nature Studio",
    src: "song3.mp3",
    cover: "cover3.jpg"
  }
];

let index = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// Load Song
function loadSong(i) {
  const s = songs[i];
  title.textContent = s.title;
  artist.textContent = s.artist;
  cover.src = s.cover;
  audio.src = s.src;
}
loadSong(index);

// Play / Pause
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

// Next Song
function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸";
}

// Previous Song
function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸";
}

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;

  // Time Format
  currentTimeEl.textContent = format(audio.currentTime);
  durationEl.textContent = format(audio.duration);
});

// Set Progress
function setProgress() {
  audio.currentTime = (progress.value * audio.duration) / 100;
}

// Volume Control
function setVolume() {
  audio.volume = volume.value;
}

// Format time function
function format(sec) {
  if (isNaN(sec)) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
