import { AudioPlayer } from "./audio";

AudioPlayer.initialise();

const playButton = document.getElementById("play-button");
playButton?.addEventListener("click", () => {
  AudioPlayer.play("123456");
});
