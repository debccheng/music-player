import { AudioPlayer } from "./audio";
import { showPlaylist } from "./animations";

AudioPlayer.initialise();

const playButton = document.getElementById("play-button");
playButton?.addEventListener("click", () => {
  AudioPlayer.play("000000");
  showPlaylist();
});
