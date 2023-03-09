import { fetchTracks } from "./api";
import { playAnimation, holdAnimation } from "./animations";
import { AudioData, TrackData } from "./types";

export class AudioPlayer {
  private static playlist: TrackData[];
  private static audioQueue: AudioData[];

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
      playAnimation(audio.cover);
      return;
    }

    if (pausedAudio) {
      pausedAudio.audioElement.play();
      return;
    }

    playingAudio.audioElement.pause();
    holdAnimation();
    return;
  };
}
