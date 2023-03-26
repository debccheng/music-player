import type { TrackData } from "./types";

export const displayPlaylist = (trackData: TrackData[]) => {
  const playlistElement = document.querySelector(".playlist") as HTMLUListElement;
  const listFragment = document.createDocumentFragment();

  trackData.forEach((track) => {
    const list = document.createElement("li");
    const infoFragment = document.createDocumentFragment();
      
    const title = document.createElement("h2");
    const artist = document.createElement("h3");
    const info = document.createElement("div");
    const albumArt = document.createElement("img");

    title.innerText = track.title;
    artist.innerText = track.artist;
    albumArt.src = track.cover;
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
  const slider = document.getElementById("slider") as HTMLInputElement | null;
  if (!slider) return;
  
  slider.value = String(current);
};

const linkSliderWithAudio = (audio: HTMLAudioElement) => { 
  audio.ontimeupdate = () => { 
    updateSlider(Math.floor(audio.currentTime));
  };
};

type CreateSlider = {
  duration: number;
  index: number;
  audio: HTMLAudioElement;
}

const createSlider = ({ duration, index, audio }: CreateSlider) => {
  const playlistElement = document.querySelector(".playlist") as HTMLUListElement;
  const lists = playlistElement.querySelectorAll("li");

  if (!!lists && lists.length > index) { 
    const item = lists[index].querySelector("div");
    const slider = document.createElement("input");
  
    slider.type = "range";
    slider.value = "0";
    slider.max = String(duration);
    slider.id = "slider";

    item?.append(slider);

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

const removeSlider = () => { 
  const slider = document.getElementById("slider");
  slider?.remove();
};

const createPlaylistPlayButtons = (indexToExclude: number, callback: (i: number) => void) => { 
  const playlistElement = document.querySelector(".playlist") as HTMLUListElement;
  const lists = playlistElement.querySelectorAll("li");

  if (!lists || lists.length <= indexToExclude) return;

  lists.forEach((list, i) => { 
    const item = list.querySelector("div");

    if (i !== indexToExclude) { 
      const button = document.createElement("button");
    
      button.className = "playlist-play-button";
      button.classList.add(String(i));

      button.addEventListener("click", ({ target }) => {
        if (target instanceof HTMLButtonElement) { 
          const i = target.className.slice(-1);
          callback(+i);
        }
      });

      item?.append(button);
    }
  });
};

const addPlaylistButton = (index: number, callback: (i: number) => void) => { 
  const playlistElement = document.querySelector(".playlist") as HTMLUListElement;
  const lists = playlistElement.querySelectorAll("li");

  if (!lists || lists.length <= index) return;
  const item = lists[index].querySelector("div");
  const button = document.createElement("button");

  button.className = "playlist-play-button";
  button.classList.add(String(index));

  button.addEventListener("click", ({ target }) => {
    if (target instanceof HTMLButtonElement) { 
      const i = target.className.slice(-1);
      callback(+i);
    }
  });

  item?.append(button);
};

const removePlaylistButton = (index: number) => {
  const playlistElement = document.querySelector(".playlist") as HTMLUListElement;
  const lists = playlistElement.querySelectorAll("li");

  if (!lists || lists.length <= index) return;
  const item = lists[index].querySelector("div");
  const button = item?.querySelector(".playlist-play-button");
  button?.remove();
};

export const SliderActions = {
  linkSliderWithAudio,
  updateSlider,
  createSlider,
  removeSlider
};

export const ButtonActions = {
  createPlaylistPlayButtons,
  addPlaylistButton,
  removePlaylistButton
};
