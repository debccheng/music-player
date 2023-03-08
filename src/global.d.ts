export { };

type AudioData = {
  id: string;
  audioElement: HTMLAudioElement;
}

declare global { 
  interface Window { 
    __audios: AudioData[];
  }
}
