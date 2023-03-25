import type { TrackData } from "./types";

export const populatePlaylist = (playlist: TrackData[]) => {
  const playlistElement = document.querySelector(".playlist") as HTMLUListElement;
  const listFragment = document.createDocumentFragment();

  playlist.forEach((audio) => {
    const list = document.createElement("li");
    const infoFragment = document.createDocumentFragment();
      
    const title = document.createElement("h2");
    const artist = document.createElement("h3");
    const info = document.createElement("div");
    const albumArt = document.createElement("img");

    title.innerText = audio.title;
    artist.innerText = audio.artist;
    albumArt.src = audio.cover;
    albumArt.className = "album-cover";

    info.append(title);
    info.append(artist);

    infoFragment.append(albumArt);
    infoFragment.append(info);

    list.append(infoFragment);
    listFragment.append(list);
  });
  playlistElement.append(listFragment);
};

const updateSlider = (current: number) => { 
  const slider = document.getElementById("slider") as HTMLInputElement;
  slider.value = String(current);
};

export const linkSliderWithAudio = (audio: HTMLAudioElement) => { 
  audio.ontimeupdate = () => { 
    updateSlider(Math.floor(audio.currentTime));
  };
};

export const createSlider = (duration: number, audio: HTMLAudioElement) => {
  const playlistElement = document.querySelector(".playlist") as HTMLUListElement;
  const lists = playlistElement.querySelectorAll("li");

  if (!!lists && lists.length > 0) { 
    const firstItem = lists[0].querySelector("div");
    const slider = document.createElement("input");

    slider.type = "range";
    slider.value = "0";
    slider.max = String(duration);
    slider.id = "slider";

    firstItem?.append(slider);

    slider.addEventListener("change", () => { 
      audio.currentTime = +slider.value;
    });

    slider.addEventListener("mousedown", () => { 
      audio.ontimeupdate = null; // Pause slider update on user interaction
    });

    slider.addEventListener("mouseup", () => { 
      linkSliderWithAudio(audio);
    });
  }
};
