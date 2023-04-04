import { fetchTracks } from "./api";
import {
  playCSSAnimation,
  changeCSSAnimation,
  resetCSSAnimation,
  visualise,
  scrollAudioIntoView
} from "./animations";
import { displayPlaylist, ButtonActions, SliderActions } from "./utils";
import type { TrackData } from "./types";

export enum AudioState { 
  playing,
  paused,
  stopped
}

export class AudioPlayer {
  private static playlist: TrackData[];
  private static currentAudio: HTMLAudioElement;
  private static audioContext: AudioContext;
  private static srcNode: MediaElementAudioSourceNode;
  private static index: number;
  private static audioState: AudioState;
  private static volume: number;

  public static initialise = async () => {
    const { tracks } = await fetchTracks();
    this.playlist = tracks;
    this.index = 0;
    this.audioState = AudioState.paused;

    displayPlaylist(tracks);
    ButtonActions.createPlaylistPlayButtons(this.index, this.changeTrack);

    this.load(this.index);
  };

  public static getAudioState = () => { 
    return this.audioState;
  };

  private static checkForPlayingAudio = () => {
    return !this.currentAudio.paused && this.currentAudio.duration > 0;
  };

  private static cleanup = () => {
    if (this.srcNode) this.srcNode.disconnect();
    if (this.audioContext) this.audioContext.close();
  };

  private static load = (index: number) => { 
    const track = this.playlist?.[index];
    this.currentAudio = new Audio(track.src);
    this.currentAudio.volume = this.volume || 0.5;

    this.currentAudio.onloadedmetadata = () => {
      const duration = Math.floor(this.currentAudio.duration);
      SliderActions.createSlider({duration, audio: this.currentAudio, index});
      SliderActions.linkSliderWithAudio(this.currentAudio);
    };
  };

  public static stop = () => {
    const playingAudio = this.checkForPlayingAudio();
    if (playingAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.audioState = AudioState.stopped;
      this.cleanup();
    }
  };

  public static pause = () => {
    const playingAudio = this.checkForPlayingAudio();
    if (playingAudio) {
      this.currentAudio.pause();
      this.audioState = AudioState.paused;
      changeCSSAnimation();
    }
  };

  public static changeTrack = (index: number) => {
    this.stop();
    SliderActions.removeSlider();
    ButtonActions.addPlaylistButton(this.index, this.changeTrack);

    this.index = index;
    ButtonActions.removePlaylistButton(this.index);
    this.load(this.index);
    this.play();
  };

  public static play = () => {
    this.currentAudio.play();

    scrollAudioIntoView(this.index);
    this.audioState = AudioState.playing;

    this.currentAudio.onended = () => {
      if (this.index + 1 < this.playlist.length) {
        SliderActions.removeSlider();
        ButtonActions.addPlaylistButton(this.index, this.changeTrack);
        
        this.index += 1;
        ButtonActions.removePlaylistButton(this.index);
          
        this.load(this.index);
        this.play();
      } else {
        resetCSSAnimation();
      }
    };

    this.audioContext = new AudioContext();
    this.srcNode = this.audioContext.createMediaElementSource(this.currentAudio);

    visualise(this.audioContext, this.srcNode);
    playCSSAnimation(this.playlist[this.index]?.cover || "");
    return;
  };

  public static increaseVolume = () => { 
    if (this.currentAudio.volume < 1) {
      this.currentAudio.volume = +(this.currentAudio.volume + 0.1).toFixed(1);
      this.volume = this.currentAudio.volume;
    }
  };

  public static decreaseVolume = () => { 
    if (this.currentAudio.volume > 0) {
      this.currentAudio.volume = +(this.currentAudio.volume - 0.1).toFixed(1);
      this.volume = this.currentAudio.volume;
    }
  };
}
