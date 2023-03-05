const SCREEN_BOX_SHADOW = "0 0 5.5em 1.5em rgba(255, 255, 255, 0.66)";
const SCREEN_GLOW_ANIMATION = "fuzzy-screen ease-in-out 0.5s infinite, glow ease-in 3s infinite";

type TrackData = {
  id: string;
  title: string;
  artist: string;
  /**
   * Song length in seconds.
   */
  duration: number;
  /**
   * Album art.
   */
  cover: string;
  /**
   * Audio source.
   */
  src: string;
}

type RawData = {
  tracks: TrackData
}

const options: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
};

export const fetchTracks = async () => {
  const res = await fetch("src/mock/tracks.json", options);
  if (!res.ok) { 
    throw new Error(`An error has occurred: ${res.status}`);
  }

  const result: RawData = await res.json();
  return result;
 };

export const setTrack = async () => { 
  const result = await fetchTracks();

  const screen = document.getElementById("screen");
  // const progressBar = document.getElementById("progress-bar");
  const shadow = document.getElementById("shadow");
  const svg = document.querySelectorAll<HTMLElement>(".svg-container");
  
  if (screen) {
    screen.style.setProperty("--screenImage", `url("${result.tracks[1].cover}")`);
    screen.style.setProperty("--screenGlow", SCREEN_BOX_SHADOW);
    screen.style.animation += SCREEN_GLOW_ANIMATION;
  }
  // if (progressBar) progressBar.style.display = "block";
  if (shadow) { 
    shadow.style.opacity = "0.5";
  }
  if (svg && svg.length > 0) { 
    svg[0].style.filter = "brightness(100%)";
  }
  

  let track: HTMLAudioElement | undefined;
  if (track) {
    track.pause();
  } else { 
    track = new Audio(result.tracks[1].src);
    track.play();
  }
};
