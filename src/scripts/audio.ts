import { fetchTracks } from "./api";
import { playAnimation, holdAnimation, showWaves } from "./animations";
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

      this.audioContext = new AudioContext();
      this.srcNode = this.audioContext.createMediaElementSource(audioElement);

      showWaves(audioElement, this.audioContext, this.srcNode, false, false);
      playAnimation(audio.cover);
  
      return;
    }

    if (pausedAudio) {
      pausedAudio.audioElement.play();
      showWaves(pausedAudio.audioElement, this.audioContext, this.srcNode, false, true);
      playAnimation(audio.cover);
      return;
    }

    playingAudio.audioElement.pause();
    // showWaves(playingAudio.audioElement, this.audioContext, this.srcNode, true, false);
    holdAnimation();
    return;
  };
}
