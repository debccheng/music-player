import { setTrack } from "./api";

const playButton = document.getElementById("play-button");
playButton?.addEventListener("click", () => {
  setTrack();
});

