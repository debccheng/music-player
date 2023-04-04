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

const increaseVolumeButton = document.getElementById("increase-volume");
const decreaseVolumeButton = document.getElementById("decrease-volume");

increaseVolumeButton?.addEventListener("click", () => {
  AudioPlayer.increaseVolume();
});

decreaseVolumeButton?.addEventListener("click", () => { 
  AudioPlayer.decreaseVolume();
});
