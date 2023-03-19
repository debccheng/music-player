import { fetchTracks } from "./api";
import { playCSSAnimation, changeCSSAnimation, resetCSSAnimation, visualise } from "./animations";
import { AudioData, TrackData } from "./types";

export class AudioPlayer {
  private static playlist: TrackData[];
  private static audioQueue: AudioData[];
  private static audioContext: AudioContext;
  private static srcNode: MediaElementAudioSourceNode;

  public static initialise = async () => {
    const { tracks } = await fetchTracks();
    this.playlist = tracks;
    this.audioQueue = [];
  };

  private static checkForPlayingAudio = (audioId: string) => {
    const matched = this.audioQueue.filter(
      ({ id, audioElement }) => id === audioId
        && audioElement.duration > 0
        && !audioElement.paused
    );
    return matched?.[0] || null;
  };
  
  private static checkForPausedAudio = (audioId: string) => {
    const matched = this.audioQueue.filter(
      ({ id, audioElement }) => id === audioId
        && audioElement.duration > 0
        && audioElement.paused
    );
    return matched?.[0] || null;
  };

  private static cleanup = () => {
    if (this.srcNode) this.srcNode.disconnect();
    if (this.audioContext) this.audioContext.close();

    this.audioQueue = this.audioQueue.filter(({ audioElement }) => {
      return audioElement.duration > 0 && !audioElement.paused;
    });
  };

  public static play = (audioId?: string) => {
    const matchedAudio = this.playlist.find((audio) => {
      if (audioId) return audio.id === audioId;
    });

    const audio = matchedAudio || this.playlist?.[0];
    if (!audio) return;

    const playingAudio = this.checkForPlayingAudio(audio.id);
    const pausedAudio = this.checkForPausedAudio(audio.id);

    if (!pausedAudio && !playingAudio) {
      this.cleanup();

      const audioElement = new Audio(audio.src);
      this.audioQueue.push({ id: audio.id, audioElement });
      audioElement.play();
      audioElement.onended = () => { 
        resetCSSAnimation();
      };

      this.audioContext = new AudioContext();
      this.srcNode = this.audioContext.createMediaElementSource(audioElement);

      visualise(this.audioContext, this.srcNode);
      playCSSAnimation(audio.cover);
      return;
    }

    if (pausedAudio) {
      pausedAudio.audioElement.play();
      playCSSAnimation(audio.cover);
      return;
    }

    playingAudio.audioElement.pause();
    changeCSSAnimation();
    return;
  };
}
