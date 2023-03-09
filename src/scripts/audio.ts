import { fetchTracks } from "./api";
import { playAnimation, holdAnimation } from "./animations";

window.__audios = window.__audios|| [];

const getPausedAudio = (audioId: string) => { 
  const matched = window.__audios
    .filter(
      ({ id, audioElement }) => id === audioId
        && audioElement.duration > 0
        && audioElement.paused
  );
  return matched?.[0] || null;
};

const checkAnyAudioPlaying = () => {
  return window.__audios.some(({ audioElement }) => {
    return audioElement.duration > 0 && !audioElement.paused;
  });
};

const cleanup = () => { 
  window.__audios = window.__audios.filter(({ audioElement }) => {
    return audioElement.duration > 0 && !audioElement.paused;
  });
};

export const setTrack = async () => { 
  const result = await fetchTracks();
   
  const trackData = result.tracks[1];
  playAnimation(trackData.cover);

  const isAnyAudioPlaying = checkAnyAudioPlaying();
  const paused = getPausedAudio(trackData.id);

  if (paused) { 
    paused.audioElement.play();
    return;
  }

  if (!isAnyAudioPlaying) {
    cleanup();
    const audioElement = new Audio(trackData.src);
    window.__audios.push({ id: trackData.id, audioElement });
    audioElement.play();
   return;
  }
  
  window.__audios[0].audioElement.pause();
  holdAnimation();
  return;
};

