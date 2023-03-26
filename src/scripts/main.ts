import { AudioPlayer, AudioState } from "./audio";
import { showPlaylist } from "./animations";

AudioPlayer.initialise();

const playButton = document.getElementById("play-button");

playButton?.addEventListener("click", () => {
  const audioState = AudioPlayer.getAudioState();
  showPlaylist();
  if (audioState !== AudioState.playing) {
    AudioPlayer.play();
  } else {
    AudioPlayer.pause();
  }
});
