import { setTrack } from "./audio";

const playButton = document.getElementById("play-button");
playButton?.addEventListener("click", () => {
  setTrack();
});

