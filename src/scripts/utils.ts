import type { TrackData } from "./types";

export const populatePlaylist = (playlist: TrackData[]) => {
  const playlistElement = document.querySelectorAll(".playlist")[0] as HTMLUListElement;
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
